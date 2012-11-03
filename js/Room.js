// a grid of Tiles.
// tiles can change type, and you can listen for those changes.

var Room = {
  from_tiles: function(tiles) {
    // find the player and the other moving entities
    var player = null;
    var entities = tiles.map(function(pos, tile) {
      if (tile.moveable) {
        var moveable = {pos: pos, tile: tile, floor: Tile.empty};
        
        if (tile === Tile.player) {
          player = moveable;
        }
        
        return moveable;
      } else {
        return null;
      }
    });
    
    var change_tile_callbacks = $.Callbacks();
    var move_callbacks = $.Callbacks();
    return {
      size: tiles.size,
      w: tiles.w,
      h: tiles.h,
      
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
      each_door: function(body) {
        tiles.each(function(index, tile) {
          if( tile === Tile.open_door || tile === Tile.closed_door )
            body(index, tile);
        });
      },
      
      entity_at: function(pos) {
        return entities.at(pos);
      },
      force_move: function(moveable, new_pos) {
        if (arguments.length == 1) {
          // add a watcher
          var callback = moveable;
          move_callbacks.add(callback);
        } else {
          var old_pos = moveable.pos;
          var old_floor = moveable.floor;
          var new_floor = this.tile_at(new_pos);

          var self = this;
          if (old_floor === Tile.button) {
            this.each_door(function(index, tile) {
              self.change_tile(index, Tile.closed_door);
            });
          }
          
          this.change_tile(old_pos, old_floor);
          this.change_tile(new_pos, moveable.tile);
          
          entities.change_at(old_pos, null);
          entities.change_at(new_pos, moveable);
          
          if (new_floor === Tile.button) {
            var self = this;
            this.each_door(function(index, tile) {
              self.change_tile(index, Tile.open_door);
            });
          }
          
          // notify watchers
          move_callbacks.fire(moveable, new_pos);
          
          moveable.pos = new_pos;
          moveable.floor = new_floor;
        }
      },
      move: function(moveable, dx, dy) {
        var old_index = moveable.pos;
        var new_index = old_index.plus(dx, dy);
        var new_index2 = old_index.plus(2*dx, 2*dy);
        
        var target = this.tile_at(new_index);
        var target2 = this.tile_at(new_index2);
        
        if (target.moveable && !target2.solid) {
          var block = this.entity_at(new_index);
          
          this.force_move(block, new_index2);
          this.force_move(moveable, new_index);
        } else if (!target.solid) {
          this.force_move(moveable, new_index);
        }
      },
      
      player_index: function() {
        return player.pos;
      },
      player_entity: player,
      move_player: function(dx, dy) {
        this.move(player, dx, dy);
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
