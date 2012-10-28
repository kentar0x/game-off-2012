var Level_View = {
  monitor: function(container, level_model) {
    container.empty();
    
    var current_layer;
    function add_layer() {
      current_layer = $('<div class="layer"/>');
      
      container.append(current_layer);
      return current_layer;
    }
    function add_tile(tile_type) {
      var cls = Level_Data.class_for_tile_type(tile_type);
      var tile = $('<div class="sprite"/>').addClass(cls);
      
      current_layer.append(tile);
      return tile;
    }
    
    var tile_types = level_model.tiles;
    var n = tile_types.length;
    
    // add the floor
    add_layer();
    for(var i=0; i<n; ++i) {
      var tile_type = tile_types[i];
      
      add_tile(Tile.floor);
    }
    
    // convert the tile types into tile sprites
    var tiles = new Array(n);
    add_layer();
    for(var i=0; i<n; ++i) {
      var tile_type = tile_types[i];
      
      tiles[i] = add_tile(tile_type);
    }
    
    // monitor type changes
    level_model.when_type_changes(function(tile_index, old_type, new_type) {
      var tile = tiles[tile_index];
      var old_class = Level_Data.class_for_tile_type(old_type);
      var new_class = Level_Data.class_for_tile_type(new_type);
      
      tile.removeClass(old_class).addClass(new_class);
    });
  }
};
