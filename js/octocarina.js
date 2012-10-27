$(function() {
    function toplevel_container() {
      return $('#content');
    }
    
    $('#begin').click(function() {
      var container = toplevel_container();
      container.addClass('well');
      container.empty();
      container.text('Nothing to see here yet.');
    });
});
