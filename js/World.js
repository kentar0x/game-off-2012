// all the rooms in the world. here for you.

var World = {
  levels: [
    "........"+
    ".*..#..."+
    "........"+
    "####.###"+
    ".C.bb..."+
    "........"
    ,
    "........"+
    ".*..##.."+
    ".....#.."+
    "####.###"+
    ".C.bb..."+
    "........"
  ],
  
  load_room: function(index) {
    var tile_symbols = this.levels[index];
    
    return Room.create(tile_symbols);
  }
};
