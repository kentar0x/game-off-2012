var Tile = {
  list: {},
  from_symbol: function(symbol) {
    return this.list[symbol];
  },
  create: function(symbol, sprite, solid) {
    var tile = {
      symbol: symbol,
      sprite: sprite,
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
