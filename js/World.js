// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      ascii: ["#####d##",
              "#......#",
              "#......#",
              "#.Cc...#",
              "#......#",
              "########"],
      position_animations: {
        '5,1': [ 400, 'right', 300, 'right', 300, 'up', 1000, 'door?' ],
        '5,0': [ 'leave', 'up', 'up', 'leave' ]
      }
    }
    ,
    {
      ascii: ["..###D#",
              "..#...#",
              "c......",
              "C..rR.."],
      on_start: [ 'right', 'right', 'right', 'right', 'up', 'right', 'face_up', 'face_down' ]
    }
    ,
    {
      ascii: [".C.#####",
              "...#####",
              "w#w#####",
              "...###d#",
              ".c.w....",
              "...w...."],
      on_start: [ 'right', 'right', 'right', 'right', 'right', 'face_down', '<3' ],
    }
    ,
    {
      ascii: ["########",
              "#d######",
              "........",
              "####wwww",
              ".C.w....",
              "...#...."]
    }
    ,
    {
      ascii: ["#.w.####",
              "..w.####",
              "CgwG##D#",
              "..w.#...",
              "#.w....."]  // practice for the gate...
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
              ".w.w.",
              "wgwGw",  // block pushing gate.
              ".w.w.",  // players who go past this
              "..C.."]  // master regular sokoban.
    }
    ,
    {
      ascii: ["#d###",
              ".....",
              "###.#",
              ".Cww.",
              "....."]
    }
    ,
    {
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "##w.w##",
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
              "..w.w.#",
              "C.Gg..#",
              "..w.w.#",
              "#######"]
    }
    ,
    {
      ascii: ["####D#",
              "#....#",
              "#CgwG#",
              "#..#.#",
              "#.##.#",
              "#....#"]
    }
    ,
    {
      ascii: ["#.w.###",
              "..w.###",
              "CgwG###",
              "..w.#D#",
              "#.w...#"]  // vawiant which does need the fowk
    }
    ,
    {
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]  // vawiant which does need the fowk
    }
    ,
    {
      ascii: ["###D###",
              "..w.w..",
              ".wgwGw.",
              "..w.w..",
              "...C..."]  // vawiant which does need the fowk
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
              "#wwwww#",
              "#..g..#",  // variang which teaches
              "##.C.##"]  // that the block can push the player
    }
    ,
    {
      ascii: ["##D##",
              "R...G",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "B.C.O"]  // easy
    }
    ,
    {
      ascii: ["##D##",
              "G...R",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "O.C.B"]  // medium
    }
    ,
    {
      ascii: ["##D##",
              "O...B",
              ".rwg.",
              ".w.w.",
              ".bwo.",
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
  load_animation: function(index, animation_type) {
    var data = this.levels[index];
    return data[animation_type]
        ? data[animation_type]
        : [];
  },
  load_on_start: function(index) {
    return this.load_animation(index, 'on_start');
  },
  load_on_kiss: function(index) {
    return this.load_animation(index, 'on_kiss');
  },
  load_on_fork: function(index) {
    return this.load_animation(index, 'on_fork');
  },
  load_position_animations: function(index) {
    var data = this.levels[index];
    return data.position_animations
        ? data.position_animations
        : {};
  }
};
