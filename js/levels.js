// Nomenclature:
// - The level data is the string representation of a level.
//   It consists of a several tile symbols.
//   Each tile symbol corresponds to a tile type (an int),
//   which in turn corresponds to a CSS tile class.
// - A level model is an OO representation of a live level,
//   with actions and callbacks. This is where the business
//   logic lives. It consists of several tile models.
// - The level view is in charge of displaying the level.
//   It consists of several layers of tile sprites.

var Level_Data = {
  tile_symbols:           "."+          "f"+         "#"+            "b"+           "*"+             "C",
  tile_classes: ["empty-tile", "floor-tile", "wall-tile", "block-sprite", "goal-sprite", "player-sprite"],
  
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
  },
  
  
  class_for_tile_type: function(tile_type) {
    return this.tile_classes[tile_type];
  },
  
  type_for_tile_symbol: function(tile_symbol) {
    return this.tile_symbols.indexOf(tile_symbol);
  },
};

var Tile = {
  empty: Level_Data.type_for_tile_symbol('.'),
  floor: Level_Data.type_for_tile_symbol('f'),
  wall: Level_Data.type_for_tile_symbol('#'),
  goal: Level_Data.type_for_tile_symbol('*'),
  player: Level_Data.type_for_tile_symbol('C')
};
