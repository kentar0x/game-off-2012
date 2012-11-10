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
      ascii: ["######C.",
              "####d#.#",
              "#....#.#",
              "#.####.#",
              "#......#",
              "########"],
      text: ["The path was twisted",
             "but the will is strong",
             "when adventure awaits."]
    }
    ,
    {
      ascii: ["........",
              "..#####.",
              "..##d##.",
              "C.#.....",
              "..#.....",
              "..#####."],
      text: ["The walls are high",
             "impenetrable, and wide",
             "but are they deep?"]
    }
    ,
    {
      ascii: ["##d##",
              ".....",
              ".....",
              "rr#rr",
              ".....",
              ".....",
              "##r##",
              ".....",
              "..C..",
              "....."],
      text: ["The path was full of obstacles",
             "which I pushed aside",
             "strongly, but carefully."]
    }
    ,
    {
      ascii: ["...#####",
              "...#####",
              "#r.#####",
              "...###d#",
              ".C.r...#",
              "...#...#"],
      text: ["I am ashamed of my mistakes",
             "so I press 'R'",
             "to rewrite the history."]
    }
    ,
    {
      ascii: ["########",
              "#d######",
              "........",
              "####rrrr",
              ".C.r....",
              "...#...."],
      text: ["I hate those blocks",
             "I want to stab them",
             "with 'Z'.",
             "",
             "Soon",
             "my anger turns to confusion."]
    }
    ,
    {
      ascii: ["########",
              "#d######",
              "........",
              "####.###",
              ".C.rr...",
              "........"],
      text: ["Can I unstab a block?",
             "With 'Z'?",
             "What else would that undo?",
             "",
             "As I experiment",
             "confusion gives way to understanding."]
    }
    ,
    {
      ascii: [".......",
              ".......",
              ".......",
              ".......",
              "...C...",
              "......."],
      text: ["As I lay",
             "alone",
             "in an empty room",
             "",
             "I realize",
             "I played an incomplete prototype."]
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
