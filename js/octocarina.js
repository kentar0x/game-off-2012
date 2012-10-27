$(function() {
    function toplevel_container() {
      return $('#content');
    }
    
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
      }
    }
    
    $('#begin').click(function() {
      var container = toplevel_container();
      container.addClass('well');
      container.empty();
      container.append(current_tile);
      change_tile_type(0);
    });
    
    $(document).keydown(function(e) {
      handleKey(e['keyCode']);
    });
});
