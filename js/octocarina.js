$(function() {
    var toplevel_container = $('#content');
    var sprite_container = toplevel_container;
    
    
    var tile_symbols =         "."+         "#"+            "b"+           "*"+             "C";
    var tile_types = ["empty-tile", "wall-tile", "block-sprite", "goal-sprite", "player-sprite"];
    
    function parse_tile_type(tile) {
      return tile_symbols.indexOf(tile);
    }
    
    function add_tile(tile_type) {
      var cls = tile_types[tile_type];
      var tile = $('<div class="sprite"/>').addClass(cls);
      
      sprite_container.append(tile);
      return tile;
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
