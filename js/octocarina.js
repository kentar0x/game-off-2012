$(function() {
    var toplevel_container = $('#content');
    var is_movement_allowed = true;
    var is_fork_allowed = false;
    
    
    var level = 0;
    var multiroom = null;
    var theatre = null;
    
    function really_load_level(index) {
      level = index;
      multiroom = World.load_multiroom(level);
      is_movement_allowed = true;
      
      theatre = Theatre.create(toplevel_container, multiroom, function() {
        is_fork_allowed = true;
      });
    }
    
    function load_level(index) {
      is_movement_allowed = false;
      
      if (theatre) {
        theatre.remove(function() {
          really_load_level(index);
        });
        theatre = null;
      } else {
        really_load_level(index);
      }
    }
    
    function try_again() {
      load_level(level);
    }
    
    function next_level() {
      load_level(level + 1);
    }
    
    
    function move_player(dx, dy) {
      if (is_movement_allowed) {
        var room = multiroom.current_room();
        
        var old_index = room.player_index();
        var new_index = old_index.plus(dx, dy);
        var new_index2 = old_index.plus(2*dx, 2*dy);
        
        var target = room.tile_at(new_index);
        var target2 = room.tile_at(new_index2);
        
        if (target == Tile.goal) {
          next_level();
        } else if (target == Tile.block && !target2.solid) {
          room.move_tile(new_index, new_index2);
          room.move_player(new_index);
        } else if (!target.solid) {
          room.move_player(new_index);
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
      switch(key) {
      case Keycode.left:  return move_player(-1, 0);
      case Keycode.right: return move_player( 1, 0);
      case Keycode.up:    return move_player( 0,-1);
      case Keycode.down:  return move_player( 0, 1);
      
      case Keycode.esc: /* falls through */
      case Keycode.R: return try_again();
      
      case Keycode.F: return fork_room();
      }
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
      keyHandler(e['keyCode']);
    });
});
