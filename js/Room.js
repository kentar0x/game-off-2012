// a grid of Tiles.
// tiles can change type, and you can listen for those changes.

var Room = {
  create: function(tiles, moveables) {
    // find the player and other important moveables
    var player = null;
    var lover = null;
    var green = null;
    var forktopus = null;
    moveables.each(function(moveable) {
      if (moveable.tile.player) {
        player = moveable;
      } else if (moveable.tile.lover) {
        lover = moveable;
      } else if (moveable.tile.color == 'green') {
        green = moveable;
      } else if (moveable.tile.forktopus) {
        forktopus = moveable;
      }
    });
    
    var tile_changes = EventQueue.create();
    var moves = EventQueue.create();
    return {
      size: tiles.size,
      w: tiles.w,
      h: tiles.h,

      tile_at: function (pos) {
        return tiles.at(pos, function () {
          // prevent the player from falling off the map
          return Tile.wall;
        });
      },
      floor_tile_at: function(pos) {
        var moveable = moveables.at(pos);
        
        if (moveable) {
          return moveable.floor;
        } else {
          return this.tile_at(pos);
        }
      },

      tile_changes: tile_changes,
      change_tile: function (pos, new_tile) {
        var old_tile = tiles.at(pos);

        tiles.change_at(pos, new_tile);

        // remember the change
        tile_changes.add({
          pos: pos,
          old_tile: old_tile,
          new_tile: new_tile
        });
      },
      each_tile: function (body) {
        tiles.each(function (pos, tile) {
          body(pos, tile);
        });
      },
      each_door: function (body) {
        tiles.each(function (pos, tile) {
          if (tile === Tile.open_door || tile === Tile.closed_door)
            body(pos, tile);
        });
      },

      moveable_at: function (pos) {
        return moveables.at(pos);
      },
      moveable_from_id: function (id) {
        return moveables.from_id(id);
      },

      moves: moves,
      force_move: function (moveable, new_pos) {
        var old_pos = moveable.pos;
        var old_floor = moveable.floor;
        var new_floor = this.tile_at(new_pos);
        
        this.change_tile(old_pos, old_floor);
        this.change_tile(new_pos, moveable.tile);

        moveables.swap(old_pos, new_pos);
        
        if (old_pos !== new_pos) {
          moveable.floor = new_floor;
        }

        // remember the move
        moves.add({
          moveable: moveable,
          old_pos: old_pos,
          new_pos: new_pos,
          old_floor: old_floor,
          new_floor: new_floor
        });
      },
      update_moveable: function (moveable) {
        this.force_move(moveable, moveable.pos);
      },
      remove_moveable: function (moveable) {
        moveables.remove(moveable);
        this.change_tile(moveable.pos, moveable.floor);
      },
      move: function (moveable, dx, dy) {
        var old_pos = moveable.pos;
        var new_pos = old_pos.plus(dx, dy);
        var new_pos2 = old_pos.plus(2 * dx, 2 * dy);

        var target = this.tile_at(new_pos);
        var target2 = this.tile_at(new_pos2);

        if (target.moveable && !target2.solid) {
          var block = this.moveable_at(new_pos);

          this.force_move(block, new_pos2);
          this.force_move(moveable, new_pos);
        } else if (!target.solid) {
          this.force_move(moveable, new_pos);
        }
		else{
			this.force_move(moveable, moveable.pos);
		}
		
      },

      player: player,
      player_pos: function () {
        return player.pos;
      },
      move_player: function (dx, dy) {
        player.dir = Pos.create(dx, dy);
        this.move(player, dx, dy);
      },

      lover: lover,
      lover_pos: function () {
        return lover.pos;
      },
      move_lover: function (dx, dy) {
        lover.dir = Pos.create(dx, dy);
        this.move(lover, dx, dy);
      },

      green: green,
      green_pos: function () {
        return green.pos;
      },
      move_green: function (dx, dy) {
        green.dir = Pos.create(dx, dy);
        this.move(green, dx, dy);
      },

      forktopus: forktopus,
      forktopus_pos: function () {
        return forktopus.pos;
      },
      move_forktopus: function (dx, dy) {
        forktopus.dir = Pos.create(dx, dy);
        this.move(forktopus, dx, dy);
      },

      copy: function () {
        return Room.create(tiles.copy(), moveables.copy());
      },

      clear_events: function () {
        tile_changes.clear();
        moves.clear();
      }
    };
  },
  from_tiles: function (tiles) {
    // find the moveables
    var player = null;
    var moveable_table = tiles.map(function (pos, tile) {
      if (tile.moveable) {
        var moveable = Moveable.create(tile);
        
        if (tile.forked) {
          moveable.forked = tile.forked;
        }
        
        return moveable;
      } else {
        return null;
      }
    });
    var moveables = Tracker.from_moveable_table(moveable_table);
    
    return this.create(tiles, moveables);
  },
  from_data: function (data) {
    // convert the tile symbols into tile types
    var tiles = data.symbols.map(function (pos, symbol) {
      return Tile.from_symbol(symbol);
    });
    
    return this.from_tiles(tiles);
  }
};
