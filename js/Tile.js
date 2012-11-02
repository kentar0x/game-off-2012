// an immutable representation of a tile type,
// like Tile.wall or Tile.floor;
// remember to always compare with "===".

var Tile = {
  list: {},
  from_symbol: function(symbol) {
    return this.list[symbol];
  },
  create: function(symbol, sprite_class, solid, entity) {
    var tile = {
      symbol: symbol,
      sprite_class: sprite_class,
      solid: solid,
      entity: entity
    };
    
    this.list[symbol] = tile;
    return tile;
  }
};

Tile.empty = Tile.create('.', 'empty-tile', false, false);
Tile.floor = Tile.create('f', 'floor-tile', false, false);
Tile.wall = Tile.create('#', 'wall-tile', true, false);
Tile.goal = Tile.create('*', 'goal-sprite', false, false);
Tile.player = Tile.create('C', 'player-sprite', true, true);

Tile.closed_door = Tile.create('D', 'closed-door-tile', true, false);
Tile.open_door   = Tile.create('d', 'open-door-tile', false, false);

Tile.button        = Tile.create('R', 'regular-button-tile', false, false);
Tile.green_button  = Tile.create('G', 'green-button-tile', false, false);
Tile.blue_button   = Tile.create('B', 'blue-button-tile', false, false);
Tile.orange_button = Tile.create('O', 'orange-button-tile', false, false);

Tile.block        = Tile.create('r', 'regular-block-sprite', true, true);
Tile.green_block  = Tile.create('g', 'green-block-sprite', true, true);
Tile.blue_block   = Tile.create('b', 'blue-block-sprite', true, true);
Tile.orange_block = Tile.create('o', 'orange-block-sprite', true, true);
