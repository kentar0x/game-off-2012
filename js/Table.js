// a 2D array.

var Table = {
  create: function(w, h, body) {
    if (arguments.length == 2) {
      var size = w;
      body = h;
      
      w = size.w;
      h = size.h;
    }
    
    var data = new Array(h);
    for(var y=0; y<h; ++y) {
      data[y] = new Array(w);
      for(var x=0; x<w; ++x) {
        data[y][x] = body(Pos.create(x, y));
      }
    }
    
    return {
      at: function(index, body) {
        if (arguments.length == 2 && !this.contains(index)) {
          // default value
          return body();
        }
        return data[index.y][index.x];
      },
      change_at: function(index, value) {
        data[index.y][index.x] = value;
      },
      
      size: {w: w, h: h},
      w: w,
      h: h,
      
      contains: function(index) {
        return (index.x >= 0 && index.y >= 0 && index.x < w && index.y < h);
      },
      
      each: function(body) {
        var self = this;
        Pos.each(self.w, self.h, function(index) {
          body(index, self.at(index));
        });
      },
      map: function(body) {
        var self = this;
        return Table.create(self.w, self.h, function(index) {
          return body(index, self.at(index));
        });
      },
      copy: function() {
        return this.map(function(index, value) {
          return value;
        });
      }
    };
  },
};
