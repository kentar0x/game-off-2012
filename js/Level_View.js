var Level_View = {
  monitor: function(container, level_model) {
    container.empty();
    
    var tile_types = level_model.tiles;
    var n = tile_types.length;
    
    // add the floor
    var floor_a_lot = new Array(n);
    for(var i=0; i<n; ++i) {
      floor_a_lot[i] = Tile.floor;
    }
    Layer.create(container, floor_a_lot);
    
    // convert the tile types into tile sprites
    var layer = Layer.create(container, tile_types);
    
    // monitor type changes
    level_model.when_type_changes(function(tile_index, old_type, new_type) {
      var sprite = layer.sprite_at(tile_index);
      
      sprite.change_tile(new_type);
    });
  }
};
