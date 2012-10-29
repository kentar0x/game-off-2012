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
    
    
    var player_index = 33;
    function move_player(new_index) {
      if (!room.tile_at(new_index).solid) {
        player_index = new_index;
        
        room.move_player(player_index);
      }
    }
    
    var keyHandler;
    function handleKey(key) {
      switch(key) {
      case Keycode.left:  return move_player(player_index - 1);
      case Keycode.right: return move_player(player_index + 1);
      case Keycode.up:    return move_player(player_index - 8);
      case Keycode.down:  return move_player(player_index + 8);
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
