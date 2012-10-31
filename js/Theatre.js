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
    
    var scenes = new Array(0);
    scenes[0] = current_scene;
    
    function rearrange() {
      var n = scenes.length;
      
      // only the case n=2 is supported so far
      if (n == 2) {
        scenes[0].move_left();
        scenes[1].move_right();
      }
    }
    
    // monitor room changes
    multiroom.change_index(function(index, fork) {
      if (fork) {
        var new_room = multiroom.room_at(index);
        var new_scene = Scene.create(element, new_room);
        scenes.push(new_scene);
        
        rearrange();
      }
      
      // highlight the current scene
      {
        var old_scene = current_scene;
        var new_scene = scenes[index];
        
        old_scene.darken();
        new_scene.lighten();
        
        current_scene = new_scene;
      }
    });
    
    return {
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
