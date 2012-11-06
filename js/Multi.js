// instantiates one Thing per room,
// where Thing can be any object which can be obtained from a room
// and has a process_events(room) method to handle its room's events.

var Multi = {
  create: function(room, factory) {
    var current_thing = factory(room);
    
    var things = new Array(1);
    things[0] = current_thing;
    
    return {
      current: function() {
        return current_thing;
      },
      at: function(index) {
        return things[index];
      },
      
      count: function() {
        return things.length;
      },
      each: function(body) {
        for(var i=0; i<things.length; ++i) {
          body(i, things[i]);
        }
      },
      
      process_events: function(events) {
        // create and remove things according
        // to the new and removed rooms
        
        events.forks.each(function(fork) {
          var new_room = fork.new_room;
          var new_thing = factory(new_room);

          things.push(new_thing);
        });
        
        events.merges.each(function(merge) {
          var old_index = merge.old_index;
          var new_index = merge.new_index;
          
          // old_index is only valid before the removal
          var old_thing = things[old_index];
          {
            things.remove(old_index);
          }
          // new_index is only valid after the removal
          var new_thing = things[new_index];
          
          // notify the thing if possible
          if (old_thing.remove) old_thing.remove();
          
          current_thing = new_thing;
        });
        
        events.room_changes.each(function(room_change) {
          current_thing = things[room_change.new_index];
        });
        
        
        // let each thing process the events of its room
        events.each_room(function(index, room) {
          var thing = things[index];
          
          thing.process_events(room);
        });
      }
    };
  }
};
