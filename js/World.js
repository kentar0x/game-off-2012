// all the rooms in the world. here for you.

var World = {
  levels: [
    ["########",
     "#..r..*#",
     "#.Cg...#",
     "#..b...#",
     "#..o...#",
     "########"]
    ,
    ["......*.",
     "######D#",
     "#.CrR..#",
     "#..bB..#",
     "#......#",
     "########"]
    ,
    ["########",
     "#......#",
     "#.C..*.#",
     "#......#",
     "#......#",
     "########"]
    ,
    ["......C.",
     "######.#",
     "#...*#.#",
     "#.####.#",
     "#......#",
     "########"]
    ,
    ["........",
     "..#####.",
     "..#.*...",
     "C.#.....",
     "..#.....",
     "..#####."]
    ,
    ["...#####",
     "...#.*.#",
     "#r.#....",
     "...####.",
     ".C.r....",
     "...#...."]
    ,
    ["........",
     ".*..####",
     "........",
     "####rrrr",
     ".C.r....",
     "...#...."]
    ,
    ["........",
     ".*..#...",
     "........",
     "####.###",
     ".C.rr...",
     "........"]
    ,
    ["........",
     ".*..##..",
     ".....#..",
     "####.###",
     ".C.rr...",
     "........"]
  ],
  
  load_room: function(index) {
    var level = this.levels[index];
    var h = level.length;
    var w = level[0].length;
    
    var tile_symbols = Table.create(w, h, function(pos) {
      return level[pos.y][pos.x];
    });
    
    return Room.from_symbols(tile_symbols);
  },
  load_multiroom: function(index) {
    var room = this.load_room(index);
    
    return Multiroom.create(room);
  }
};
