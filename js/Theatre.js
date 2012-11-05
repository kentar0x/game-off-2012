// a set of parallel Scenes.
// it watches a multiroom change, and updates its scenes to match.

var Theatre = {
  empty: function() {
    // same API as a regular Theatre, but holds no rooms.
    // useful to simplify the logic of callers,  who don't have
    // to distinguish between a Theatre and null.
    return {
      remove: function(callback) {
        callback();
      }
    };
  },
  create: function(container, multiroom, callback) {
    var element = container;
    
    var current_scene = Scene.create(element, multiroom.current_room());
    current_scene.show(callback);
    
    var scenes = new Array(1);
    scenes[0] = current_scene;
    
    return {
      process_events: function(events) {
        // remember how things were
        var old_count = scenes.length;
        var old_scene = current_scene;
        
        // process all events
        
        events.forks.each(function(fork) {
          var new_room = fork.new_room;
          var new_scene = Scene.create(element, new_room);
          
          scenes.push(new_scene);
        });
        
        events.merges.each(function(merge) {
          var old_index = merge.old_index;
          var new_index = merge.new_index;
          
          scenes[old_index].remove();
          // remove scene from collection
          scenes.remove(old_index);
          
          current_scene = scenes[new_index];
          current_scene.lighten();
        });
        
        events.room_changes.each(function(room_change) {
          current_scene = scenes[room_change.new_index];
        });
        
        events.each_room(function(index, room) {
          var scene = scenes[index];
          scene.process_tile_changes(room.tile_changes);
        });
          
        
        // have things changed?
        var new_count = scenes.length;
        var new_scene = current_scene;
        
        if (new_count != old_count) {
          // rearrange the scenes (max 2 for now)
          
          if (new_count == 1) {
            scenes[0].move_center();
          } else if (new_count == 2) {
            scenes[0].move_left();
            scenes[1].move_right();
          }
        }
        if (new_scene != old_scene) {
          // highlight the current scene
            
          old_scene.darken();
          new_scene.lighten();
        }
      },
    
      remove: function(callback) {
        var n = scenes.length;
        var j=0;
        for(var i=0; i<n; ++i) {
          scenes[i].remove(function() {
            ++j;
            if (j == n) {
              if (callback) callback();
            }
          });
        }
      }
    };
  },
};
