var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var Detector;
  Detector = (function() {
    Detector.prototype.canvas = void 0;

    Detector.prototype.webgl = void 0;

    function Detector() {
      this.displayMessage = __bind(this.displayMessage, this);
      this.webgl = __bind(this.webgl, this);
      this.canvas = !!window.CanvasRenderingContext2D;
    }

    Detector.prototype.webgl = function() {
      var context, isEnable;
      isEnable = false;
      this.canvas = document.createElement("canvas");
      context = !!window.WebGLRenderingContext && (this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl"));
      if (context != null) {
        isEnable = true;
      } else {
        isEnable = false;
      }
      return isEnable;
    };

    Detector.prototype.displayMessage = function(el) {
      var mes;
      mes = "One day, just maybe...<br>			Your browser will support WebGL.<br>			<br>			Fortunately you can enjoy our wishes on <a href='https://www.google.com/intl/en/chrome/browser/'>Chrome</a> or <a href='http://www.mozilla.org/en-US/firefox/new/'>Firefox</a>.";
      return el.append("<p>" + mes + "</p>");
    };

    return Detector;

  })();
  return Detector;
});
