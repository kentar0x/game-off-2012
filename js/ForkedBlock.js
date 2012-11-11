var ForkedBlock = {
  create: function (room) {
    var new_block = null;
    var old_block = null;
    var observed_moves = EventQueue.create();
    var moves_to_replay = EventQueue.create();

    return {
      moves_to_replay: moves_to_replay,
      process_events: function (events) {
        events.forks.each(function (fork) {
          old_block = fork.old_block;
          new_block = fork.new_block;
        });

        events.merges.each(function (merge) {
          var room = merge.new_room;
          
          observed_moves.each(function(delta) {
            moves_to_replay.add({
              moveable: old_block,
              dx: delta.x,
              dy: delta.y
            });
          });
          
          old_block.forked = false;
          
          observed_moves.clear();
          old_block = new_block = false;
        });

        if (new_block) {
          events.each_room(function (index, room) {
            room.moves.each(function (move) {
              if (move.moveable === new_block) {
                var delta = Pos.distance_between(move.old_pos, move.new_pos);
                
                observed_moves.add(delta);
              }
            });
          });
        }
      }
    };
  }
};
