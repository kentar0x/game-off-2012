// a set of parallel Rooms.
// the current room can be changed, and you can listen for those changes.

var Multiroom = {
  max_rooms: 2,

  create: function (room) {
    var rooms = new Array(1);
    rooms[0] = room;

    var change_index_callbacks = $.Callbacks();
    var fork_callbacks = $.Callbacks();
    var merge_callbacks = $.Callbacks();

    return {
      room_at: function (index) {
        return rooms[index];
      },

      current_index: 0,
      current_room: function () {
        return this.room_at(this.current_index);
      },

      change_index: function (index) {
        if(_.isFunction(index)){
          // add a watcher
          var callback = index;
          change_index_callbacks.add(callback);
        } else {
          this.current_index = (index % rooms.length);

          // notify watchers
          change_index_callbacks.fire(this.current_index);
          return this.current_room();
        }
      },
      next_room: function () {
        return this.change_index(this.current_index + 1, false);
      },
      fork: function (index) {
        if (_.isFunction(index)) {
          // add a watcher
          var callback = index;
          fork_callbacks.add(callback);
        } else {
          if (rooms.length < Multiroom.max_rooms) {
            var new_room = this.current_room().fork();
            var new_index = rooms.length;

            rooms.push(new_room);
            fork_callbacks.fire(new_index);
            this.change_index(new_index);
          }
        }
      },
      merge: function (index) {
        if (_.isFunction(index)) {
          // add a watcher
          merge_callbacks.add(index);
        } else {
          if (rooms.length > 1) {
            rooms.remove(this.current_index);
            merge_callbacks.fire(this.current_index);
            this.current_index = 0;
          }
        }
      }
    };
  }
};
