// an immutable representation of a tile type,
// like Tile.wall or Tile.floor

var Tile = {
  list: {},
  from_symbol: function(symbol) {
    return this.list[symbol];
  },
  create: function(symbol, sprite_class, solid) {
    var tile = {
      symbol: symbol,
      sprite_class: sprite_class,
      solid: solid
    };
    
    this.list[symbol] = tile;
    return tile;
  }
};

Tile.empty = Tile.create('.', 'empty-tile', false);
Tile.floor = Tile.create('f', 'floor-tile', false);
Tile.wall = Tile.create('#', 'wall-tile', true);
Tile.block = Tile.create('b', 'block-sprite', true);
Tile.goal = Tile.create('*', 'goal-sprite', false);
Tile.player = Tile.create('C', 'player-sprite', false);
