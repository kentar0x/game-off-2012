// a stack of Layers.
// it watches a room change, and updates the sprites to match.

var Scene = {
  create: function(container, room) {
    var element = $('<div class="scene"/>');
    
    // start invisible
    element.transition({opacity: 0}, 0);
    
    // add the floor
    var floor_tiles = this.create_floor(room);
    var floor_layer = Layer.create(element, floor_tiles, room);
    
    // add the actual obstacles
    var solid_tiles = this.extract_tiles(room);
    var solid_layer = Layer.create(element, solid_tiles, room);
    
    // honor each moveable's special visual features
    solid_tiles.each(function(pos, tile) {
      var moveable = room.moveable_at(pos);
      
      if (moveable) {
        var solid_sprite = solid_layer.sprite_at(pos);
        
        solid_sprite.change_moveable(moveable);
      }
    });
    
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
    
    var queue = ActionQueue.create();
    return {
      queue: queue,
      
      hide: function() {
        queue.enqueue_async(function() {
          element.transition({opacity: 0}, function() {
            queue.resume();
          });
        });
      },
      show: function(now) {
        queue.enqueue_async(function() {
          element.transition({opacity: 1}, 'slow', function() {
            queue.resume();
          });
        });
      },
      
      darken: function() {
        dark_filter.transition({opacity: 0.1}, 0);
      },
      lighten: function() {
        dark_filter.transition({opacity: 0}, 0);
        light_filter.transition({opacity: 0.2}, 0, function() {
          light_filter.transition({opacity: 0}, 'slow');
        });
      },

      move_center: function () {
        queue.enqueue_async(function() {
          element.transition({ scale: 1, opacity: 1, x: 0 }, function() {
            queue.resume();
          });
        });
      },
      move_to: function(x) {
        queue.enqueue_async(function() {
          // move, scale down, and make sure it's visible
          element.transition({scale: 0.5, opacity: 1, x: x}, function() {
            queue.resume();
          });
        });
      },
      move_left: function() {
        this.move_to(-410);
      },
      move_right: function() {
        this.move_to(410);
      },
      
      process_events: function(room) {
        room.tile_changes.each(function(tile_change) {
          var pos = tile_change.pos;
          var tile = tile_change.new_tile;
          var solid_sprite = solid_layer.sprite_at(pos);
          var floor_sprite = floor_layer.sprite_at(pos);
          var moveable = room.moveable_at(pos);
          
          if (moveable) {
            solid_sprite.change_moveable(moveable);
            if (moveable.floor.is_floor) {
              floor_sprite.change_tile(moveable.floor);
            }
          } else if (tile.is_floor) {
            solid_sprite.change_tile(Tile.empty);
            floor_sprite.change_tile(tile);
          } else {
            solid_sprite.change_tile(tile);
            floor_sprite.change_tile(Tile.floor);
          }
        });
      },
      
      remove: function() {
        var self = this;
        
        queue.enqueue(function() {
          self.hide();
        }).then(function() {
          element.remove();
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
      } else if (tile.is_floor) {
        return tile;
      } else {
        return Tile.floor;
      }
    });
  },
  extract_tiles: function(room) {
    return Table.create(room.size, function(pos) {
      var tile = room.tile_at(pos)
      
      if (tile.is_floor) {
        return Tile.empty;
      } else {
        return tile;
      }
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
