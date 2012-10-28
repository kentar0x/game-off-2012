$(function() {
    var toplevel_container = $('#content');
    var sprite_container = toplevel_container;
    
    
    function add_tile(tile_type) {
      var cls = level_loader.class_for_tile_type(tile_type);
      var tile = $('<div class="sprite"/>').addClass(cls);
      
      sprite_container.append(tile);
      return tile;
    }
    
    
    var current_level = 0;
    
    function load_level(level) {
      current_level = level;
      sprite_container.empty();
      var data = level_loader.load_level_data(current_level);
      for(var i=0; i<data.length; ++i) {
        add_tile(level_loader.parse_tile_type(data[i]));
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
