// an (x, y) coordinate.

var Pos = {
  create: function(x, y) {
    return {
      x: x,
      y: y,
      plus: function(dx, dy) {
        return Pos.create(this.x + dx, this.y + dy);
      }
    };
  },
  each: function(w, h, body) {
    for(var y=0; y<h; ++y) {
      for(var x=0; x<w; ++x) {
        body(Pos.create(x, y));
      }
    }
  }
};
