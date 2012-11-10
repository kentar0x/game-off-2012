// http://unixpapa.com/js/key.html
var Keycode = {
  tab: 9,
  esc: 27,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

(function() {
  var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(var i=0; i<s.length; ++i) {
    Keycode[s[i]] = s.charCodeAt(i);
  }
})();
