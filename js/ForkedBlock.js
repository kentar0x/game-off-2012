var ForkedBlock = {
  create: function () {
    var actif = false;
    var movements = [];

    return {
      process_events: function (events) {
        events.forks.each(function (fork) {
          actif = true;
        });

        events.merges.each(function (merge) {
          var forked_block = merge.new_room.find_moveable(Tile.forked_block);
          for(var i=0; i<movements.length; ++i) {
            var pos = movements[i];
            merge.new_room.move(forked_block, pos.x, pos.y);
          }
          merge.new_room.change_tile(forked_block.pos, Tile.block);
          forked_block.tile = Tile.block;
          
          movements = [];
          actif = false;
        });

        if (actif) {
          events.each_room(function (index, room) {
            room.moves.each(function (move) {
              if (move.moveable.tile == Tile.forked_block) {
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
