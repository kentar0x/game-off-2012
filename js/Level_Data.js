// Nomenclature:
// - The level data is the string representation of a level.
//   It consists of a several tile symbols.
// - A level model is an OO representation of a live level,
//   with actions and callbacks. This is where the business
//   logic lives. It consists of several Tile objects.
// - The level view is in charge of displaying the level.
//   It consists of several layers of tile sprites.

var Level_Data = {
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
  
  load: function(level_number) {
    return this.levels[level_number];
  }
};
