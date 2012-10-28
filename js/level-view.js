var Level_View = {
  create: function(container, level_model) {
    container.empty();
    
    var view = {
      add_layer: function() {
        this.current_layer = $('<div class="layer"/>');
        
        container.append(this.current_layer);
        return this.current_layer;
      },
      add_tile: function(tile_type) {
        var cls = Level_Data.class_for_tile_type(tile_type);
        var tile = $('<div class="sprite"/>').addClass(cls);
        
        this.current_layer.append(tile);
        return tile;
      }
    };
    
    level_model.when_type_changes(function(tile_index, old_type, new_type) {
      var tile = view.tiles[tile_index];
      var old_class = Level_Data.class_for_tile_type(old_type);
      var new_class = Level_Data.class_for_tile_type(new_type);
      
      tile.removeClass(old_class).addClass(new_class);
    });
    
    
    var tile_types = level_model.tiles;
    var n = tile_types.length;
    
    // add the floor
    view.add_layer();
    for(var i=0; i<n; ++i) {
      var tile_type = tile_types[i];
      
      view.add_tile(Tile.floor);
    }
    
    // convert the tile types into tile sprites
    view.tiles = new Array(n);
    view.add_layer();
    for(var i=0; i<n; ++i) {
      var tile_type = tile_types[i];
      
      view.tiles[i] = view.add_tile(tile_type);
    }
    
    return view;
  }
};
