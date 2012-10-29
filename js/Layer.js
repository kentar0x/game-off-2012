// a grid of Sprites.
// there is a Layer of Tile.floor sprites below the room,
// on top of which is another Layer containing the actual obstacles.

var Layer = {
  create: function(container, tiles) {
    var element = $('<div class="layer"/>');
    
    container.append(element);
    
    var n = tiles.length;
    var sprites = new Array(n);
    for(var i=0; i<n; ++i) {
      sprites[i] = Sprite.create(element, tiles[i]);
    }
    
    return {
      sprite_at: function(index) {
        return sprites[index];
      }
    };
  }
};
