// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      name: "player's house",
      ascii: ["#####d##",
              "#......#",
              "#......#",
              "#.c....#",
              "#......#",
              "########"]
    }
    ,
    {
      name: "walking towards lover's house",
      ascii: ["#D##....",
              ".c.#.###",
              "...#.###",
              "w#w#.#d#",
              "...w....",
              "...w...."]
    }
    ,
    { name: "lover demonstrates his new toy",
      ascii: ["#D######",
              "#c.....#",
              "#......#",
              "#...Lw.#",
              "#......#",
              "########"],
      on_start: [
        0, 'face_right',
        600, 'face_left', '!',
        'up', 300, 'up', 300, 'left', 300, 'left', 300,
        'kiss', 1000,
        'face_right', 300, 'right', 300, 'right', 300, 'right',
        'face_left', '!',
        'face_down', 300, 'down',
        'Z', 0, 'fork', 1000,
        'face_right', 300, 'right', 300, 'down', 300, 'face_left',
        'left', 'left', 'left',
        'up', 300, 'face_left', '!',
        'left', 300, 'face_down', 'Z', 0, 'fork', 1000,
        'face_left',
        'left', 300, 'left', 300, 'left', 300, 'left', 300, 'face_up',
        '?', 'give',
        'face_down', 300, 'down', 300, 'face_right',
        'right', 'right', 'right',
        'face_up', 300, 'up', 300, 'up', 300, 'face_down', 'fork!'],
      on_unfork: [
        '<3',
        'left', 300, 'left', 300, 'left', 300, 'face_up', 'open',
        'face_right', 300, 'right', 300, 'face_down',
        'door?']
    }
    ,
    { name: "the adventure begins!",
      ascii: ["####D###",
              "###.....",
              "###...#.",
              ".cL..#..",
              "....#...",
              "....#.gG"],
      on_start: [ 1000, 'face_left', 'kiss', 'kiss', 'face_down', '<3' ],
      on_solved: [
        '?',
        'face_right', 300, 'right', 300, 'face_up', 1000,
        'face_down', 'door!',
        'face_up', 300, 'up', 300, 'right', 300, 'up', 300, 'up', 300,
        'leave' ],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "lover messes up. reset please?",
      ascii: ["#d######",
              "........",
              "####wwww",
              "..w...w.",
              "c.w.Lw..",
              "..#....."],
      on_start: [ 0, 'face_right', 1000,
                  'face_up', 'face_right', 'right',
                  'face_up', 1000, 'face_down',
                  'down', 300, 'right', 300, 'right', 300, 'up', 300, 'up',
                  'face_left', 'face_up', 'face_left', 1500,
                  'left', 500, 'face_up', 'up', 'face_right',
                  'face_down', 300, 'down', 400, 'right', 400, 'face_up', 'up',
                  'face_left', 1500,
                  'left', 300, 'down', 300, 'left', 'face_up',
                  'up', 'face_left', 1500,
                  'face_right', 'face_left', 1500,
                  'face_down', 500, 'down', 500, 'down', 500,
                  'face_left', 'R?'],
      on_reset: [ 'skip' ],
      on_kiss: [ 0, 'R?' ]
    }
    ,
    {
      name: "player's turn. first block puzzle! - 1 / 20",
      ascii: ["#d######",
              "........",
              "####wwww",
              "..w...w.",
              "c.w..w..",
              "..#L...."],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "borrow the fork. first fork puzzle! - 2 / 20",
      ascii: ["#d###",
              ".....",
              "###.#",
              "..ww.",
              ".....",
              ".Lc.."],
      position_animations: {
        "3,2": [0, 'face_up', 'fork?']
      },
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "the gate, easy version - 3 / 20",
      ascii: ["#.w.####",
              "c.w.####",
              "LgwG##D#",
              "..w.#...",
              "#.w....."],
      on_start: [
        'down', 300, 'right', 300, 'down', 300, 'face_right',
        'right', 'right', 'right', 'right',
        'face_up', 300, 'up', 300, 'right', 300, 'face_up', 1500,
        'face_left', 'door?'],
      on_solved: [
        'face_up', 1000,
        'face_left', 'door!',
        'face_up', 300, 'up', 300, 'leave'],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "lover explores ahead - 4 / 20",
      ascii: ["#######d",
              ".w.w.w..",
              ".w.w.wL.",
              "cw.w.w.#",
              ".w.w.w.#",
              ".w.w.w.#"],
      on_start: [ 0, 'face_right',
        'face_right', 300, 'right', 300, 'up', 300, 'up', 300, 'leave' ]
    }
    ,
    {
      name: "convoluted block exchange protocol - 5 / 20",
      ascii: ["#####D#",
              "c..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    {
      name: "the spider - 6 / 20",
      ascii: ["##D##",
              ".....",
              ".w.w.",
              "wgwGw",
              ".w.w.",
              "..c.."]
    }
    ,
    {
      name: "something terrible has happened - 7 / 20",
      ascii: ["###D######",
              "........  ",
              "........  ",
              "c.......  ",
              "...f...g  "],
      position_animations: {
        "3,4": ['face_down', 'pick', 'open']
      }
    }
    ,
    {
      name: "8 / 20",
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "##w.w##",
              "#.C...#"]
    }
    ,
    {
      name: "9 / 20",
      ascii: ["#D###..",
              "..GGgg.",
              "....C.."]
    }
    ,
    {
      name: "10 / 20",
      ascii: ["#####D#",
              "..w.w.#",
              "C.Gg..#",
              "..w.w.#",
              "#######"]
    }
    ,
    {
      name: "11 / 20",
      ascii: ["####D#",
              "#....#",
              "#CgwG#",
              "#..#.#",
              "#.##.#",
              "#....#"]
    }
    ,
    {
      name: "the gate, hard version - 12 / 20",
      ascii: ["#.w.###",
              "..w.###",
              "CgwG###",
              "..w.#D#",
              "#.w...#"]
    }
    ,
    {
      name: "an even more convoluted exchange protocol - 13 / 20",
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]
    }
    ,
    {
      name: "return of the spider - 14 / 20",
      ascii: ["###D###",
              "..w.w..",
              ".wgwGw.",
              "..w.w..",
              "...C..."]
    }
    ,
    {
      name: "I didn't know blocks could do that - 15 / 20",
      ascii: ["#D####",
              "....##",
              "C.ooOO",
              "..#.##"]
    }
    ,
    {
      name: "harder than it looks - 16 / 20",
      ascii: ["###D##",
              "..Rr..",
              "C#..#.",
              "..gG.."]
    }
    ,
    {
      name: "the impasse - 17 / 20",
      ascii: ["###D###",
              "###.###",
              "#..G..#",
              "#wwwww#",
              "#..g..#",
              "##.C.##"]
    }
    ,
    {
      name: "the ring, easy version - 18 / 20",
      ascii: ["##D##",
              "R...G",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "B.C.O"]
    }
    ,
    {
      name: "the ring, hard version - 19 / 20",
      ascii: ["##D##",
              "G...R",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "O.C.B"]
    }
    ,
    {
      name: "the lair - 20 / 20",
      ascii: ["#. s .#",
              "#.....#",
              "#.....#",
              ".#...#.",
              ".o#.#o.",
              ".......",
              ".......",
              ".......",
              ".C.....",
              "...F..."],
      on_start: [
        0, 'hidden',
        0, 'octo_up', 0, 'octo_up', 0, 'octo_up', 0, 'octo_up',
        0, 'octo_up', 0, 'octo_up', 0, 'octo_up', 0, 'octo_up',
        0, 'octo_spork',
        0, 'octo_down', 0, 'octo_down', 0, 'octo_down', 0, 'octo_down',
        0, 'octo_down', 0, 'octo_down', 0, 'octo_down', 0, 'octo_down',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'octo_left', 0, 'octo_right', 0, 'octo_left', 0, 'octo_right',
        0, 'unhidden',
        'player_up', 'player_up'],
      on_spork: [
        0, 'face_left', 'drop', 'face_up', 'fork',
        'octo_face_left', 'octo_face_right', 'spork!',
        'octo_down', 1200, 'octo_down', 1200,
        'octo_down', 1200, 'octo_down', 1200,
        'octo_down', 1200, 'octo_down', 1200,
        'octo_down', 1200, 'octo_down',
        'skip'
      ]
    }
    ,
    { // second visit
      name: "convoluted block exchange protocol - 5 / 20",
      ascii: ["#####D#",
              "S..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    { // second visit
      name: "the spider - 6 / 20",
      ascii: ["##d##",
              "w.w..",
              ".wlw.",
              "...gw",
              ".w.w.",
              "..S.."],
      on_start: [
        0, 'face_up',
        'face_left', 500, 'left', 500, 'face_up', 300, 'up', 300,
        'face_right', 'right', 500, 'face_up', 300, 'up', 300, 'leave']
    }
    ,
    { // something terrible, avoided
      ascii: ["###D######",
              "..........",
              "..........",
              "L.........",
              ".......g.."],
      on_start: [
        'face_right', 'right', 'right', 'right', 'face_up',
        'up', 500, 'up', 1500, 'door?',
        'face_down', 500, 'down', 500, 'down', 500,
        'down',
        'face_right', 'right', 300, 'right', 300,
        'right',
        '?', 2000,
        'open', 'octo_appear', 'close', 1200,
        'octo_down', 1200, 'octo_down', 1200, 'octo_down', 2000,
        'octo_right', 1200, 'octo_right', 1200,
        'S_appear',
        'octo_face_left', 'spork!', 'face_left', 1200,
        'octo_left', 1200,
        'left', 300, 'left', 400, 'stab', 'die', 2000,
        'face_up', 0, 'player_right', 300,
        'up', 0, 'player_right', 300,
        'face_left', 0, 'player_right',
        'saved', 0, '<3', 0, 'saved_end', 2000,
        'face_right', 'both_right', 'both_right',
        'both_right', 'both_right', 'both_right',
        'credits',
        'c_appear',
        'show',
        'player_right', 'player_right', 'player_right',
        'face_down', 3000,
        'player_down', 'pick', 'open', 2000,
        'face_up', 1500,
        'player_up', 'player_up', 'player_up', 'player_up', 'leave',
        'the_end'
      ]
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
  load_name: function(index) {
    var name = this.levels.name;
    return name ? name : "";
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
  load_on_spork: function(index) {
    return this.load_animation(index, 'on_spork');
  },
  load_on_unfork: function(index) {
    return this.load_animation(index, 'on_unfork');
  },
  load_on_solved: function(index) {
    return this.load_animation(index, 'on_solved');
  },
  load_on_solved_kiss: function(index) {
    return this.load_animation(index, 'on_solved_kiss');
  },
  load_on_reset: function(index) {
    return this.load_animation(index, 'on_reset');
  },
  load_position_animations: function(index) {
    var data = this.levels[index];
    return data.position_animations
        ? data.position_animations
        : {};
  }
};
