$(function() {
  var toplevel_container = $('#content');
  var is_movement_allowed = true;
  var is_fork_allowed = false;
  
  
  var level = 0;
  var multiroom = null;
  var theatre = Theatre.empty();
  
  function load_level(index) {
    is_movement_allowed = false;
    
    theatre.remove(function() {
      level = index;
      multiroom = World.load_multiroom(level);
      is_movement_allowed = true;
      
      theatre = Theatre.create(toplevel_container, multiroom, function() {
        is_fork_allowed = true;
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
    
    var old_index = room.player_index();
    var new_index = old_index.plus(dx, dy);
    var new_index2 = old_index.plus(2*dx, 2*dy);
    
    var target = room.tile_at(new_index);
    var target2 = room.tile_at(new_index2);
    
    if (target === Tile.goal) {
      next_level();
    } else if (target === Tile.block && !target2.solid) {
      var block = room.entity_at(new_index);
      
      room.move(block, new_index2);
      room.move_player(new_index);
    } else if (!target.solid) {
      room.move_player(new_index);
      if (target === Tile.button) {
        room.each_door(function(index, tile) {
          room.change_tile(index, Tile.open_door);
        });
      }
    }
  }
  
  
  function fork_room() {
    if (is_fork_allowed) {
      is_fork_allowed = false;
      
      multiroom.fork();
    }
  }
  
  
  var keyHandler;
  function handleKey(key) {
    // return false for keys which don't mess with the browser state,
    // this will allow browser commands like Cmd+R to work.
    
    if (is_movement_allowed) {
      switch(key) {
      case Keycode.left:  move_player(-1, 0); return true;
      case Keycode.right: move_player( 1, 0); return true;
      case Keycode.up:    move_player( 0,-1); return true;
      case Keycode.down:  move_player( 0, 1); return true;
      
      case Keycode.esc: /* falls through */
      case Keycode.R: try_again(); return false;
      
      case Keycode.F: fork_room(); return false;
      
      case Keycode.tab: multiroom.next_room(); return true;
      }
    }
    
    return false;
  }
  
  
  function begin() {
    toplevel_container.addClass('well').empty();
    load_level(0);
    keyHandler = handleKey;
  }
  
  $('#begin').click(begin);
  
  // first keypress begins the game
  keyHandler = begin;
  $(document).keydown(function(e) {
    if (keyHandler(e['keyCode'])) {
      e.preventDefault();
    }
  });
});
