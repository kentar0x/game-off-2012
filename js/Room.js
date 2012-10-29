// a grid of Tiles.
// tiles can change type, and you can listen for those changes.

var Room = {
  create: function(tile_symbols) {
    var n = tile_symbols.length;
    
    // convert the tile symbols into tile types
    var tiles = new Array(n);
    for(var i=0; i<n; ++i) {
      tiles[i] = Tile.from_symbol(tile_symbols[i]);
    }
    
    var tile_change_callbacks = $.Callbacks();
    return {
      tile_change: function(callback) {
        tile_change_callbacks.add(callback);
      },
      
      size: tiles.length,
      tile_at: function(index) {
        if (index < 0 || index >= tiles.length) {
          // prevent the player from falling off the map
          return Tile.wall;
        } else {
          return tiles[index];
        }
      },
      change_tile: function(index, new_tile) {
        // notify watchers
        tile_change_callbacks.fire(index, new_tile);
        
        tiles[index] = new_tile;
      }
    };
  }
};
