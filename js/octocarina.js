$(function() {
    var toplevel_container = $('#content');
    var sprite_container = toplevel_container;
    
    
    var level_number = 0;
    var level_model;
    var level_view;
    
    function load_level(i) {
      level_number = i;
      level_model = Level_Model.load(level_number);
      level_view = Level_View.create(sprite_container, level_model);
    }
    
    function try_again() {
      load_level(level_number);
    }
    
    function next_level() {
      load_level(level_number + 1);
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
