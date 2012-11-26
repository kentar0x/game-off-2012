// all the rooms in the world. here for you.

var World = {
  levels: [
    {
      name: "Move using the arrow keys",
      ascii: ["#####d##",
              "#......#",
              "#......#",
              "#.c....#",
              "#......#",
              "########"]
    }
    ,
    {
      name: "New toy",
      ascii: ["#D##.###",
              ".c.#.###",
              "...#.#d#",
              "w#w#....",
              "...w....",
              "...w.Lw."],
      on_start: [
        600, 'face_left', '!',
        'left', 200, 'up', 200, 'up', 200, 'up', 200, 'up', 200,
        'face_left', '<3', 0, 'player_face_right', 'player_<3', 1000,
        
        'face_down', 300, 'down', 300, 'down', 300, 'down', 300,
        'down', 300, 'right',
        
        'face_left', '!',
        
        'face_right', 'Z', 0, 'fork',
        
        'face_up', 200, 'up', 200, 'up', 200, 'right', 200,
        'face_down',
        'fork!' ],
      position_animations: {
        '5,5': ['reminder'],
        '6,4': ['reminder']
      },
      on_unfork: [ 'face_left', '<3' ]
    }
    ,
    {
      name: "Experiments",
      ascii: ["#D######",
              "#cLw,,,#",
              "#,....,#",
              "#,....,#",
              "#,2..W,#",
              "#,,,,,,#"],
      on_kiss: [ 0, 'ask-fork', 'give' ],
      position_animations: {
        '5,3': ['reminder'],
        '4,4': ['reminder']
      },
      on_fork: [ '<3',
        'down', 300, 'right', 300, 'right', 300, 'up', 300,
        'face_left', 'left', 'left', 'face_down',
        
        'player_face_left', 'player_?', '!',
        'hint' ],
      on_solved: [ 'Z' ],
      on_unfork: [ 'face_down', 'R?' ],
      on_unfork_solved: [
        '<3',
        'left', 300, 'face_up', 'open',
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
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "Inside the cave &mdash; 1 / 20",
      ascii: ["     #d#",
              "     #.#",
              "     #.#",
              "######.#",
              "Lc.w....",
              "########"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "Mistake &mdash; 2 / 20",
      ascii: ["   #####",
              "  #..#D#",
              "###..o.#",
              "....##.#",
              ".L.w....",
              ".c.O####"],
      on_start: [
        0, 'face_right', 300,
        'right', 300, 'up', 300, 'right', 300, 'up', 300,
        'right', 'right',
        'face_up', 'face_right', 1000,
        'face_left', 'left', 'left', 'face_down',
        'R?'],
      on_reset: [ 'skip' ],
      on_kiss: [ 0, 'R?' ]
    }
    ,
    {
      name: "Mistake &mdash; 2 / 20",
      ascii: ["   #####",
              "  #..#D#",
              "###..o,#",
              "....##.#",
              ".L.w....",
              ".c.O####"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "Small wall &mdash; 3 / 20",
      ascii: ["########",
              ".L.w.#d#",
              ".c.w...#",
              "...w.###",
              "########"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "Small pyramid &mdash; 4 / 20",
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "##w.W##",
              "#Lc...#",
              "#...2.#"],
      on_kiss: [ 0, 'ask-fork', 'give' ],
      on_fork: [ 'hint' ],
      on_solved: [ 'fork!' ]
    }
    ,
    {
      name: "Medium walls &mdash; 5 / 20",
      ascii: ["#d######",
              ".....,..",
              "####www#",
              ".L.w..,w",
              ".c.w...w"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "The gate &mdash; 6 / 20",
      ascii: ["#.w.####",
              "c.w.####",
              "LgwG##D#",
              "..w.#...",
              "#.w....."],
      on_start: [
        'down', 300, 'right', 300, 'down', 300, 'face_right',
        'right', 'right', 'right', 'right',
        'face_up', 300, 'up', 300, 'right', 300, 'face_up', 1500,
        'face_left', 'door?', 'level_up' ],
      on_solved: [
        'face_up', 1000,
        'face_left', 'door!',
        'face_up', 300, 'up', 300, 'leave'],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "The gate &mdash; 6 / 20",
      ascii: ["#.w.####",
              "c.w.####",
              ".gwG##D#",
              "..w.#.L.",
              "#.....w."],
      on_solved: [
        'face_up', 1000,
        'face_left', 'door!',
        'face_up', 300, 'up', 300, 'leave'],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "Big walls &mdash; 7 / 20",
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
      name: "Convoluted block-exchange protocol &mdash; 8 / 20",
      ascii: ["#####D#",
              "c..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    {
      name: "The spider &mdash; 9 / 20",
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
      name: "10 / 20",
      ascii: ["#d###",
              ".....",
              "###.#",
              "?.ww.",
              ".....",
              "..C.."]
    }
    ,
    {
      name: "11 / 20",
      ascii: ["#D###..",
              "..GGgg.",
              "....C.."]
    }
    ,
    {
      name: "12 / 20",
      ascii: ["#####D#",
              "..w.w.#",
              "C.Gg..#",
              "..w.w.#",
              "#######"]
    }
    ,
    {
      name: "Big pyramid &mdash; 13 / 20",
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "#.w.w.#",
              ".w.w.w.",
              "w.wCw.w"]
    }
    ,
    {
      name: "14 / 20",
      ascii: ["####D#",
              "#....#",
              "#CgwG#",
              "#..#.#",
              "#.##.#",
              "#....#"]
    }
    ,
    {
      name: "The gate (hard version) &mdash; 15 / 20",
      ascii: ["#.w.###",
              "..w.###",
              "CgwG###",
              "..w.#D#",
              "#.w...#"]
    }
    ,
    {
      name: "Convoluted exchange-protocol (hard version) &mdash; 16 / 20",
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]
    }
    ,
    {
      name: "The spider (hard version) &mdash; 17 / 20",
      ascii: ["###D###",
              "..w.w..",
              ".wgwGw.",
              "..w.w..",
              "...C..."]
    }
    ,
    {
      name: "New strength &mdash; 18 / 20",
      ascii: ["#D####",
              "#.C.##",
              "#.ooOO",
              "###.##"]
    }
    ,
    {
      name: "Pushed back &mdash; 19 / 20",
      ascii: ["###D##",
              "..Rr..",
              "C#..#.",
              "..gG.."]
    }
    ,
    {
      name: "The impasse &mdash; 20 / 20",
      ascii: ["###D###",
              "###.###",
              "#..G..#",
              "#wwwww#",
              "#..g..#",
              "##.C.##"]
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
      name: "Convoluted block-exchange protocol &mdash; 8 / 20",
      ascii: ["#####D#",
              "S..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    { // second visit
      name: "The spider &mdash; 9 / 20",
      ascii: ["##d##",
              "w.w..",
              ".wLw.",
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
        'player_right', 'player_right', 'player_down', 'player_right',
        'pick', 'open', 'face_up', 1500,
        'player_up', 'player_up', 'player_up', 'player_up', 'leave',
        'the_end'
      ]
    }
    ,
    {
      name: "The ring (easy version) &mdash; 1 / 3",
      ascii: ["##D##",
              "R...G",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "B.C.O"]
    }
    ,
    {
      name: "The ring (hard version) &mdash; 2 / 3",
      ascii: ["##D##",
              "G...R",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "O.C.B"]
    }
    ,
    {
      name: "The ring (very hard version) &mdash; 3 / 3",
      ascii: ["##D##",
              "O...B",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "G.C.."]
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
  load_on_unfork_solved: function(index) {
    return this.load_animation(index, 'on_unfork_solved');
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
