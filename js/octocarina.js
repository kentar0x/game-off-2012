$(function () {
  var toplevel_container = $('#content');
  var is_movement_allowed = true;
  var player_has_fork = true;
  var debug = false;


  var level = 0;
  var multiroom = null;
  var multibuttons = null;
  var forkedBlock = null;
  var theatre = Theatre.empty();

  function process_events() {
    multibuttons.process_events(multiroom);
    forkedBlock.process_events(multiroom);
    theatre.process_events(multiroom);
    multiroom.clear_events();
  }

  function load_level(index) {
    level = index;
    is_movement_allowed = false;
    player_has_fork = true;

    theatre.remove(function () {
      multiroom = World.load_multiroom(index);

      multibuttons = Multi.create(multiroom.current_room(), Buttons.create);
      forkedBlock = ForkedBlock.create();

      is_movement_allowed = true;

      theatre = Theatre.create(toplevel_container, multiroom, function () {
        if (level != index) {
          // level changed during the animation, load again
          load_level(level);
        }
      });
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

    if (room.player.floor == Tile.goal) {
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

    if (is_movement_allowed) {
      switch (key) {
        case Keycode.left: move_player(-1, 0); return true;
        case Keycode.right: move_player(1, 0); return true;
        case Keycode.up: move_player(0, -1); return true;
        case Keycode.down: move_player(0, 1); return true;

        case Keycode.esc: /* falls through */
        case Keycode.R: try_again(); return false;

        case Keycode.Z: fork_unfork_room(); return false;
        case Keycode.tab: next_room(); return true;

        // secret level-skipping keys!
        case Keycode.O: if (debug) load_level(level-1); return false;
        case Keycode.P: if (debug) load_level(level+1); return false;
      }
    } else if (debug) {
      switch (key) {
        // keep pressing while the level is loading.
        case Keycode.O: --level; return false;
        case Keycode.P: ++level; return false;
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
