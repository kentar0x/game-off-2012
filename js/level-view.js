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
    
    var tile_types = level_model.tiles;
    var n = tile_types.length;
    
    var floor = Level_Data.type_for_tile_symbol('.');
    var empty = Level_Data.type_for_tile_symbol(' ');
    
    // add the floor
    view.add_layer();
    for(var i=0; i<n; ++i) {
      var tile_type = tile_types[i];
      
      view.add_tile(floor);
    }
    
    // convert the tile types into tile sprites
    view.add_layer();
    for(var i=0; i<n; ++i) {
      var tile_type = tile_types[i];
      
      if (tile_type == floor) {
        tile_type = empty;
      }
      view.add_tile(tile_type);
    }
    
    return view;
  }
};
