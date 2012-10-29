// a wrapper around the DOM element representing a particular tile.

var Sprite = {
  create: function(container, tile) {
    var element = $('<div class="sprite"/>').addClass(tile.sprite_class);
    
    container.append(element);
    
    return {
      change_tile: function(new_tile) {
        element.removeClass(tile.sprite_class);
        
        tile = new_tile;
        
        element.addClass(tile.sprite_class)
      }
    };
  }
};
