var Level_View = {
  create: function(container, level_model) {
    container.empty();
    
    var view = {
      add_tile: function(tile_type) {
        var cls = Level_Data.class_for_tile_type(tile_type);
        var tile = $('<div class="sprite"/>').addClass(cls);
        
        container.append(tile);
        return tile;
      }
    };
    
    var tile_types = level_model.tiles;
    
    var floor = Level_Data.type_for_tile_symbol('.');
    var empty = Level_Data.type_for_tile_symbol(' ');
    
    // convert the tile types into tile sprites
    for(var i=0; i<tile_types.length; ++i) {
      var tile_type = tile_types[i];
      
      if (tile_type == floor) {
        tile_type = empty;
      }
      view.add_tile(tile_type);
    }
    
    return view;
  }
};
