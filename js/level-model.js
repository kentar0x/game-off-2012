var Level_Model = {
  load: function(level_number) {
    var level_data = Level_Data.load(level_number);
    var n = level_data.length;
    
    // convert the tile symbols into tile types
    var tiles = new Array(n);
    for(var i=0; i<n; ++i) {
      var tile_symbol = level_data[i];
      var tile_type = Level_Data.type_for_tile_symbol(tile_symbol);
      
      tiles[i] = tile_type;
    }
    
    return {
      tiles: tiles,
      
      when_type_changes_callbacks: $.Callbacks(),
      when_type_changes: function(callback) {
        this.when_type_changes_callbacks.add(callback);
      },
      
      change_tile_type: function(tile_index, new_type) {
        var old_type = this.tiles[tile_index];
        this.when_type_changes_callbacks.fire(tile_index, old_type, new_type);
        
        this.tiles[tile_index] = new_type;
      }
    };
  }
};
