$(function () {
  var toplevel_container = $('#content');
  var debug = false;
  
  var level = 0;
  var loaded_level = null;
  var multiroom = null;
  var multibuttons = null;
  var forkedBlock = null;
  var theatre = Theatre.empty();

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
  
  function player_has_fork() {
    return player().forked;
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
      change_lover_dir(0, 1);
    },
    
    '<3': function() {
      lover_says('heart');
    },
    'press-key': function() {
      lover_says('press-key');
    },
    
    'dummy': null
  };

  function animate(animation_plan) {
    var had_delay = false;
    for( var i = 0; i < animation_plan.length; ++i ) {
      var animation_key = animation_plan[i];
      if ($.isNumeric(animation_key)) {
        var delay = animation_key;
        foreground_animations.then_wait_for(delay);
        had_delay = true;
      } else {
        var animation_func = animation[animation_key];
        if( ! had_delay ) {
          foreground_animations.then_wait_for(std_delay);
        }
        foreground_animations.enqueue(animation_func);
        had_delay = false;
      }
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
      // use level instead of index, in case we are
      // in debug mode and the level changed quickly
      index = level;
      
      multiroom = World.load_multiroom(index);
      loaded_level = index;

      var r = room();
      multibuttons = Multibuttons.create(r);
      forkedBlock = ForkedBlock.create(r);

      r.player.forked = true;
      r.player.dir = Pos.create(0, 1);
      
      theatre = Theatre.create(toplevel_container, r);

      var animation_plan = World.load_on_start(index);
      animate(animation_plan);
    });
  }

  function try_again() {
    load_level(level);
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
  
  function moveable_says(moveable, something) {
    moveable.say = something;
    
    moveable.say = something;
    update_moveable(moveable);
    foreground_animations.wait_for(2*std_delay, function() {
      moveable.say = null;
      update_moveable(moveable);
    });
  }
  function player_says(something) {
    moveable_says(player(), something);
  }
  function lover_says(something) {
    moveable_says(lover(), something);
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
      animate(animation_plan);
    }
    if (block && !same_dir) {
      change_player_dir(dx, dy);
    } else {
      if (block && block === lover()) {
        player_says('heart');
      } else {
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
    


  function fork_unfork_room() {
    if (player_has_fork()) {
      var r = room();
      var dir = r.player.dir;
      var pos = r.player.pos.plus(dir.x, dir.y);
      var block = r.moveable_at(pos);

      if (block) {
        block.forked = true;
        r.update_moveable(block);
        
        r.player.forked = false;
        r.update_moveable(r.player);
        
        if (block !== lover()) {
          multiroom.fork(block);
        }
        
        process_events();
      } else {
        // player is not facing a block.
        // maybe it's still clear which one he means, though?
        var block_count = 0;
        var block_dir = null;
        
        Pos.each_dir(function(dir) {
          var pos = r.player.pos.plus(dir.x, dir.y);
          var moveable = r.moveable_at(pos);
          
          if (moveable) {
            ++block_count;
            block_dir = dir;
          }
        });
        
        if (block_count == 1) {
          // that must be the block the player meant.
          // turn towards it and try again
          r.player.dir = block_dir;
          update_moveable(r.player);
          
          fork_unfork_room();
        }
      }
    } else {
      var r = room();
      var dir = r.player.dir;
      var pos = r.player.pos.plus(dir.x, dir.y);
      var block = r.moveable_at(pos);
      
      if (block && block.forked) {
        // pick up the fork
        {
          block.forked = false;
          r.update_moveable(block);
          
          r.player.forked = true;
          r.update_moveable(r.player);
          
          process_events();
        }
        
        if (block !== lover()) {
          // merge the timelines;
          // we go back into the old room, and thus need
          // to consider the block's instance from that room
          {
            multiroom.merge(block);
            r = room();
            block = r.moveable_from_id(block.id);
          }
          
          // repeat the changes in the old timeline
          {
            block.forked = false
            r.update_moveable(block);
            
            r.player.forked = true;
            r.update_moveable(r.player);
            
          }
        }
        
        process_events();
      } else {
        // player is not facing a block.
        // maybe it's still clear which one he means, though?
        var block_dir = null;
        
        Pos.each_dir(function(dir) {
          var pos = r.player.pos.plus(dir.x, dir.y);
          var moveable = r.moveable_at(pos);
          
          if (moveable && moveable.forked) {
            block_dir = dir;
          }
        });
        
        if (block_dir) {
          // that must be the block the player meant.
          // turn towards it and try again
          r.player.dir = block_dir;
          update_moveable(r.player);
          
          fork_unfork_room();
        }
      }
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
        case Keycode.left: move_player(-1, 0); return true;
        case Keycode.right: move_player(1, 0); return true;
        case Keycode.up: move_player(0, -1); return true;
        case Keycode.down: move_player(0, 1); return true;

        case Keycode.esc: /* falls through */
        case Keycode.R: try_again(); return false;

        case Keycode.Z:     /* falls through */
        case Keycode.X:     /* falls through */
        case Keycode.F:     /* falls through */
        case Keycode.ctrl:  /* falls through */
        case Keycode.space: fork_unfork_room(); return false;
        
        //case Keycode.tab: next_room(); return true;
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
        Theatre.queue.enqueue(function() {
          if (level == new_level && level != loaded_level) {
            load_level(new_level);
          } else {
            // the level-skipping keys were pressed repeatedly,
            // wait until the user stops
          }
        });
      }
    }

    return false;
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
