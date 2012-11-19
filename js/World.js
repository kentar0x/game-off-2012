// all the rooms in the world. here for you.

var World = {
  levels: [
    { // player's house
      ascii: ["#####d##",
              "#......#",
              "#......#",
              "#.c....#",
              "#......#",
              "########"]
    }
    ,
    { // walking towards lover's house
      ascii: ["#D##....",
              ".c.#.###",
              "...#.###",
              "w#w#.#d#",
              "...w....",
              "...w...."]
    }
    ,
    { // lover demonstrates his new toy
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
        'face_left', '!', 'face_right',
        'right', 300, 'down', 300, 'face_left',
        'left', 'left', 'left',
        'up', 300, 'face_left', '!',
        'left', 300, 'face_down', 'Z', 0, 'fork', 0,
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
    { // the adventure begins!
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
        'face_right', 300, 'right', 300, 'up', 300, 'right', 300, 'up', 300,
        'face_down', 'door?' ],
      on_solved_kiss: [
        0, 'ask-door', '<3',
        'face_left', 'door!',
        'left', 300,
        'face_up', 300, 'up', 300, 'leave']
    }
    ,
    { // lover messes up. reset please?
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
      on_reset: [ 'skip' ]
    }
    ,
    { // player's turn. first block puzzle!
      ascii: ["#d######",
              "........",
              "####wwww",
              "..w...w.",
              "c.w.Lw..",
              "..#....."],
      on_start: [
        0, 'face_right',
        'face_up', 'face_right', 1000,
        'face_left', '<3',
        'face_down', 300, 'down', 300, 'left', 300, 'face_down', 1500,
        'door?']
    }
    ,
    { // borrow the fork. first fork puzzle!
      ascii: ["#d###",
              ".....",
              "###.#",
              "..ww.",
              ".....",
              ".Lc.."],
      on_kiss: [ 0, 'ask-fork', 'give' ]
    }
    ,
    { // the gate, easy version
      ascii: ["#.w.####",
              "c.w.####",
              "LgwG##D#",
              "..w.#...",
              "#.w....."],
      on_start: [
        'down', 300, 'right', 300, 'down', 300, 'face_right',
        'right', 'right', 'right', 'right',
        'face_up', 300, 'up', 300, 'right', 300, 'face_up', 1500,
        'face_down', 'face_up', 1500,
        'face_left', 'door?'],
      on_solved: [
        'face_up', 1000,
        'face_left', 'door!',
        'face_up', 300, 'up', 300, 'leave']
    }
    ,
    { // lover explores ahead
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
    { // convoluted block exchange protocol
      ascii: ["#####D#",
              "c..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    { // block-pushing mastery required
      ascii: ["##D##",
              ".....",
              ".w.w.",
              "wgwGw",
              ".w.w.",
              "..c.."]
    }
    ,
    { // something terrible has happened
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
      ascii: ["###d###",
              "###.###",
              "##.w.##",
              "##w.w##",
              "#.C...#"]
    }
    ,
    {
      ascii: ["#D###..",
              "..GGgg.",
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
              "C.ooOO",
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
    ,
    {
      ascii: ["#. s .#",
              "#.....#",
              "#.....#",
              ".#...#.",
              ".o#.#o.",
              ".......",
              "...C..."],
      on_spork: [ 0, 'face_left', 'drop', 'face_up', 'fork', 'skip' ]
    }
    ,
    {
      ascii: ["#.....#",
              "#.....#",
              "#.....#",
              ".#.g.#.",
              ".o#F#o.",
              ".......",
              ".......",
              ".......",
              ".......",
              "......."],
      on_start: [
        'green_up', 'green_up', 'green_up', 2000,
        'octo_down', 1200, 'octo_down', 1200,
        'octo_down', 1200, 'octo_down', 1200, 'octo_down', 0,
        'skip']
    }
    ,
    { // exchange protocol, second visit
      ascii: ["#####D#",
              "S..#...",
              ".#.#...",
              "Ggo..O.",
              "...#..."]
    }
    ,
    { // block-pushing mastery, second visit
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
        'face_down', 500, 'down', 500, 'down', 500, 'down',
        'face_right', 'right', 300, 'right', 300, 'right',
        '?', 2000,
        'open', 'octo_appear', 'close', 1200,
        'octo_down', 1200, 'octo_down', 1200, 'octo_down', 2000,
        'octo_right', 1200, 'octo_right', 1200,
        'player_appear', 'octo_face_left', 'spork!', 'face_left', 1200,
        'octo_left', 1200,
        'left', 300, 'left', 300, 'stab', 'die', 2000,
        'face_up', 0, 'player_right', 300,
        'up', 0, 'player_right', 300,
        'face_left', 0, 'player_right',
        'saved', 0, '<3', 0, 'saved_end', 2000,
        'face_right', 'both_right', 'both_right',
        'both_right', 'both_right', 'both_right',
        'skip'
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
