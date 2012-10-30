// a set of parallel Rooms.
// the current room can be changed, and you can listen for those changes.

var Multiroom = {
  max_rooms: 2,
  
  create: function(room) {
    var rooms = new Array(1);
    rooms[0] = room;
    
    var change_index_callbacks = $.Callbacks();
    return {
      room_at: function(index) {
        return rooms[index];
      },
      
      current_index: 0,
      current_room: function() {
        return this.room_at(this.current_index);
      },
      
      change_index: function(index, fork) {
        if (arguments.length == 1) {
          // add a watcher
          var callback = index;
          change_index_callbacks.add(callback);
        } else {
          this.current_index = (index % rooms.length);
          
          // notify watchers
          change_index_callbacks.fire(this.current_index, fork);
          return this.current_room();
        }
      },
      next_room: function() {
        return this.change_index(this.current_index + 1, false);
      },
      fork: function() {
        if (rooms.length < Multiroom.max_rooms) {
          var new_room = this.current_room().fork();
          var new_index = rooms.length;
          
          rooms.push(new_room);
          return this.change_index(new_index, true);
        } else {
          return null;
        }
      }
    };
  }
};
