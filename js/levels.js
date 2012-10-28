var level_loader = {
  tile_symbols:         "."+         "#"+            "b"+           "*"+             "C",
  tile_types: ["empty-tile", "wall-tile", "block-sprite", "goal-sprite", "player-sprite"],
  
  class_for_tile_type: function(tile_type) {
    return this.tile_types[tile_type];
  },
    
  parse_tile_type: function(tile) {
    return this.tile_symbols.indexOf(tile);
  },
  
  
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
  
  load_level_data: function(level) {
    return this.levels[level];
  }
};
