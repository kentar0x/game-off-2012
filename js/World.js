// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      ascii: ["#####d##",
              "#......#",
              "#.C....#",
              "#......#",
              "#......#",
              "########"],
      text: ["The adventure began simply",
             "with a gentle press",
             "on an arrow key."]
    }
    ,
    {
      ascii: [".C.#####",
              "...#####",
              "r#r#####",
              "...###d#",
              "...r....",
              "...r...."],
      text: ["Adventures are full of obstacles",
             "some of which must be faced",
             "while others",
             "may be pushed away."]
    }
    ,
    {
      ascii: ["#####D##",
              "#......#",
              "#.C....#",
              "#......#",
              "#..r..R#"],
      text: ["A block, a switch, a door",
             "for the hero",
             "a rite of passage."]
    }
    ,
    {
      ascii: ["..###D#",
              "..#...#",
              "C..rR.."],
      text: ["Press 'R'",
             "to undo",
             "the mistake you are about to make."]
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
      ascii: ["#####d#",
              ".......",
              ".......",
              ".C.r...",
              "......."],
      text: ["Press 'Z'",
             "next to a block",
             "and discover a new world."]
    }
    ,
    {
      ascii: ["########",
              "#d######",
              "........",
              "####.###",
              ".C.rr...",
              "........"],
      text: ["Press 'Z' again",
             "after moving the block",
             "in the correct direction.",
             "",
             "I'm sure you'll figure it out."]
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
      ascii: ["#D#",
              "...",
              "r.r",
              "Cg.",
              "r.r",
              ".G."]  // doesn't need the fork (and super easy)
    }
    ,
    {
      ascii: ["#D#",
              "...",
              "r.r",
              ".g.",
              "r.r",
              "CG."]  // variant which does need the fork
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
      ascii: ["####D#",
              "......",
              "C.rrRR",
              "......"],
      text: ["A block",
             "moving on its own",
             "moves with the strength of a hero."]
    }
    ,
    {
      ascii: ["###D##",
              "..Rr..",
              "C#..#.",
              "..gG.."],  // harder than it looks!
      text: ["The hero pushes blocks",
             "but who pushes the hero?"]
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
