define([], function() {
  var Detector;
  Detector = (function() {
    class Detector {
      constructor() {
        this.webgl = this.webgl.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.canvas = !!window.CanvasRenderingContext2D;
      }

      webgl() {
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
      }

      displayMessage(el) {
        var mes;
        mes = "One day, just maybe...<br> Your browser will support WebGL.<br> <br> Fortunately you can enjoy our wishes on <a href='https://www.google.com/intl/en/chrome/browser/'>Chrome</a> or <a href='http://www.mozilla.org/en-US/firefox/new/'>Firefox</a>.";
        return el.append("<p>" + mes + "</p>");
      }

    };

    Detector.prototype.canvas = void 0;

    Detector.prototype.webgl = void 0;

    return Detector;

  }).call(this);
  return Detector;
});
