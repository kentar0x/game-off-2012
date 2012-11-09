// a stack of Layers.
// it watches a room change, and updates the sprites to match.

var Scene = {
  create: function(container, room) {
    var element = $('<div class="scene"/>');
    
    // start invisible
    element.transition({opacity: 0}, 0);
    
    // add the floor
    var floor_tiles = this.create_floor(room);
    Layer.create(element, floor_tiles, room);
    
    // add the actual obstacles
    var tiles = this.extract_tiles(room);
    var layer = Layer.create(element, tiles, room);
    
    // add text on top
    if (room.text) {
      var text_layer = $('<div class="text"/>');
      var i = 0;
      var delay = 500;
      function display_next_line() {
        if (i < room.text.length) {
          var p = $('<p/>').text(room.text[i++]);
          
          // start invisible
          p.transition({opacity: 0}, 0);
          
          text_layer.append(p);
          
          // appear gradually
          
          p.delay(delay)
           .transition({opacity: 0.99}, 2000, 'out', display_next_line);
          delay = 500;
        }
      }
      
      element.append(text_layer);
      display_next_line();
    }
    
    // add color filters on the very top, to tint the entire scene
    var dark_filter = this.create_filter(element, 'dark');
    var light_filter = this.create_filter(element, 'light');
    
    container.prepend(element);
    
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
      
      process_events: function(events) {
        events.tile_changes.each(function(tile_change) {
          var sprite = layer.sprite_at(tile_change.pos);
          
          sprite.change_tile(tile_change.new_tile);
        });
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
    
    return Table.create(room.size, function(pos) {
      var tile = room.tile_at(pos);
      
      if (all_walls && pos.y == y) {
        return Tile.empty;
      } else {
        return Tile.floor;
      }
    });
  },
  extract_tiles: function(room) {
    return Table.create(room.size, function(pos) {
      return room.tile_at(pos);
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
