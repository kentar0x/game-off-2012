$(function () {
  var toplevel_container = $('#content');
  var debug = false;
  
  var level = 0;
  var multiroom = null;
  var multibuttons = null;
  var forkedBlock = null;
  var theatre = Theatre.empty();
  var completed_animations = {};
  var last_learning_step = 'none';

  var foreground_animations = ActionQueue.create();
  var std_delay = 600;
  
  function room() {
    return multiroom.current_room();
  }
  function player() {
    return room().player;
  }
  function lover() {
    return room().lover;
  }
  
  function is_movement_allowed() {
    // don't allow the player to move if an animation is under way
    return foreground_animations.is_empty();
  }


  var animation = {
    'left': function() {
      move_lover(-1, 0);
    },
    'right': function() {
      move_lover(1, 0);
    },
    'up': function() {
      move_lover(0, -1);
    },
    'down': function() {
      move_lover(0, 1);
    },
    
    'face_left': function() {
      change_lover_dir(-1, 0);
    },
    'face_right': function() {
      change_lover_dir(1, 0);
    },
    'face_up': function() {
      change_lover_dir(0, -1);
    },
    'face_down': function() {
      if (lover()) {
        change_lover_dir(0, 1);
      } else {
        change_player_dir(0, 1);
      }
    },
    
    'leave': function() {
      if (player().floor === Tile.open_door) {
        room().remove_moveable(player());
      } else if (lover().floor === Tile.open_door) {
        room().remove_moveable(lover());
      }
      
      process_events();
    },
    'open': function() {
      var r = room();
      r.each_door(function(pos, tile) {
        r.change_tile(pos, Tile.open_door);
      });
      
      process_events();
    },
    'close': function() {
      var r = room();
      r.each_door(function(pos, tile) {
        r.change_tile(pos, Tile.closed_door);
      });
      
      process_events();
    },
    
    'ask': function() {
      player_says('fork-question');
    },
    'give': function() {
      var r = room();
      var p = player();
      var l = lover();
      
      p.forked = !p.forked;
      l.forked = !l.forked;
      
      r.update_moveable(p);
      r.update_moveable(l);
      
      process_events();
    },
    
    'kiss': function() {
      kiss(lover(), player());
    },
    '<3': function() {
      lover_says('heart');
    },
    'Z': function() {
      lover_says('press-z');
    },
    'door?': function() {
      lover_says('door-question');
    },
    'door!': function() {
      lover_says('door-exclam');
    },
    '?': function() {
      lover_says('question');
    },
    '!': function() {
      lover_says('exclam');
    },
    'R?': function() {
      lover_says('r-question');
    },
    'fork?': function() {
      lover_says('fork-question');
    },
    'fork!': function() {
      lover_says('fork-exclam');
    },
    
    'fork': function() {
      use_fork(lover());
    },
    
    'skip': function() {
      next_level();
    },
    
    'pick': function() {
      var p = player();
      
      p.dir = Pos.create(0, 1);
      p.forked = true;
      p.floor = Tile.blood;
      
      update_moveable(p);
    },
    
    'dummy': null
  };

  function animate(animation_key, animation_plan) {
    if (animation_plan.length > 0 && !completed_animations[animation_key]) {
      completed_animations[animation_key] = true;
      
      var i = 0;
      function next_animation_step() {
        if (i < animation_plan.length) {
          var animation_key = animation_plan[i];
          ++i;
          
          if ($.isNumeric(animation_key)) {
            var delay = animation_key;
            foreground_animations.then_wait_for(delay);
            
            animation_key = animation_plan[i];
            ++i;
          } else {
            foreground_animations.then_wait_for(std_delay);
          }
          
          var animation_func = animation[animation_key];
          foreground_animations.enqueue(animation_func)
                               .then(next_animation_step);
        }
      }
      
      next_animation_step();
      
      return true;
    } else {
      return false;
    }
  };


  function process_events() {
    multibuttons.process_events(multiroom);
    forkedBlock.process_events(multiroom);
    theatre.process_events(multiroom);
    multiroom.clear_events();
    
    if (!forkedBlock.moves_to_replay.empty()) {
      process_moves(forkedBlock.moves_to_replay);
    }
    if (multibuttons.current().solved()) {
      animate('solved', World.load_on_solved(level));
    }
  }
  
  function process_move(move) {
    foreground_animations.then_wait_for(std_delay).then(function() {
      room().move(move.moveable, move.dx, move.dy);
      process_events();
    });
  }
  
  function process_moves(moves) {
    moves.each(process_move);
    moves.clear();
  }
  

  function load_level(index) {
    if (index == World.levels.length) {
      return roll_credit();
    }
    
    level = index;

    foreground_animations.enqueue(function() {
      theatre.remove();
    }).then_wait_for(Theatre.queue).then(function() {
      multiroom = World.load_multiroom(index);

      var r = room();
      multibuttons = Multibuttons.create(r);
      forkedBlock = ForkedBlock.create(r);

      r.player.dir = Pos.create(0, 1);
      
      theatre = Theatre.create(toplevel_container, r);

      completed_animations = {};
      animate('start', World.load_on_start(index));
    });
  }

  function try_again() {
    if (!animate('reset', World.load_on_reset(level))) {
      load_level(level);
    }
  }

  function next_level() {
    load_level(level + 1);
  }
  
  function roll_credit() {
    // no more player movement
    keyHandler = function() {};
    
    toplevel_container.children().transition({opacity: 0}, 2000);
    toplevel_container.transition({'background-color': '#000'}, 6000, function() {
      var credits = $('#credits');
      toplevel_container.append(credits);
      credits.show();
      
      var delta = 1000;
      delta = credits.height();
      credits.transition({y: -delta}, delta*15, 'linear');
    });
  }


  function update_moveable(moveable) {
    room().update_moveable(moveable);
    process_events();
  }
  
  function target(moveable, dx, dy) {
    if (dx || dy) {
      var pos = moveable.pos.plus(dx, dy);
      
      return room().moveable_at(pos);
    } else {
      var dir = moveable.dir;
      
      return target(moveable, dir.x, dir.y);
    }
  }
  
  function change_moveable_dir(moveable, dx, dy) {
    moveable.dir = Pos.create(dx, dy);
    update_moveable(moveable);
  }
  function change_player_dir(dx, dy) {
    change_moveable_dir(player(), dx, dy);
  }
  function change_lover_dir(dx, dy) {
    change_moveable_dir(lover(), dx, dy);
  }
  
  function look_at(moveable, target) {
    moveable.dir = Pos.distance_between(moveable.pos, target.pos);
    update_moveable(moveable);
  }
  
  function moveable_says(moveable, something) {
    moveable.say = something;
    update_moveable(moveable);
    foreground_animations.wait_for(2*std_delay, function() {
      moveable.say = null;
      update_moveable(moveable);
      
      var t = target(moveable);
      if (t) {
        look_at(t, moveable);
      }
    });
  }
  function player_says(something) {
    moveable_says(player(), something);
  }
  function lover_says(something) {
    moveable_says(lover(), something);
  }
  
  function kiss(kisser, kissed) {
    if (!animate('kiss', World.load_on_kiss(level))) {
      foreground_animations.enqueue(function() {
        moveable_says(kisser, 'heart');
      }).then(function() {
        look_at(kissed, kisser);
      }).then_wait_for(std_delay).then(function() {
        moveable_says(kissed, 'heart');
      });
    }
  }
  
  function move_player(dx, dy) {
    var r = room();
    var pos = r.player.pos.plus(dx, dy);
    var block = r.moveable_at(pos);
    var old_dir = r.player.dir;
    var same_dir = old_dir && dx == old_dir.x && dy == old_dir.y;
    
    var pos_key = pos.x + "," + pos.y;
    var animation_plan = World.load_position_animations(level)[pos_key];
    if( animation_plan ) {
      animate(pos_key, animation_plan);
    }
    if (block && !same_dir) {
      change_player_dir(dx, dy);
    } else {
      if (block && block === r.lover) {
        kiss(r.player, r.lover);
      } else {
        if (block && last_learning_step == 'fork') {
          last_learning_step = 'push';
        }
        
        r.move_player(dx, dy);
        process_events();
      }
    }

    if (r.player.floor == Tile.open_door) {
      next_level();
    }
  }
  function move_lover(dx, dy) {
    room().move_lover(dx, dy);
    
    process_events();
  }
    


  function use_fork(character) {
    var r = room();
    var dir = character.dir;
    var block = target(character);

    if (block && block.tile.character) return kiss(character, block);
    
    if (character.forked) {
      if (block) {
        block.forked = true;
        r.update_moveable(block);
        
        character.forked = false;
        r.update_moveable(character);
        
        multiroom.fork(block);
        
        process_events();
      } else {
        // character is not facing a block.
        // maybe it's still clear which one he means, though?
        var block_count = 0;
        var block_dir = null;
        
        Pos.each_dir(function(dir) {
          var moveable = target(character, dir.x, dir.y);
          
          if (moveable) {
            ++block_count;
            block_dir = dir;
          }
        });
        
        if (block_count == 1) {
          // that must be the block the character meant.
          // turn towards it and try again
          character.dir = block_dir;
          update_moveable(character);
          
          use_fork(character);
        }
      }
    } else {
      if (block && block.forked) {
        // pick up the fork
        {
          block.forked = false;
          r.update_moveable(block);
          
          character.forked = true;
          r.update_moveable(character);
          
          process_events();
        }
        
        // merge the timelines;
        // we go back into the old room, and thus need
        // to consider the block's instance from that room
        {
          multiroom.merge(block);
          
          r = room();
          block = r.moveable_from_id(block.id);
          character = r.moveable_from_id(character.id);
        }
        
        // repeat the changes in the old timeline
        {
          block.forked = false
          r.update_moveable(block);
          
          character.forked = true;
          r.update_moveable(character);
        }
        
        animate('fork', World.load_on_fork(level));
        
        process_events();
      } else {
        // character is not facing a block.
        // maybe it's still clear which one he means, though?
        var block_dir = null;
        
        Pos.each_dir(function(dir) {
          var moveable = target(character, dir.x, dir.y);
          
          if (moveable && moveable.forked) {
            block_dir = dir;
          }
        });
        
        if (block_dir) {
          // that must be the block the character meant.
          // turn towards it and try again
          character.dir = block_dir;
          update_moveable(character);
          
          use_fork(character);
        }
      }
    }
  }
  function player_uses_fork() {
    use_fork(player());
    
    if (last_learning_step == 'none') {
      last_learning_step = 'fork';
      
      animate('fork', World.load_on_fork(level));
    } else if (last_learning_step == 'push') {
      last_learning_step = 'done';
      
      animate('unfork', World.load_on_unfork(level));
    }
  }

  function next_room() {
    multiroom.next_room();
    process_events();
  }


  var keyHandler;
  function handleKey(key) {
    // return false for keys which don't mess with the browser state,
    // this will allow browser commands like Cmd+R to work.

    if (is_movement_allowed()) {
      switch (key) {
        case Keycode.W:
        case Keycode.K:
        case Keycode.up:    move_player( 0,-1); break;

        case Keycode.A:
        case Keycode.H:
        case Keycode.left:  move_player(-1, 0); break;

        case Keycode.S:
        case Keycode.J:
        case Keycode.down:  move_player( 0, 1); break;

        case Keycode.D:
        case Keycode.L:
        case Keycode.right: move_player( 1, 0); break;

        case Keycode.esc:
        case Keycode.R: try_again(); break;

        case Keycode.Z:
        case Keycode.X:
        case Keycode.F:
        case Keycode.ctrl:
        case Keycode.space: player_uses_fork(); break;
        
        //case Keycode.tab: next_room(); break
      }
    }
    
    if (debug) {
      var old_level = level;
      
      // secret level-skipping keys!
      switch (key) {
        case Keycode.O: --level; break;
        case Keycode.P: ++level; break;
      }
      
      var new_level = level;
      if (new_level < 0) new_level = 0;
      
      if (new_level != old_level) {
        foreground_animations.clear();
        Theatre.queue.clear();
        load_level(new_level);
      }
    }

    if (key >= Keycode.A && key <= Keycode.Z) {
      // let the key through, in case the user
      // is trying to type a browser hotkey combination
      return false;
    } else {
      return true;
    }
  }


  function begin(e) {
    toplevel_container.addClass('well').empty();
    load_level(0);
    keyHandler = handleKey;
    
    if (e == Keycode.D) debug = true;
  }

  $('#begin').click(begin);

  // first keypress begins the game
  keyHandler = begin;
  $(document).keydown(function (e) {
    if (keyHandler(e['keyCode'])) {
      e.preventDefault();
    }
  });
});
