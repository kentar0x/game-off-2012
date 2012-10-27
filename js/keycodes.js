// http://unixpapa.com/js/key.html
var keycodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

(function() {
  var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(var i=0; i<26; ++i) {
    keycodes[s[i]] = s.charCodeAt(i);
  }
})();
