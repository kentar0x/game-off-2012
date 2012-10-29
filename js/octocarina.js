$(function() {
    var toplevel_container = $('#content');
    var first_container = null;
    var second_container = null;
    var is_fork_allowed = false;
    
    
    var level = 0;
    var room = null;
    var first_room = null;
    var second_room = null;
    
    function create_room_container() {
      var element = $('<div class="room"/>');
      
      toplevel_container.prepend(element);
      return element;
    }
    
    function really_load_level(index) {
      level = index;
      room = first_room = World.load_room(level);
      Cake.display(first_container, first_room);
      first_container.transition({opacity: 1}, 'slow');
      
      is_fork_allowed = true;
    }
    
    function load_level(index) {
      if (second_container) {
        var element = second_container;
        element.transition({opacity: 0}, function() {
          element.remove();
        });
        
        second_container = second_room = null;
      }
      
      if (!first_container) {
        first_container = create_room_container();
        first_container.transition({opacity: 0}, 0,
                         function() {
                           really_load_level(index);
                         });
      } else {
        first_container.transition({opacity: 0})
                       .transition({scale: 1.0, x: 0}, 0,
                         function() {
                           really_load_level(index);
                         });
      }
    }
    
    function try_again() {
      load_level(level);
    }
    
    function next_level() {
      load_level(level + 1);
    }
    
    
    function move_player(dx, dy) {
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
    
    
    function fork_room() {
      if (is_fork_allowed) {
        is_fork_allowed = false;
        
        second_container = create_room_container();
        room = second_room = World.load_room(level);
        Cake.display(second_container, second_room);
        
        first_container.transition({scale: 0.5, x: -410});
        second_container.transition({scale: 0.5, x: 410});
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
