var ForkedBlock = {
  create: function (room) {
    var new_block = null;
    var old_block = null;
    var movements = [];

    return {
      process_events: function (events) {
        events.forks.each(function (fork) {
          old_block = fork.old_block;
          new_block = fork.new_block;
        });

        events.merges.each(function (merge) {
          var room = merge.new_room;
          
          for(var i=0; i<movements.length; ++i) {
            var pos = movements[i];
            room.move(old_block, pos.x, pos.y);
          }
          
          old_block.forked = false;
          
          movements = [];
          old_block = new_block = false;
        });

        if (new_block) {
          events.each_room(function (index, room) {
            room.moves.each(function (move) {
              if (move.moveable === new_block) {
                var delta = Pos.distance_between(move.old_pos, move.new_pos);
                movements.push(delta);
              }
            });
          });
        }
      }
    };
  }
};
