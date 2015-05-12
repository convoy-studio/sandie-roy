var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var StateService;
  StateService = (function() {
    StateService.prototype.terrains = void 0;

    StateService.prototype.currentMills = void 0;

    StateService.prototype.currentCameraState = void 0;

    StateService.prototype.currentColorState = void 0;

    function StateService() {
      this.destroy = __bind(this.destroy, this);
      this.update = __bind(this.update, this);
    }

    StateService.prototype.update = function() {
      var state;
      state = Dvorak.Color.state;
      this.currentMills = Sound.instance.getPosition();
      if (this.currentMills > 0 && this.currentMills <= 5000) {
        this.currentCameraState = "SKY";
      } else if (this.currentMills > 5000 && this.currentMills <= 24000) {
        this.currentCameraState = "TERRAIN_LOW";
      } else if (this.currentMills > 24000 && this.currentMills <= 42000) {
        this.currentCameraState = "TERRAIN_HIGH";
      } else if (this.currentMills > 42000 && this.currentMills <= 85000) {
        this.currentCameraState = "SKY";
      } else if (this.currentMills > 85000) {
        this.currentCameraState = "TERRAIN_LOW";
      } else {
        this.currentCameraState = "SKY";
      }
      if (this.currentCameraState !== Model.cameraState) {
        Model.cameraState = this.currentCameraState;
        Signal.cameraStateChanged.dispatch();
      }
      if (this.currentMills >= 0 && this.currentMills <= 21707.755102040806) {
        this.currentColorState = "WHITE";
      } else if (this.currentMills > 21707.755102040806 && this.currentMills <= 42000) {
        this.currentColorState = "BLUE";
      } else if (this.currentMills > 42000 && this.currentMills <= 64733.696145124726) {
        this.currentColorState = "WHITE";
      } else if (this.currentMills > 64733.696145124726 && this.currentMills <= 85000) {
        this.currentColorState = "RED";
      } else if (this.currentMills > 85000 && this.currentMills <= 110833.56009070296) {
        this.currentColorState = "WHITE";
      } else if (this.currentMills > 110833.56009070296) {
        this.currentColorState = "GREEN";
      } else {
        this.currentColorState = "WHITE";
      }
      if (this.currentColorState !== state) {
        Dvorak.Color.state = this.currentColorState;
        Signal.colorStateChanged.dispatch();
      }
    };

    StateService.prototype.destroy = function() {
      Dvorak.Color.state = "";
      Model.cameraState = "";
    };

    return StateService;

  })();
  return StateService;
});
