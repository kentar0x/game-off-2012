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
  
  function is_movement_allowed() {
    // don't allow the player to move if an animation is under way
    return foreground_animations.is_empty();
  }
  
  function player_has_fork() {
    return multiroom.current_room().player.forked;
  }


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
    foreground_animations.then_wait_for(600).then(function() {
      multiroom.current_room().move(move.moveable, move.dx, move.dy);
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

      var room = multiroom.current_room();
      multibuttons = Multibuttons.create(room);
      forkedBlock = ForkedBlock.create(room);

      room.player.forked = true;
      room.player.dir = Pos.create(0, 1);
      
      theatre = Theatre.create(toplevel_container, room);
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


  function move_player(dx, dy) {
    var room = multiroom.current_room();
    var pos = room.player.pos.plus(dx, dy);
    var block = room.moveable_at(pos);
    var old_dir = room.player.dir;
    var same_dir = old_dir && dx == old_dir.x && dy == old_dir.y;
    
    if (block && !same_dir) {
      room.player.dir = Pos.create(dx, dy);
      room.update_moveable(room.player);
    } else {
      room.move_player(dx, dy);
    }
    process_events();

    if (room.player.floor == Tile.open_door) {
      next_level();
    }
  }


  function fork_unfork_room() {
    if (player_has_fork()) {
      var room = multiroom.current_room();
      var dir = room.player.dir;
      var pos = room.player.pos.plus(dir.x, dir.y);
      var block = room.moveable_at(pos);

      if (block) {
        block.forked = true;
        room.update_moveable(block);
        
        room.player.forked = false;
        room.update_moveable(room.player);
        
        multiroom.fork(block);
        process_events();
      } else {
        // player is not facing a block.
        // maybe it's still clear which one he means, though?
        var block_count = 0;
        var block_dir = null;
        
        Pos.each_dir(function(dir) {
          var pos = room.player.pos.plus(dir.x, dir.y);
          var moveable = room.moveable_at(pos);
          
          if (moveable) {
            ++block_count;
            block_dir = dir;
          }
        });
        
        if (block_count == 1) {
          // that must be the block the player meant.
          // turn towards it and try again
          room.player.dir = block_dir;
          room.update_moveable(room.player);
          process_events();
          
          fork_unfork_room();
        }
      }
    } else {
      var room = multiroom.current_room();
      var dir = room.player.dir;
      var pos = room.player.pos.plus(dir.x, dir.y);
      var block = room.moveable_at(pos);
      
      if (block) {
        // pick up the fork
        {
          block.forked = false;
          room.update_moveable(block);
          
          room.player.forked = true;
          room.update_moveable(room.player);
          
          process_events();
        }
        
        // merge the timelines;
        // we go back into the old room, and thus need
        // to consider the block's instance from that room
        {
          multiroom.merge(block);
          room = multiroom.current_room();
          block = room.moveable_from_id(block.id);
        }
        
        // repeat the changes in the old timeline
        {
          block.forked = false
          room.update_moveable(block);
          
          room.player.forked = true;
          room.update_moveable(room.player);
          
          process_events();
        }
      } else {
        // player is not facing a block.
        // maybe it's still clear which one he means, though?
        var block_dir = null;
        
        Pos.each_dir(function(dir) {
          var pos = room.player.pos.plus(dir.x, dir.y);
          var moveable = room.moveable_at(pos);
          
          if (moveable && moveable.forked) {
            block_dir = dir;
          }
        });
        
        if (block_dir) {
          // that must be the block the player meant.
          // turn towards it and try again
          room.player.dir = block_dir;
          room.update_moveable(room.player);
          process_events();
          
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
