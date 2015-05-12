define([], function() {
  "use strict";
  var ColorService;
  ColorService = (function() {
    ColorService.prototype.state = void 0;

    ColorService.prototype.colors = void 0;

    ColorService.prototype.terrainColors = void 0;

    ColorService.prototype.lightColors = void 0;

    ColorService.prototype.fogColors = void 0;

    ColorService.prototype.skyBottomColors = void 0;

    ColorService.prototype.RED = void 0;

    ColorService.prototype.GREEN = void 0;

    ColorService.prototype.BLUE = void 0;

    ColorService.prototype.BLUE_GRAY = void 0;

    ColorService.prototype.WHITE = void 0;

    ColorService.prototype.BLACK = void 0;

    ColorService.prototype.YELLOW = void 0;

    ColorService.prototype.LIGHT_RED = void 0;

    ColorService.prototype.LIGHT_GREEN = void 0;

    ColorService.prototype.LIGHT_BLUE = void 0;

    ColorService.prototype.LIGHT_WHITE = void 0;

    ColorService.prototype.LIGHT_BLACK = void 0;

    function ColorService() {
      var greenLight;
      this.RED = new THREE.Color(0xf12338);
      this.GREEN = new THREE.Color(0x0d726d);
      this.BLUE = new THREE.Color(0x149ee7);
      this.BLUE_GRAY = new THREE.Color(0xd9f2ff);
      this.BLUE_DARK = new THREE.Color(0x0046a0);
      this.WHITE = new THREE.Color(0xededed);
      this.BLACK = new THREE.Color(0x000000);
      this.YELLOW = new THREE.Color(0xf5cb15);
      this.LIGHT_RED = new THREE.Color(0xffffff);
      this.LIGHT_GREEN = new THREE.Color(0xffffff);
      this.LIGHT_BLUE = new THREE.Color(0xd3edfb);
      this.LIGHT_WHITE = new THREE.Color(0xffffff);
      this.LIGHT_BLACK = new THREE.Color(0x3d3d3d);
      greenLight = new THREE.Color(0x107f79);
      this.terrainColors = {
        GREEN: greenLight,
        BLUE: new THREE.Color(0x0051ba),
        WHITE: new THREE.Color(0xcfcfcf),
        SUN: this.RED,
        RED: this.RED
      };
      this.lightColors = {
        GREEN: this.BLUE,
        BLUE: new THREE.Color(0x017cc0),
        WHITE: this.WHITE,
        RED: this.LIGHT_WHITE
      };
      this.fogColors = {
        GREEN: this.GREEN,
        BLUE: this.BLUE_DARK,
        WHITE: this.WHITE,
        RED: this.RED
      };
      this.skyBottomColors = {
        GREEN: this.GREEN,
        BLUE: this.BLUE_DARK,
        WHITE: this.WHITE,
        RED: this.RED
      };
    }

    return ColorService;

  })();
  return ColorService;
});
