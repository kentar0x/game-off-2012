// a grid of Tiles.
// tiles can change type, and you can listen for those changes.

var Room = {
  from_tiles: function (tiles) {
    // find the player and the other moveables
    var player = null;
    var moveables = tiles.map(function (pos, tile) {
      if (tile.moveable) {
        var moveable = Moveable.create(tile);
        moveable.pos = pos;

        if (tile === Tile.player) {
          player = moveable;
        }

        return moveable;
      } else {
        return null;
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

      find_moveable: function (need_tile) {
        var object, 
            self = this;
        moveables.each(function (pos) {
          var tile = self.tile_at(pos);
          if (need_tile == tile) {
            object = moveables.at(pos);
            return;
          }
        });
        return object;
      },

      moves: moves,
      force_move: function (moveable, new_pos) {
        var old_pos = moveable.pos;
        var old_floor = moveable.floor;
        var new_floor = this.tile_at(new_pos);

        this.change_tile(old_pos, old_floor);
        this.change_tile(new_pos, moveable.tile);

        moveables.change_at(old_pos, null);
        moveables.change_at(new_pos, moveable);

        moveable.pos = new_pos;
        moveable.floor = new_floor;

        // remember the move
        moves.add({
          moveable: moveable,
          old_pos: old_pos,
          new_pos: new_pos,
          old_floor: old_floor,
          new_floor: new_floor
        });
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
      },

      player: player,
      player_pos: function () {
        return player.pos;
      },
      move_player: function (dx, dy) {
        this.move(player, dx, dy);
      },

      fork_at: function (dx, dy) {
        var pos = this.player_pos().plus(dx, dy);
        var tile = this.tile_at(pos);
        //Tile.forkable ???
        if (tile == Tile.block) {
          this.change_tile(pos, Tile.forked_block);
        }
      },
      copy: function () {
        return Room.from_tiles(tiles.copy());
      },

      clear_events: function () {
        tile_changes.clear();
        moves.clear();
      }
    };
  },
  from_symbols: function (tile_symbols) {
    // convert the tile symbols into tile types
    var tiles = tile_symbols.map(function (pos, symbol) {
      return Tile.from_symbol(symbol);
    });

    return this.from_tiles(tiles);
  }
};
