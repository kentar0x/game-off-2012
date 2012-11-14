// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      ascii: ["#####d##",
              "#......#",
              "#.C....#",
              "#......#",
              "#......#",
              "########"]
    }
    ,
    {
      ascii: ["..###D#",
              "..#...#",
              "C..rR.."]
    }
    ,
    {
      ascii: [".C.#####",
              "...#####",
              "r#r#####",
              "...###d#",
              "...r....",
              "...r...."]
    }
    ,
    {
      ascii: ["########",
              "#d######",
              "........",
              "####rrrr",
              ".C.r....",
              "...#...."]
    }
    ,
    {
      ascii: ["########",
              "#d######",
              "........",
              "####.###",
              ".C.rr...",
              "........"]
    }
    ,
    {
      ascii: ["###d###",
              "###.###",
              "##.r.##",
              "##r.r##",
              "#.C...#"]
    }
    ,
    {
      ascii: ["#####D#",
              "..r.r.#",
              "C.Gg..#",
              "..r.r.#",
              "#######"]
    }
    ,
    {
      ascii: ["####D####",
              "#.......#",
              "#.......#",
              "#.gR.Gb.#",
              "#.......#",
              "#...C...#",
              "#########"]
    }
    ,
    {
      ascii: ["###D###",
              "##...##",
              "##r.r##",
              "##.g.##",
              "##r.r##",
              "##CG.##"]
    }
    ,
    {
      ascii: ["#D###..",
              "..RRrr.",
              "....C.."]
    }
    ,
    {
      ascii: ["##D##",
              ".....",
              ".r.r.",
              "rgrGr",
              ".r.r.",
              "..C.."]  // doesn't need the fork
    }
    ,
    {
      ascii: ["###D###",
              "..r.r..",
              ".rgrGr.",
              "..r.r..",
              "...C..."]  // variant which does need the fork
    }
    ,
    {
      ascii: ["###D",
              "....",
              "CgrG",
              "..#.",
              ".##.",
              "...."]
    }
    ,
    {
      ascii: ["#D####",
              "....##",
              "C.rrRR",
              "....##"]
    }
    ,
    {
      ascii: ["###D##",
              "..Rr..",
              "C#..#.",
              "..gG.."]  // harder than it looks!
    }
    ,
    {
      ascii: ["#.r.#####",
              "..r.#####",
              "CgrG##D##",
              "..r.#...#",
              "#.r.....#"]  // no need for the fork
    }
    ,
    {
      ascii: ["#.r.###",
              "..r.###",
              "CgrG###",
              "..r.#D#",
              "#.r...#"]  // variant which does need the fork
    }
    ,
    {
      ascii: ["#.r.###",
              "..r.#D#",
              "CgrG..#",
              "..r.#.#",  // variang which teaches
              "#.r.#.#"]  // that the block can push the player
    }
    ,
    {
      ascii: ["#####D#",
              "C..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."] // doesn't need the fork
    }
    ,
    {
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]  // variant which does need the fork
    }
    ,
    {
      ascii: ["##D##",
              "R...G",
              ".rrg.",
              ".r.r.",
              ".bro.",
              "B.C.O"]  // easy
    }
    ,
    {
      ascii: ["##D##",
              "G...R",
              ".rrg.",
              ".r.r.",
              ".bro.",
              "O.C.B"]  // medium
    }
    ,
    {
      ascii: ["##D##",
              "O...B",
              ".rrg.",
              ".r.r.",
              ".bro.",
              "G.C.R"]  // hard
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
