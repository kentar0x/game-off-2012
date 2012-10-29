// a grid of Sprites.
// there is a Layer of Tile.floor sprites below the room,
// on top of which is another Layer containing the actual obstacles.

var Layer = {
  create: function(container, tiles) {
    var element = $('<div class="layer"/>');
    
    container.append(element);
    
    var sprites = tiles.map(function(index, tile) {
      return Sprite.create(element, tile);
    });
    
    return {
      sprite_at: function(index) {
        return sprites.at(index);
      }
    };
  }
};
