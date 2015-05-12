// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function(win, d) {

  var $ = d.querySelector.bind(d);

  var blob1 = $('#blob-1');
  var blob2 = $('#blob-2');
  var blob3 = $('#blob-3');
  var blob4 = $('#blob-4');
  var blob5 = $('#blob-5');
  var blob6 = $('#blob-6');
  var blob7 = $('#blob-7');
  var blob8 = $('#blob-8');
  var blob9 = $('#blob-9');

  var mainBG = $('section#background');

  var ticking = false;
  var lastScrollY = 0;
  var allRects = [];

  addGeoms();

  function addGeoms() {
    for (var i = 0; i < 100; i++) {
      geom = document.createElement('div');
      geom.id = "particle";
      color = '#'+Math.floor(Math.random()*16777215).toString(16);
      geom.style.backgroundColor = color;
      geom.style.position = "absolute";
      x = Math.random() * 1400 + "px";
      y = Math.random() * 3000 + "px";
      geom.style.width = Math.random() * 400 + "px";
      geom.style.height = Math.random() * 400 + "px";
      prefix(geom.style, "Transform", "translate3d(" + x + "," + y +", 0)");      
      geom.className = y.toString();
      geom.setAttribute("offset", -Math.random() * 15000);
      document.getElementById("rectsContainer").appendChild(geom);
      allRects[i] = geom;
    };
  }

  function onResize () {
    updateElements(win.scrollY);
  }

  function onScroll (evt) {

    if(!ticking) {
      ticking = true;
      requestAnimFrame(updateElements);
      lastScrollY = win.scrollY;
    }
  }

  function updateElements () {

    var relativeY = lastScrollY / 6000;

    prefix(blob1.style, "Transform", "translate3d(484px," +
      pos(254, -300, relativeY, 0) + 'px, 0)');

    prefix(blob2.style, "Transform", "translate3d(84px," +
      pos(954, -900, relativeY, 0) + 'px, 0)');

    prefix(blob3.style, "Transform", "translate3d(584px," +
      pos(2900, -900, relativeY, 0) + 'px, 0)');

    prefix(blob4.style, "Transform", "translate3d(300px," +
      pos(6000, -600, relativeY, 0) + 'px, 0)');

    prefix(blob5.style, "Transform", "translate3d(0px," +
      pos(2000, -1700, relativeY, 0) + 'px, 0)');

    prefix(blob6.style, "Transform", "translate3d(100px," +
      pos(2500, -2200, relativeY, 0) + 'px, 0)');

    prefix(blob7.style, "Transform", "translate3d(-240px," +
      pos(4500, -2200, relativeY, 0) + 'px, 0)');

    prefix(blob8.style, "Transform", "translate3d(-240px," +
      pos(6400, -2200, relativeY, 0) + 'px, 0)');

    prefix(blob9.style, "Transform", "translate3d(-240px," +
      pos(3400, -2200, relativeY, 0) + 'px, 0)');

    for (var i = 0; i < allRects.length; i++) {
      rect = allRects[i];
      rectStyle = rect.getAttribute('style');

      var transYRegex = /\.*translate3d\((.*)px\)/i;
      var yTrans = transYRegex.exec(rectStyle)[1];
      posX = yTrans.split(", ")[0]
      posY = parseFloat(rect.className.replace("px", ""));

      offset = parseInt(rect.getAttribute("offset"));

      y = pos(posY, offset, relativeY, 0);
      prefix(rect.style, "Transform", "translate3d("+posX+"," + y + 'px, 0)');

    };

    ticking = false;
  }

  function pos(base, range, relY, offset) {
    return base + limit(-2, 2, relY - offset) * range;
  }

  function prefix(obj, prop, value) {
    var prefs = ['webkit', 'Moz', 'o', 'ms'];
    for (var pref in prefs) {
      obj[prefs[pref] + prop] = value;
    }
  }

  function limit(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }

  (function() {

    updateElements(win.scrollY);

    blob1.classList.add('force-show');
    blob2.classList.add('force-show');
    blob3.classList.add('force-show');
    blob4.classList.add('force-show');
    blob5.classList.add('force-show');
    blob6.classList.add('force-show');
    blob7.classList.add('force-show');
    blob8.classList.add('force-show');
    blob9.classList.add('force-show');
  })();

  win.addEventListener('resize', onResize, false);
  win.addEventListener('scroll', onScroll, false);

})(window, document);
