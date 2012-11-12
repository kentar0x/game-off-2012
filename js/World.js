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
              "...#...."],
      text: ["Press 'Z'",
             "next to a block",
             "to experience confusion."]
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
      ascii: [".......",
              ".......",
              ".......",
              ".......",
              "...C...",
              "......."],
      text: ["You are alone",
             "in an empty room",
             "",
             "after a moment, you realize",
             "you played an incomplete prototype."]
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
