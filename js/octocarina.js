$(function() {
    var toplevel_container = $('#content');
    var sprite_container = toplevel_container;
    
    
    var current_tile_type = 0;
    var tile_symbols =         "."+         "#"+            "b"+           "*"+             "C";
    var tile_types = ["empty-tile", "wall-tile", "block-sprite", "goal-sprite", "player-sprite"];
    var current_tile = $('<div class="sprite"/>');
    
    function parse_tile_type(tile) {
      return tile_symbols.indexOf(tile);
    }
    
    function change_tile_type(new_type) {
      new_type = (new_type + tile_types.length) % tile_types.length;
      
      current_tile.removeClass(tile_types[current_tile_type]);
      current_tile_type = new_type;
      current_tile.addClass(tile_types[current_tile_type]);
    }
    
    function add_tile(tile_type) {
      current_tile = $('<div class="sprite"/>');
      change_tile_type(tile_type);
      sprite_container.append(current_tile);
      
      return current_tile;
    }
    
    
    var current_level = 0;
    
    function load_level(level) {
      current_level = level;
      sprite_container.empty();
      var data = levels[current_level];
      for(var i=0; i<data.length; ++i) {
        add_tile(parse_tile_type(data[i]));
      }
    }
    
    function try_again() {
      load_level(current_level);
    }
    
    function next_level() {
      load_level(current_level + 1);
    }
    
    
    var keyHandler;
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
