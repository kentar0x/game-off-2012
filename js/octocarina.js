$(function() {
    var toplevel_container = $('#content');
    var sprite_container = toplevel_container;
    
    
    var current_tile_type = 0;
    var tile_types = ["empty-tile", "wall-tile", "block-sprite", "goal-sprite", "player-sprite"];
    var current_tile = $('<div class="sprite"/>');
    
    function change_tile_type(new_type) {
      new_type = (new_type + tile_types.length) % tile_types.length;
      
      current_tile.removeClass(tile_types[current_tile_type]);
      current_tile_type = new_type;
      current_tile.addClass(tile_types[current_tile_type]);
      
      console.log(tile_types[current_tile_type]);
    }
    
    function add_tile(tile_type) {
      current_tile = $('<div class="sprite"/>');
      change_tile_type(tile_type);
      sprite_container.append(current_tile);
      
      return current_tile;
    }
    
    
    function handleKey(key) {
      switch (key) {
      case keycodes.left: /* falls through */
      case keycodes.up:
        change_tile_type(current_tile_type - 1);
        break;
      
      case keycodes.right: /* falls through */
      case keycodes.down:
        change_tile_type(current_tile_type + 1);
        break;
      
      case keycodes.Z:
        add_tile(current_tile_type);
        break;
      }
    }
    
    $('#begin').click(function() {
      toplevel_container.addClass('well').empty();
    });
    
    $(document).keydown(function(e) {
      handleKey(e['keyCode']);
    });
});
