// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      ascii: ["#####d##",
              "#......#",
              "#.C....#",
              "#.c....#",
              "#......#",
              "########"],
      on_start: [ 'right', 'up', 'face_left', '<3', 'right', 'right', 'up', 'face_down', '<3' ]
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
      ascii: ["#.r.####",
              "..r.####",
              "CgrG##D#",
              "..r.#...",
              "#.r....."]  // practice for the gate...
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
      ascii: ["##D##",
              ".....",
              ".r.r.",
              "rgrGr",  // block pushing gate.
              ".r.r.",  // players who go past this
              "..C.."]  // master regular sokoban.
    }
    ,
    {
      ascii: ["#d###",
              ".....",
              "###.#",
              ".Crr.",
              "....."]
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
      ascii: ["#D###..",
              "..RRrr.",
              "....C.."]
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
      ascii: ["####D#",
              "#....#",
              "#CgrG#",
              "#..#.#",
              "#.##.#",
              "#....#"]
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
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]  // variant which does need the fork
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
      ascii: ["###D###",
              "###.###",
              "#..G..#",
              "#rrrrr#",
              "#..g..#",  // variang which teaches
              "##.C.##"]  // that the block can push the player
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
  },
  load_on_start: function(index) {
    var data = this.levels[index];
    return data.on_start
        ? data.on_start
        : [];
  }
};
