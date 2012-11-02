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
      move_to: function(sprite)
	  {
	  
	  }
      }
    }
  ,
  create: function(container, tile) {
    var element = $('<div class="sprite"/>').addClass(tile.sprite_class);
    
	
    container.append(element);
    
    return {
	  element: element,
      change_tile: function(new_tile) {
        element.removeClass(tile.sprite_class);
        
        tile = new_tile;
        
        element.addClass(tile.sprite_class)
      }
    };
  }
};
