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
        '5,5': [0, 'reminder'],
        '6,4': [0, 'reminder']
      },
      on_unfork: [ 'face_left', '<3' ]
    }
    ,
    {
      ascii: ["#D######",
              "#cLw,,,#",
              "#,....,#",
              "#,....,#",
              "#,2..W,#",
              "#,,,,,,#"],
      on_kiss: [ 0, 'ask-fork', 'give' ],
      position_animations: {
        '5,3': [0, 'reminder'],
        '4,4': [0, 'reminder']
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
      ascii: ["####D###",
              "###.....",
              "###...#.",
              ".cL..#..",
              "....#...",
              "....#,gG"],
      on_start: [ 1000, 'face_left', 'kiss', 'face_down', '<3' ],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "1 / 20",
      ascii: ["     #d#",
              "     #.#",
              "     #.#",
              "######.#",
              "Lc.w....",
              "########"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    { // lover makes a mistake
      name: "2 / 20",
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "#.w.w.#",
              ".w.w.w.",
              "wcwLw.w"],
      on_start: [
        0, 'face_up', 300,
        'up', 'left', 'up', 1000,
        'face_right', 300, 'face_up', 'face_right', 1000,
        'face_down', 'R?'],
      on_reset: [ 'skip' ],
      on_kiss: [ 0, 'R?' ]
    }
    ,
    {
      name: "2 / 20",
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "#.w.w.#",
              ".w.w.w.",
              "wcwLw.w"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "3 / 20",
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
      name: "4 / 20",
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
      name: "5 / 20",
      ascii: ["########",
              ".L.w.#d#",
              ".c.w...#",
              "...w.###",
              "########"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "6 / 20",
      ascii: ["#d######",
              ".....,..",
              "####www#",
              ".L.w..,w",
              ".c.w...w"],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    {
      name: "7 / 20",
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
      name: "7 / 20",
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
      name: "8 / 20",
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
    { // Foreshadowing
      ascii: ["   #...#",
              "   ..g..",
              "## .....",
              "..   .  ",
              "...o...o",
              "........",
              "........",
              "........",
              "........",
              ".....F.."],
      on_start: [
        'octo_up', 800, 'octo_up', 800, 'octo_up', 800, 'octo_up', 800,
        'octo_up', 800, 'octo_up', 800, 'octo_up', 800,
        'octo_spork', 800, 'skip' ]
    }
    ,
    {
      name: "9 / 20",
      ascii: ["#####D#",
              "c..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    {
      name: "10 / 20",
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
              "..#.#...;;",
              "........;;",
              "c.......;;",
              "...fw...;;"],
      position_animations: {
        "3,4": ['face_down', 'pick', 'open']
      }
    }
    ,
    {
      name: "11 / 20",
      ascii: ["#d###",
              ".....",
              "###.#",
              "?.ww.",
              ".....",
              "..C.."]
    }
    ,
    {
      name: "12 / 20",
      ascii: ["#D###..",
              "..GGgg.",
              "....C.."]
    }
    ,
    {
      name: "13 / 20",
      ascii: ["#####D#",
              "..w.w.#",
              "C.Gg..#",
              "..w.w.#",
              "#######"]
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
      name: "15 / 20",
      ascii: ["#.w.###",
              "..w.###",
              "CgwG###",
              "..w.#D#",
              "#.w...#"]
    }
    ,
    {
      name: "16 / 20",
      ascii: ["#####D",
              "C..#..",
              ".#.#..",
              "Ggo..O",
              "...#.."]
    }
    ,
    {
      name: "17 / 20",
      ascii: ["###D###",
              "..w.w..",
              ".wgwGw.",
              "..w.w..",
              "...C..."]
    }
    ,
    {
      name: "18 / 20",
      ascii: ["#D####",
              "#.C.##",
              "#.ogOG",
              "###.##"]
    }
    ,
    {
      name: "19 / 20",
      ascii: ["###D##",
              "..Rr..",
              "C#..#.",
              "..gG.."]
    }
    ,
    {
      name: "20 / 20",
      ascii: ["###D###",
              "###.###",
              "#..G..#",
              "#wwwww#",
              "#..g..#",
              "##.C.##"]
    }
    ,
    { // The lair
      ascii: ["   #...#",
              "   ..g..",
              "## .....",
              "..   .  ",
              "...o...o",
              "........",
              "........",
              "........",
              ".c......",
              ".....F.."],
      last_level: true,
      on_start: [
        0, 'hidden',
        0, 'octo_up', 0, 'octo_up', 0, 'octo_up', 0, 'octo_up',
        0, 'octo_up', 0, 'octo_up', 0, 'octo_up',
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
        0, 'update_forked_block',
        'player_up', 'player_up'],
      on_spork: [
        0, 'fork',
        'octo_face_left', 'octo_face_right', 'spork!',
        'octo_escape', 600, 'octo_escape', 600,
        'octo_escape', 600, 'octo_escape', 600,
        'octo_escape', 600, 'octo_escape', 600,
        'octo_down', 'check_trap',
        'skip'
      ],
      on_trapped: [
        'octo_face_left', 'octo_face_right', '!'
      ]
    }
    ,
    { // second visit
      name: "9 / 20",
      bad_ending: true,
      ascii: ["#####D#",
              "S..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    { // second visit
      name: "10 / 20",
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
    { // something terrible, explained
      ascii: ["###D######",
              "..#.#.....",
              "..........",
              "L.........",
              "....w....."],
      bad_ending: true,
      on_start: [
        0, 'face_right', 'right', 'right', 'right', 'face_up',
        'up', 500, 'up', 1500, 'door?',
        'face_down', 500, 'down', 500, 'down', 500,
        'open', 300, 'octo_appear', 300, 'close', 0,
        'face_up', 'face_left', 300, 'face_right', 300, 'face_up', '!',
        'down', 0, 'face_up', 1200,
        'octo_down', 600, 'octo_down', 600,
        'lover_dies',
        'octo_up', 600, 'octo_up', 600,
        'open', 300, 'octo_disappear', 300, 'close', 300,
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
    { // something terrible, avoided
      ascii: ["###D######",
              "..#.#.....",
              "..........",
              "L.........",
              "....w....."],
      good_ending: true,
      on_start: [
        0, 'face_right', 'right', 'right', 'right', 'face_up',
        'up', 500, 'up', 1500, 'door?',
        'face_down', 500, 'down', 500, 'down', 500,
        'down',
        'face_right', '?', 'fork',
        'open', 300, 'octo_appear', 300, 'close', 0,
        'face_up', 'face_left', 300, 'face_right', 300, 'face_up', 600,
        'octo_down', 1200, '!', 0, 'octo_down', 300,
        'face_right', 300, 'fork',
        'face_down', '!',
        'face_up', 200, 'up', 200, 'right', 200, 'right', 200, 'up', 200, 'up', 200, 'face_down',
        'open', 'octo_appear', 1200,
        'octo_down', 1200, 'octo_down', 1200, 'octo_down', 600,
        'down', 150, 'left', 150, 'left', 150, 'down', 150, 'stab',
        'octo_dies',
        '!', 'up', 'up', 'up', 300, 'leave', 300, 'close', 0,
        'credits',
        'c_appear',
        'show',
        'player_right', 'player_right', 'player_down', 'player_right',
        'pick', 'open', 'player_face_up', 1500,
        'player_up', 'player_up', 'player_up', 'player_up', 'leave',
        'the_end'
      ]
    }
    ,
    { // nothing terrible has ever happened
      ascii: ["###D######",
              "..#.#.....",
              "..........",
              "L.........",
              "....w....."],
      best_ending: true,
      on_start: [
        0, 'face_right', 'right', 'right', 'right', 'face_up',
        'up', 500, 'up', 1500, 'door?',
        'face_down', 500, 'down', 500, 'down', 500,
        'S_appear', 0, 'player_face_right',
        'face_left', '!',
        'left', 0, 'player_right',
        'saved', 0, '<3', 0, 'saved_end', 1000,
        'player_face_down', 0, 'face_down', 0,
        'credits',
        'show',
        'face_left', 'spork?',
        'the_end'
      ]
    }
    ,
    {
      name: "Bonus Level &mdash; 1 / 3",
      first_bonus: true,
      ascii: ["##D##",
              "R...G",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "B.S.O"]
    }
    ,
    {
      name: "Bonus Level &mdash; 2 / 3",
      ascii: ["##D##",
              "G...R",
              ".rwg.",
              ".w.w.",
              ".bwo.",
              "O.S.B"]
    }
    ,
    {
      name: "Bonus Level &mdash; 3 / 3",
      ascii: ["##D##",
              "O...B",
              ".wwg.",
              ".w.w.",
              ".bwo.",
              "G.S.."]
    }
  ],
  
  index_of_special_level: function(feature) {
    if (!this[feature]) {
      for(var i=0; i<this.levels.length; ++i) {
        if (this.levels[i][feature]) {
          this[feature] = i;
          break;
        }
      }
    }
    
    return this[feature];
  },
  index_of_last_level: function() {
    return this.index_of_special_level('last_level');
  },
  index_of_first_bonus: function() {
    return this.index_of_special_level('first_bonus');
  },
  index_of_bad_ending: function() {
    return this.index_of_special_level('bad_ending');
  },
  index_of_good_ending: function() {
    return this.index_of_special_level('good_ending');
  },
  index_of_best_ending: function() {
    return this.index_of_special_level('best_ending');
  },
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
  load_on_trapped: function(index) {
    return this.load_animation(index, 'on_trapped');
  },
  load_position_animations: function(index) {
    var data = this.levels[index];
    return data.position_animations
        ? data.position_animations
        : {};
  }
};
