// a stack of Layers.
// it watches a room change, and updates the sprites to match.

var Scene = {
  create: function(container, room) {
    var element = $('<div class="scene"/>');
    
    // start invisible
    element.transition({opacity: 0}, 0);
    
    // add the floor
    var floor_tiles = this.create_floor(room);
    Layer.create(element, floor_tiles);
    
    // add the actual obstacles
    var tiles = this.extract_tiles(room);
    var layer = Layer.create(element, tiles);
    
    // add color filters on the very top, to tint the entire scene
    var dark_filter = this.create_filter(element, 'dark');
    var light_filter = this.create_filter(element, 'light');
    
    container.prepend(element);
    
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
        return this;
      },
      show: function(callback) {
        if (arguments.length == 0) {
          // show immediately
          element.transition({opacity: 1}, 0);
        } else {
          element.transition({opacity: 1}, 'slow', callback);
        }
        return this;
      },
      
      darken: function(callback) {
        dark_filter.transition({opacity: 0.1}, 0, callback);
        return this;
      },
      lighten: function(callback) {
        dark_filter.transition({opacity: 0}, 0);
        light_filter.transition({opacity: 0.2}, 0, function() {
          light_filter.transition({opacity: 0}, 'slow', callback);
        });
        return this;
      },

      move_center: function (callback) {
        element.transition({ scale: 1, opacity: 1, x: 0 }, callback);
        return this;
      },
      move_to: function(x, callback) {
        // move, scale down, and make sure it's visible
        element.transition({scale: 0.5, opacity: 1, x: x}, callback);
        return this;
      },
      move_left: function(callback) {
        return this.move_to(-410);
      },
      move_right: function(callback) {
        return this.move_to(410);
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
  },
  
  create_filter: function(container, class_name) {
    var filter = $('<div class="'+class_name+' filter"/>');
    
    // start invisible
    filter.transition({opacity: 0}, 0);
    container.append(filter);
    
    return filter;
  }
};
