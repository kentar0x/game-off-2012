$(function() {
    var toplevel_container = $('#content');
    var is_movement_allowed = true;
    var is_fork_allowed = false;
    
    
    var level = 0;
    var room = null;
    var first_room = null;
    var second_room = null;
    var first_scene = null;
    var second_scene = null;
    
    function really_load_level(index) {
      level = index;
      room = first_room = World.load_room(level);
      is_movement_allowed = true;
      
      first_scene = Scene.create(toplevel_container, first_room);
      first_scene.show(function() {
        is_fork_allowed = true;
      });
    }
    
    function load_level(index) {
      is_movement_allowed = false;
      
      if (second_scene) {
        second_scene.remove();
        second_scene = null;
      }
      if (first_scene) {
        first_scene.remove(function() {
          really_load_level(index);
        });
        first_scene = null;
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
        
        room = second_room = first_room.fork();
        second_scene = Scene.create(toplevel_container, second_room);
        
        first_scene.move_left();
        second_scene.move_right();
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
