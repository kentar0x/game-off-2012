// a set of parallel Scenes.
// it watches a multiroom change, and updates its scenes to match.

var Theatre = {
  create: function(container, multiroom, callback) {
    var element = container;
    
    var scenes = new Array(0);
    scenes[0] = Scene.create(element, multiroom.current_room());
    scenes[0].show(callback);
    
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
      var room = multiroom.room_at(index);
      
      if (fork) {
        var new_scene = Scene.create(element, room);
        scenes.push(new_scene);
        
        rearrange();
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
