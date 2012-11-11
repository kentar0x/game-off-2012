$(function () {
  var toplevel_container = $('#content');
  var player_has_fork = true;
  var debug = false;


  var level = 0;
  var loaded_level = null;
  var multiroom = null;
  var multibuttons = null;
  var forkedBlock = null;
  var theatre = Theatre.empty();

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
    Movement.enqueue(function() {
    }).then_wait_for(600).then(function() {
      multiroom.current_room().move(move.moveable, move.dx, move.dy);
      process_events();
    });
  }
  
  function process_moves(moves) {
    moves.each(process_move);
    moves.clear();
  }
  

  function load_level(index) {
    level = index;
    player_has_fork = true;

    Movement.enqueue(function() {
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

      theatre = Theatre.create(toplevel_container, room);
    });
  }

  function try_again() {
    load_level(level);
  }

  function next_level() {
    load_level(level + 1);
  }


  function move_player(dx, dy) {
    var room = multiroom.current_room();

    room.move_player(dx, dy);
    process_events();

    if (room.player.floor == Tile.open_door) {
      next_level();
    }
  }


  function fork_unfork_room() {
    if (player_has_fork) {
      var room = multiroom.current_room();
      var dir = room.player.dir;
      var pos = room.player.pos.plus(dir.x, dir.y);
      var block = room.moveable_at(pos);

      if (block) {
        player_has_fork = false;
        multiroom.fork(block);
        process_events();
      }
    } else {
      var room = multiroom.current_room();
      var block = null;
      
      Pos.each_dir(function(dir) {
        var pos = room.player.pos.plus(dir.x, dir.y);
        var moveable = room.moveable_at(pos);
        
        if (moveable && moveable.forked) {
          block = moveable;
        }
      });
      
      if (block) {
        player_has_fork = true;
        multiroom.merge(block);
        process_events();
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

    if (Movement.allowed()) {
      switch (key) {
        case Keycode.left: move_player(-1, 0); return true;
        case Keycode.right: move_player(1, 0); return true;
        case Keycode.up: move_player(0, -1); return true;
        case Keycode.down: move_player(0, 1); return true;

        case Keycode.esc: /* falls through */
        case Keycode.R: try_again(); return false;

        case Keycode.Z: fork_unfork_room(); return false;
        case Keycode.tab: next_room(); return true;
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
