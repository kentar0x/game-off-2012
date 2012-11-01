// all the rooms in the world. here for you.

var World = {
  levels: [
    ["########",
     "#......#",
     "#.CsD*.#",
     "#......#",
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
     "#b.#....",
     "...####.",
     ".C.b....",
     "...#...."]
    ,
    ["........",
     ".*..####",
     "........",
     "####bbbb",
     ".C.b....",
     "...#...."]
    ,
    ["........",
     ".*..#...",
     "........",
     "####.###",
     ".C.bb...",
     "........"]
    ,
    ["........",
     ".*..##..",
     ".....#..",
     "####.###",
     ".C.bb...",
     "........"]
  ],
  
  load_room: function(index) {
    var level = this.levels[index];
    var h = level.length;
    var w = level[0].length;
    
    var tile_symbols = Table.create(w, h, function(index) {
      return level[index.y][index.x];
    });
    
    return Room.from_symbols(tile_symbols);
  },
  load_multiroom: function(index) {
    var room = this.load_room(index);
    
    return Multiroom.create(room);
  }
};
