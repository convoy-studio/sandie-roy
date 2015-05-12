var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["DatParser"], function(DatParser) {
  "use strict";
  var CameraService;
  CameraService = (function() {
    CameraService.prototype.camera = void 0;

    CameraService.prototype.lookAtVec = void 0;

    CameraService.prototype.isTweeningTarget = false;

    CameraService.prototype.isTweeningCamera = false;

    CameraService.prototype.currentTargetPosition = void 0;

    CameraService.prototype.currentCameraPosition = void 0;

    CameraService.prototype.firstPassCamera = true;

    CameraService.prototype.firstPassTarget = true;

    CameraService.prototype.camParams = void 0;

    CameraService.prototype.cameraPosTween = void 0;

    CameraService.prototype.cameraPosAnim = void 0;

    CameraService.prototype.targetPosTween = void 0;

    CameraService.prototype.targetPosAnim = void 0;

    CameraService.prototype.originalPosY = 0;

    CameraService.prototype.timeStamp = void 0;

    function CameraService() {
      this.destroy = __bind(this.destroy, this);
      this.pause = __bind(this.pause, this);
      this.play = __bind(this.play, this);
      this.getYCameraLook = __bind(this.getYCameraLook, this);
      this.getXCameraLook = __bind(this.getXCameraLook, this);
      this.setCameraParams = __bind(this.setCameraParams, this);
      this.update = __bind(this.update, this);
      this.moveCameraForward = __bind(this.moveCameraForward, this);
      this.onCompleteTargetPos = __bind(this.onCompleteTargetPos, this);
      this.onUpdateTargetPos = __bind(this.onUpdateTargetPos, this);
      this.changeCameraTargetPosition = __bind(this.changeCameraTargetPosition, this);
      this.onCompleteCameraPos = __bind(this.onCompleteCameraPos, this);
      this.onUpdateCameraPos = __bind(this.onUpdateCameraPos, this);
      this.changeCameraPosition = __bind(this.changeCameraPosition, this);
      this.onCameraStateChanged = __bind(this.onCameraStateChanged, this);
      this.resize = __bind(this.resize, this);
      this.lookAt = __bind(this.lookAt, this);
      this.position = __bind(this.position, this);
      this.init = __bind(this.init, this);
    }

    CameraService.prototype.init = function() {
      Signal.cameraStateChanged.add(this.onCameraStateChanged);
      this.camera = new THREE.PerspectiveCamera(95, Model.windowW / Model.windowH, 1, 6000);
      this.camera.position.y = 1600;
      this.camera.position.z = 300;
      this.camera.setLens(18);
      this.camera.fov = 70;
      this.camera.far = 10000;
      this.lookAtVec = new THREE.Vector3(0, 1800, 3000);
      this.currentTargetPosition = new THREE.Vector3(0, 1800, 3000);
      this.currentCameraPosition = new THREE.Vector3(0, this.camera.position.y, this.camera.position.z);
      this.cameraPosAnim = {
        value: 0,
        toX: 0,
        toY: 0,
        fromY: 0,
        offsetX: 0,
        offsetY: 0,
        directionX: 1,
        directionY: 1
      };
      this.cameraPosTween = TweenMax.to(this.cameraPosAnim, 1, {
        value: 1,
        paused: true,
        ease: Quad.easeInOut,
        onUpdate: this.onUpdateCameraPos,
        onComplete: this.onCompleteCameraPos
      });
      this.cameraPosTween.pause(0, false);
      this.targetPosAnim = {
        value: 0,
        toX: 0,
        toY: 0,
        toZ: 0,
        fromX: 0,
        fromY: 0,
        fromZ: 0,
        directionX: 1,
        directionY: 1,
        directionZ: 1,
        offsetX: 1,
        offsetY: 0,
        offsetZ: 0
      };
      this.targetPosTween = TweenMax.to(this.targetPosAnim, 1, {
        value: 1,
        paused: true,
        ease: Quad.easeInOut,
        onUpdate: this.onUpdateTargetPos,
        onComplete: this.onCompleteTargetPos
      });
      this.targetPosTween.pause(0, false);
      this.camParams = {
        friction: 0.95,
        vx: 0,
        vy: 0,
        x: 0,
        y: 0,
        maxX: 0,
        maxY: 0,
        easing: 0.05
      };
    };

    CameraService.prototype.position = function(v) {
      this.camera.position.x = v.x;
      this.camera.position.y = v.y;
      this.camera.position.z = v.z;
    };

    CameraService.prototype.lookAt = function(v3) {
      this.camera.lookAt(v3);
    };

    CameraService.prototype.resize = function() {
      this.camera.aspect = Model.windowW / Model.windowH;
      this.camera.updateProjectionMatrix();
    };

    CameraService.prototype.onCameraStateChanged = function() {
      var currentMills;
      currentMills = Sound.instance.getPosition();
      if (Model.cameraState === "SKY") {
        this.changeCameraPosition(0, 5600, 0.8, 0);
        this.changeCameraTargetPosition(0, 5800, 5000, 1, 0);
        this.setCameraParams(200, 600, 0.08);
      } else if (Model.cameraState === "TERRAIN_LOW") {
        this.changeCameraPosition(0, 500, 0.8, 0);
        this.changeCameraTargetPosition(0, 300, 1000, 1, 0);
        this.setCameraParams(400, 300, 0.08);
      } else if (Model.cameraState === "TERRAIN_HIGH") {
        this.changeCameraPosition(0, 400, 0.6, 0);
        this.changeCameraTargetPosition(0, 10, 3000, 0.8, 0);
        this.setCameraParams(200, 100, 0.2);
      }
    };

    CameraService.prototype.changeCameraPosition = function(x, y, timeScale, delay) {
      if (this.firstPassCamera) {
        this.cameraPosTween.timeScale(10000);
        this.firstPassCamera = false;
      } else {
        this.cameraPosTween.timeScale(timeScale);
      }
      this.isTweeningCamera = true;
      this.currentCameraPosition.set(x, y, 0);
      this.cameraPosAnim.toX = x;
      this.cameraPosAnim.toY = y;
      this.cameraPosAnim.fromX = this.camera.position.x;
      this.cameraPosAnim.fromY = this.camera.position.y;
      this.cameraPosAnim.directionX = this.cameraPosAnim.toX - this.camera.position.x < 0 ? -1 : 1;
      this.cameraPosAnim.directionY = this.cameraPosAnim.toY - this.camera.position.y < 0 ? -1 : 1;
      this.cameraPosAnim.offsetX = this.cameraPosAnim.directionX === 1 ? this.cameraPosAnim.toX - this.camera.position.x : this.camera.position.x - this.cameraPosAnim.toX;
      this.cameraPosAnim.offsetX = Math.abs(this.cameraPosAnim.offsetX);
      this.cameraPosAnim.offsetY = this.cameraPosAnim.directionY === 1 ? this.cameraPosAnim.toY - this.camera.position.y : this.camera.position.y - this.cameraPosAnim.toY;
      this.cameraPosAnim.offsetY = Math.abs(this.cameraPosAnim.offsetY);
      this.cameraPosTween.delay(delay);
      this.cameraPosTween.restart(true, false);
    };

    CameraService.prototype.onUpdateCameraPos = function() {
      var posX, posY;
      posX = (this.cameraPosAnim.value / 1) * this.cameraPosAnim.offsetX;
      posY = (this.cameraPosAnim.value / 1) * this.cameraPosAnim.offsetY;
      this.camera.position.x = this.cameraPosAnim.fromX + (posX * this.cameraPosAnim.directionX);
      this.camera.position.y = this.cameraPosAnim.fromY + (posY * this.cameraPosAnim.directionY);
      this.originalPosY = Math.round(this.camera.position.y);
    };

    CameraService.prototype.onCompleteCameraPos = function() {
      this.camParams.x = 0;
      this.camParams.y = 0;
      this.camParams.vx = 0;
      this.camParams.vy = 0;
      this.isTweeningCamera = false;
    };

    CameraService.prototype.changeCameraTargetPosition = function(x, y, z, timeScale, delay) {
      if (this.firstPassTarget) {
        this.targetPosTween.timeScale(10000);
        this.currentTargetPosition.x = x;
        this.currentTargetPosition.y = y;
        this.currentTargetPosition.z = z;
        this.firstPassTarget = false;
      } else {
        this.targetPosTween.timeScale(timeScale);
      }
      this.isTweeningTarget = true;
      this.targetPosAnim.fromX = this.currentTargetPosition.x;
      this.targetPosAnim.fromY = this.currentTargetPosition.y;
      this.targetPosAnim.fromZ = this.currentTargetPosition.z;
      this.targetPosAnim.toX = x;
      this.targetPosAnim.toY = y;
      this.targetPosAnim.toZ = z;
      this.targetPosAnim.directionX = this.targetPosAnim.toX - this.currentTargetPosition.x < 0 ? -1 : 1;
      this.targetPosAnim.directionY = this.targetPosAnim.toY - this.currentTargetPosition.y < 0 ? -1 : 1;
      this.targetPosAnim.directionZ = this.targetPosAnim.toZ - this.currentTargetPosition.z < 0 ? -1 : 1;
      this.targetPosAnim.offsetX = this.targetPosAnim.directionX === 1 ? this.targetPosAnim.toY - this.currentTargetPosition.y : this.currentTargetPosition.y - this.targetPosAnim.toY;
      this.targetPosAnim.offsetX = Math.abs(this.targetPosAnim.offsetX);
      this.targetPosAnim.offsetY = this.targetPosAnim.directionY === 1 ? this.targetPosAnim.toY - this.currentTargetPosition.y : this.currentTargetPosition.y - this.targetPosAnim.toY;
      this.targetPosAnim.offsetY = Math.abs(this.targetPosAnim.offsetY);
      this.targetPosAnim.offsetZ = this.targetPosAnim.directionZ === 1 ? this.targetPosAnim.toZ - this.currentTargetPosition.z : this.currentTargetPosition.z - this.targetPosAnim.toZ;
      this.targetPosAnim.offsetZ = Math.abs(this.targetPosAnim.offsetZ);
      this.targetPosTween.delay(delay);
      this.targetPosTween.restart(true, false);
    };

    CameraService.prototype.onUpdateTargetPos = function() {
      var posY, posZ;
      posY = (this.targetPosAnim.value / 1) * this.targetPosAnim.offsetY;
      this.lookAtVec.y = this.targetPosAnim.fromY + (posY * this.targetPosAnim.directionY) + this.getXCameraLook(this.timeStamp);
      posZ = (this.targetPosAnim.value / 1) * this.targetPosAnim.offsetZ;
      this.lookAtVec.z = this.camera.position.z + this.targetPosAnim.fromZ + (posZ * this.targetPosAnim.directionZ) + this.getYCameraLook(this.timeStamp);
      this.lookAt(this.lookAtVec);
    };

    CameraService.prototype.onCompleteTargetPos = function() {
      this.currentTargetPosition.x = this.targetPosAnim.toX;
      this.currentTargetPosition.y = this.targetPosAnim.toY;
      this.currentTargetPosition.z = this.targetPosAnim.toZ;
      this.isTweeningTarget = false;
    };

    CameraService.prototype.moveCameraForward = function() {
      var force;
      force = Math.max(14 + ((Sound.frequency / 200) * 50), 40);
      this.camera.position.z += force;
    };

    CameraService.prototype.update = function() {
      var cameraLens, maxX, maxY, posX, posY, uX, uY;
      this.timeStamp = Date.now() * 0.003;
      cameraLens = 15 + Math.sin(this.timeStamp * 0.01) * 5;
      if (!this.isTweeningCamera) {
        this.camParams.vx += Math.random() * 0.2 - 0.1;
        this.camParams.vy += Math.random() * 0.2 - 0.1;
        this.camParams.x += this.camParams.vx;
        this.camParams.y += this.camParams.vy;
        this.camParams.vx *= this.camParams.friction;
        this.camParams.vy *= this.camParams.friction;
        this.camParams.x = Math.max(this.camParams.x, -30);
        this.camParams.x = Math.min(this.camParams.x, 30);
        this.camParams.y = Math.max(this.camParams.y, 1);
        this.camParams.y = Math.min(this.camParams.y, 30);
        uX = (this.camParams.x / 30) * 1;
        uY = (this.camParams.y / 30) * 1;
        maxX = this.camParams.maxX;
        maxY = this.camParams.maxY;
        posX = maxX * uX;
        posY = maxY * uY;
        posX = this.currentCameraPosition.x + posX;
        posY = this.currentCameraPosition.y + posY;
        this.camera.position.x += (posX - this.camera.position.x) * this.camParams.easing;
        this.camera.position.y += (posY - this.camera.position.y) * this.camParams.easing;
        this.originalPosY = posY;
      }
      if (!this.isTweeningTarget) {
        this.lookAtVec.x = this.currentTargetPosition.x + this.getXCameraLook(this.timeStamp);
        this.lookAtVec.y = this.currentTargetPosition.y + this.getYCameraLook(this.timeStamp);
        this.lookAtVec.z = this.camera.position.z + this.currentTargetPosition.z;
        this.lookAt(this.lookAtVec);
      }
    };

    CameraService.prototype.setCameraParams = function(maxX, maxY, easing, friction) {
      this.camParams.friction = friction != null ? friction : 0.95;
      this.camParams.vx = 0;
      this.camParams.vy = 0;
      this.camParams.x = 0;
      this.camParams.y = 0;
      this.camParams.maxX = maxX;
      this.camParams.maxY = maxY;
      this.camParams.easing = easing != null ? easing : 0.05;
    };

    CameraService.prototype.getXCameraLook = function(time) {
      return 0;
    };

    CameraService.prototype.getYCameraLook = function(time) {
      return 0;
    };

    CameraService.prototype.play = function() {
      this.cameraPosTween.play();
      this.targetPosTween.play();
    };

    CameraService.prototype.pause = function() {
      this.cameraPosTween.pause();
      this.targetPosTween.pause();
    };

    CameraService.prototype.destroy = function() {
      Signal.cameraStateChanged.remove(this.onCameraStateChanged);
      this.camera = null;
      this.lookAtVec = null;
      this.currentTargetPosition = null;
      this.currentCameraPosition = null;
      this.cameraPosAnim = null;
      this.targetPosAnim = null;
      this.cameraPosTween.pause(0);
      this.targetPosTween.pause(0);
      this.cameraPosTween.kill();
      this.targetPosTween.kill();
      this.cameraPosTween = null;
      this.targetPosTween = null;
      this.camParams = null;
    };

    return CameraService;

  })();
  return CameraService;
});
