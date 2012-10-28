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
    
    // convert the tile types into tile sprites
    var tile_types = level_model.tiles;
    for(var i=0; i<tile_types.length; ++i) {
      var tile_type = tile_types[i];
      
      view.add_tile(tile_type);
    }
    
    return view;
  }
};
