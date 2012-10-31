// a stack of Layers.
// it watches a room change, and updates the sprites to match.

var Scene = {
  create: function(container, room) {
    var element = $('<div class="scene"/>');
    
    // start invisible
    element.transition({opacity: 0}, 0);
    
    container.prepend(element);
    
    // add the floor
    var floor_tiles = this.create_floor(room);
    Layer.create(element, floor_tiles);
    
    // add the actual obstacles
    var tiles = this.extract_tiles(room);
    var layer = Layer.create(element, tiles);
    
    // monitor tile changes
    room.change_tile(function(index, new_tile) {
      var sprite = layer.sprite_at(index);
      
      sprite.change_tile(new_tile);
    });
    
    return {
      hide: function(callback) {
        if (arguments.length == 0) {
          // hide immediately
          element.transition({opacity: 0}, 0);
        } else {
          element.transition({opacity: 0}, callback);
        }
      },
      show: function(callback) {
        if (arguments.length == 0) {
          // show immediately
          element.transition({opacity: 1}, 0);
        } else {
          element.transition({opacity: 1}, 'slow', callback);
        }
      },
      
      move_to: function(x, callback) {
        // move, scale down, and make sure it's visible
        element.transition({scale: 0.5, opacity: 1, x: x}, callback);
      },
      move_left: function(callback) {
        this.move_to(-410);
      },
      move_right: function(callback) {
        this.move_to(410);
      },
      
      remove: function(callback) {
        this.hide(function() {
          element.remove();
          if (callback) callback();
        });
      }
    };
  },
  
  create_floor: function(room) {
    // we make a special case when the last row is all walls,
    // because the row of ground tiles look out of place in that case.
    var all_walls = true;
    {
      var y = room.h - 1;
      for(var x=0; x<room.w; ++x) {
        var pos = Pos.create(x, y);
        var tile = room.tile_at(pos);
        
        if (tile !== Tile.wall) {
          all_walls = false;
          break;
        }
      }
    }
    
    return Table.create(room.size, function(index) {
      var tile = room.tile_at(index);
      
      if (all_walls && index.y == y) {
        return Tile.empty;
      } else {
        return Tile.floor;
      }
    });
  },
  extract_tiles: function(room) {
    return Table.create(room.size, function(index) {
      return room.tile_at(index);
    });
  }
};
