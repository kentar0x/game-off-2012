$(function() {
    var toplevel_container = $('#content');
    var sprite_container = toplevel_container;
    
    
    var level = 0;
    var room;
    
    function load_level(index) {
      level = index;
      room = World.load_room(level);
      Cake.display(sprite_container, room);
    }
    
    function try_again() {
      load_level(level);
    }
    
    function next_level() {
      load_level(level + 1);
    }
    
    
    function move(old_index, dx, dy) {
      return old_index + dx + room.width*dy;
    }
    
    function move_player(dx, dy) {
      var old_index = room.player_index();
      var new_index = move(old_index, dx, dy);
      var new_index2 = move(old_index, 2*dx, 2*dy);
      
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
    
    var keyHandler;
    function handleKey(key) {
      switch(key) {
      case Keycode.left:  return move_player(-1, 0);
      case Keycode.right: return move_player( 1, 0);
      case Keycode.up:    return move_player( 0,-1);
      case Keycode.down:  return move_player( 0, 1);
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
