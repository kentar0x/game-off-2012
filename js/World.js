// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      ascii: ["########.#",
              "#..r..*..#",
              "#.Cg.....#",
              "#..b.....#",
              "#..o.....#",
              "#......b.#",
              "#......b.#",
              "#######..#"],
    }
    ,
    {
      ascii: ["......*.",
              "######D#",
              "#.CrR..#",
              "#..bB..#",
              "#......#",
              "########"]
    }
    ,
    {
      ascii: ["########",
              "#......#",
              "#.C..*.#",
              "#......#",
              "#......#",
              "########"]
    }
    ,
    {
      ascii: ["......C.",
              "######.#",
              "#...*#.#",
              "#.####.#",
              "#......#",
              "########"]
    }
    ,
    {
      ascii: ["........",
              "..#####.",
              "..#.*...",
              "C.#.....",
              "..#.....",
              "..#####."]
    }
    ,
    {
      ascii: ["...#####",
              "...#.*.#",
              "#r.#....",
              "...####.",
              ".C.r....",
              "...#...."]
    }
    ,
    {
      ascii: ["........",
              ".*..####",
              "........",
              "####rrrr",
              ".C.r....",
              "...#...."]
    }
    ,
    {
      ascii: ["........",
              ".*..#...",
              "........",
              "####.###",
              ".C.rr...",
              "........"]
    }
    ,
    {
      ascii: ["........",
              ".*..##..",
              ".....#..",
              "####.###",
              ".C.rr...",
              "........"]
    }
  ],
  
  load_room: function(index) {
    var data = this.levels[index];
    
    if (!data.symbols) {
      var h = data.ascii.length;
      var w = data.ascii[0].length;
      
      data.symbols = Table.create(w, h, function(pos) {
        return data.ascii[pos.y][pos.x];
      });
    }
    
    return Room.from_data(data);
  },
  load_multiroom: function(index) {
    var room = this.load_room(index);
    
    return Multiroom.create(room);
  }
};
