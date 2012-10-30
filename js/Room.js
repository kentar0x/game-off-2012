// a grid of Tiles.
// tiles can change type, and you can listen for those changes.

var Room = {
  from_tiles: function(tiles) {
    var w = tiles.w;
    var h = tiles.h;
    
    // find the player
    var player_index = null;
    tiles.each(function(index, tile) {
      if (tile == Tile.player) {
        player_index = index;
      }
    });
    
    var change_tile_callbacks = $.Callbacks();
    return {
      size: tiles.size,
      w: w,
      h: h,
      
      tile_at: function(index) {
        return tiles.at(index, function() {
          // prevent the player from falling off the map
          return Tile.wall;
        });
      },
      change_tile: function(index, new_tile) {
        if (arguments.length == 1) {
          // add a watcher
          var callback = index;
          change_tile_callbacks.add(callback);
        } else {
          // notify watchers
          change_tile_callbacks.fire(index, new_tile);
          
          tiles.change_at(index, new_tile);
        }
      },
      
      move_tile: function(old_index, new_index) {
        var tile = tiles.at(old_index);
        
        this.change_tile(old_index, Tile.empty);
        this.change_tile(new_index, tile);
      },
      
      player_index: function() {
        return player_index;
      },
      move_player: function(new_index) {
        this.move_tile(player_index, new_index);
        
        player_index = new_index;
      },
      
      fork: function() {
        return Room.from_tiles(tiles.copy());
      }
    };
  },
  from_symbols: function(tile_symbols) {
    // convert the tile symbols into tile types
    var tiles = tile_symbols.map(function(index, symbol) {
      return Tile.from_symbol(symbol);
    });
    
    return this.from_tiles(tiles);
  }
};
