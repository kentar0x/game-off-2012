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
    { // lover's house
      ascii: ["#D######",
              "#c.....#",
              "#......#",
              "#...Lw.#",
              "#......#",
              "########"],
      on_start: [
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
        'left', 300, 'face_down', 'Z', 0, 'fork',
        'face_left', '!',
        'left', 300, 'left', 300, 'left', 300, 'left', 300, 'face_up',
        '?' ],
    }
    ,
    { // level 1
      ascii: ["#####d##",
              "###.....",
              "###.....",
              "..cl....",
              "........",
              "........"],
      position_animations: {
        '5,1': [ 400, 'right', 300, 'right', 300, 'up', 1000, 'door?' ],
        '5,0': [ 'leave', 'up', 'up', 'leave' ]
      }
    }
    ,
    { // level 2
      ascii: ["######D#",
              "#......#",
              "#......#",
              "#l.R...#",
              "#c..r..#",
              "#......#",
              "########"],
      on_start: [ 600, 'right', 600, 'right', 600, 'right', 600, 'right', 'face_up', 1500, 'face_left', 'door!', 300, 'up', 300, 'right', 300, 'up', 2000, 'face_down', 'face_up', 2000, 'face_left', 'door?' ],
      on_solved: [ 'face_up', 'door!', 'left', 300, 'down', 300, 'left', 'face_down', '<3', 'right', 300, 'up', 300, 'right', 300, 'up', 300, 'leave' ],
    }
    ,
    { // level 3
      ascii: ["#d######",
              "........",
              "####wwww",
              "..w...w.",
              "c.w..wl.",
              "..#....."],
      on_start: [ 0, 'face_up', 1000, 'face_left', 1000, 'face_up', 1500,
                  'down', 300, 'left', 300, 'left', 300, 'up',
                  'face_right', 'face_up', 'face_right', 'right',
                  'face_up', 1000, 'face_down',
                  'down', 300, 'right', 300, 'right', 300, 'up', 300, 'up',
                  'face_left', 'face_up', 'face_left', 1500,
                  'left', 500, 'face_up', 'up', 'face_right',
                  'face_down', 300, 'down', 400, 'right', 400, 'face_up', 'up',
                  'face_left', 1500,
                  'left', 300, 'down', 300, 'left', 'face_up',
                  'up', 'face_left', 1500,
                  'face_right', 'face_left', 1500,
                  'down', 500, 'down', 500,
                  'face_left', 'door?'],
    }
    ,
    { // level F
      ascii: ["..#####",
              "...#d#.",
              ".......",
              "...W...",
              "l......",
              "c......"],
      on_start: [
        500, 'right', 500, 'up', 500, 'right', 500, 'up', 500, 'right',
        'face_down', '?', 1000, 'Z', 0, 'fork', 'skip' ],
    }
    ,
    { // level 1, second visit
      ascii: ["#####d##",
              "###.....",
              "###.....",
              "..cL....",
              "........",
              "........"],
      on_start: [
        1000, 'face_right', 'face_left', 'face_right', 1000,
        'face_left', '!',
        'up', 300, 'right', 300, 'up', 300, 'right', 300, 'up', 300, 'leave']
    }
    ,
    { // level 2, second visit
      ascii: ["######D#",
              "#......#",
              "#......#",
              "#..R...#",
              "#c..r..#",
              "#......#",
              "########"],
    }
    ,
    { // level 3, second visit
      ascii: ["#d######",
              "........",
              "####wwww",
              "..w...w.",
              "c.w..w..",
              "..#....."]
    }
    ,
    { // level F, second visit
      ascii: ["..#####",
              "...#d#.",
              ".....L.",
              ".....w.",
              "c......",
              "......."],
      on_start: [
        1000, 'face_right', 'right', 'face_down', 'down', 'face_left',
        'Z', 0, 'fork', 1000, 'face_down', '!', 1000,
        'face_left', 'left', 'left', 'left', 1000, 'Z', 0, 'fork',
        'face_down', '?', 1000,
        'face_left', 'left', 'up', 'left', 'up', 'leave', 'close'],
    }
    ,
    {
      ascii: ["#.w.####",
              "..w.####",
              "cgwG##D#",
              "..w.#...",
              "#.w....."]  // practice for the gate...
    }
    ,
    {
      ascii: ["#####D#",
              "c..#...",
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
              "..c.."]  // master regular sokoban.
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
  load_on_solved: function(index) {
    return this.load_animation(index, 'on_solved');
  },
  load_position_animations: function(index) {
    var data = this.levels[index];
    return data.position_animations
        ? data.position_animations
        : {};
  }
};
