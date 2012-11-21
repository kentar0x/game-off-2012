// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      name: "Home",
      ascii: ["#####d##",
              "#......#",
              "#......#",
              "#.c....#",
              "#......#",
              "########"]
    }
    ,
    {
      name: "Neighbourhood",
      ascii: ["#D##....",
              ".c.#.###",
              "...#.###",
              "w#w#.#d#",
              "...w....",
              "...w...."]
    }
    ,
    {
      name: "New toy",
      ascii: ["#D######",
              "#c,,,w,#",
              "#,...w,#",
              "#,...L,#",
              "#,...w,#",
              "#,,,,,,#"],
      on_start: [
        600, 'face_left', '!',
        'left', 200, 'up', 200, 'up', 200, 'left', 200, 'left', 200,
        'kiss', 1000,
        'face_right', 300, 'right', 300, 'right',
        'face_left', '!',
        
        'face_down', 200, 'down', 200, 'down', 200, 'right', 200,
        'face_down', 'Z', 0, 'fork', 1000,
        'face_right', 200, 'right', 200, 'up', 200, 'up', 200, 'face_left',
        'left', 'left', 'left', 'face_right',
        'right', 200, 'right', 200, 'right', 200,
        'down', 200, 'face_left',
        'left', 'left', 'left', 'left',
        'player_?', '!',
        
        'face_right', 200,
        'right', 200, 'right', 200, 'right', 200, 'right', 200,
        'down', 200, 'down', 200, 'face_left',
        'left', 'left', 'left',
        'up', 200, 'face_left', '!',
        'left', 200, 'face_down', 'Z', 0, 'fork', 1000,
        'face_left', '!',
        
        'left', 200, 'left', 200, 'left', 200, 'left', 200, 'up',
        '?', 'give',
        'face_down', 200, 'down', 200, 'down', 200, 'face_right',
        'right', 'right', 'right',
        'face_up', 200, 'up', 200, 'up', 200, 'up', 200, 'face_down',
        'fork!'],
      on_unfork: [
        '<3',
        'left', 300, 'left', 300, 'left', 300, 'face_up', 'open',
        'face_right', 300, 'right', 300, 'face_down',
        'door?']
    }
    ,
    {
      name: "Kissing in the park",
      ascii: ["####D###",
              "###.....",
              "###...#.",
              ".cL..#..",
              "....#...",
              "....#,gG"],
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
    { // lover makes a mistake
      name: "Inside the cave &mdash; 1 / 20",
      ascii: ["#d######",
              "........",
              "####www#",
              ".L.w...w",
              ".c.w...w"],
      on_start: [ 0, 'face_right', 300, 'right',
                  'right', 'right', 'right',
                  'face_up', 'up', 1000,
                  'face_left', 300, 'face_right', 300, 'face_left', 1500,
                  'face_down', 500, 'down', 500, 'down', 500,
                  'face_left', 'R?'],
      on_reset: [ 'skip' ],
      on_kiss: [ 0, 'R?' ]
    }
    ,
    {
      name: "Inside the cave &mdash; 1 / 20",
      ascii: ["#d######",
              "....2,2.",
              "####www#",
              ".L.w..,w",
              ".c.w...w"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "Pyramid &mdash; 2 / 20",
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "##w.w##",
              "#L1c..#"],
      position_animations: {
        "3,2": [0, 'face_up', 'fork?']
      },
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "The gate &mdash; 3 / 20",
      ascii: ["#2w2####",
              "c2w2####",
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
      name: "Stripes &mdash; 4 / 20",
      ascii: ["#######d",
              ".w2w2w..",
              ".w.w.wL2",
              "cw2w2w.#",
              ".w.w.w.#",
              ".w2w2w.#"],
      on_start: [ 0, 'face_right',
        'face_right', 300, 'right', 300, 'up', 300, 'up', 300, 'leave' ]
    }
    ,
    {
      name: "Convoluted block-exchange protocol &mdash; 5 / 20",
      ascii: ["#####D#",
              "c..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    {
      name: "The spider &mdash; 6 / 20",
      ascii: ["##D##",
              ".....",
              ".w.w.",
              "wgwGw",
              ".w.w.",
              "..c.."]
    }
    ,
    { // something terrible has happened
      name: "",
      ascii: ["###D######",
              "........;;",
              "........;;",
              "c.......;;",
              "...f...g;;"],
      position_animations: {
        "3,4": ['face_down', 'pick', 'open']
      }
    }
    ,
    {
      name: "8 / 20",
      ascii: ["#d###",
              ".....",
              "###.#",
              "1.ww.",
              ".....",
              "..C.."]
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
      name: "The gate (hard version) &mdash; 12 / 20",
      ascii: ["#.w.###",
              "..w.###",
              "CgwG###",
              "..w.#D#",
              "#.w...#"]
    }
    ,
    {
      name: "Convoluted exchange-protocol (hard version) &mdash; 13 / 20",
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]
    }
    ,
    {
      name: "The spider (hard version) &mdash; 14 / 20",
      ascii: ["###D###",
              "..w.w..",
              ".wgwGw.",
              "..w.w..",
              "...C..."]
    }
    ,
    {
      name: "New strength &mdash; 15 / 20",
      ascii: ["#D####",
              "#.C.##",
              "#.ooOO",
              "###.##"]
    }
    ,
    {
      name: "Pushed back &mdash; 16 / 20",
      ascii: ["###D##",
              "..Rr..",
              "C#..#.",
              "..gG.."]
    }
    ,
    {
      name: "The impasse &mdash; 17 / 20",
      ascii: ["###D###",
              "###.###",
              "#..G..#",
              "#wwwww#",
              "#..g..#",
              "##.C.##"]
    }
    ,
    {
      name: "The ring &mdash; 18 / 20",
      ascii: ["##D##",
              "R...G",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "B.C.O"]
    }
    ,
    {
      name: "The ring (hard version) &mdash; 19 / 20",
      ascii: ["##D##",
              "G...R",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "O.C.B"]
    }
    ,
    { // The lair
      ascii: ["#.;s;.#",
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
      name: "Convoluted block-exchange protocol &mdash; 5 / 20",
      ascii: ["#####D#",
              "S..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    { // second visit
      name: "The spider &mdash; 6 / 20",
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
    var data = this.levels[index];
    
    return data.name ? data.name : "";
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
