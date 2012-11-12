// a wrapper around the DOM element representing a particular tile.

var Sprite = {
  create_player: function(container) {
    var element = $('<div class="sprite"/>').addClass(Tile.player.sprite_class);
        element.css('position', 'absolute');
        element.css('top', '0');
        element.css('left', '0');
    container.append(element);
    
    return {
      element: element,
      move_to: function(sprite) {
      
      }
    };
  },
  create: function(container, tile) {
    var element = $('<div class="sprite"/>').addClass(tile.sprite_class);
    var dir = null;
    var forked = false;
    
    container.append(element);
    
    return {
      element: element,
      change_tile: function(new_tile) {
        element.removeClass(tile.sprite_class);
        if (forked) {
          element.removeClass("forked");
          forked = false;
        }
        
        tile = new_tile;
        
        element.addClass(tile.sprite_class)
      },
      change_moveable: function(new_moveable) {
        if (dir) {
          element.removeClass(dir.dir_name());
        }
        
        this.change_tile(new_moveable.tile);
        
        if (new_moveable.dir) {
          dir = new_moveable.dir;
          element.addClass(dir.dir_name());
        }
        if (new_moveable.forked) {
          element.addClass("forked");
          forked = true;
        }
      }
    };
  }
};
