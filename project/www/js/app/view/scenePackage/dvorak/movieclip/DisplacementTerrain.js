var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  "use strict";
  var DisplacementTerrain;
  DisplacementTerrain = (function(_super) {
    __extends(DisplacementTerrain, _super);

    DisplacementTerrain.prototype.terrainH = 4400;

    DisplacementTerrain.prototype.switchTerrainPosition = 0;

    DisplacementTerrain.prototype.oldStateVertices = "SKY";

    function DisplacementTerrain() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.switchTerrains = __bind(this.switchTerrains, this);
      this.positionTerrains = __bind(this.positionTerrains, this);
      this.onUpdateTerrainTween = __bind(this.onUpdateTerrainTween, this);
      this.onCameraStateChanged = __bind(this.onCameraStateChanged, this);
      this.onUpdateColorTween = __bind(this.onUpdateColorTween, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      DisplacementTerrain.__super__.constructor.call(this);
    }

    DisplacementTerrain.prototype.init = function() {
      DisplacementTerrain.__super__.init.call(this);
      this.camera = Dvorak.Camera.camera;
      this.renderer = Renderer.renderer;
      this.terrainAnim = {
        value: 0
      };
      this.terrainTween = TweenMax.to(this.terrainAnim, 8, {
        value: 1,
        paused: true,
        onUpdate: this.onUpdateTerrainTween
      });
      this.terrainTween.pause(0);
      this.colorAnim = {
        value: 0
      };
      this.tweenColor = TweenMax.to(this.colorAnim, 2, {
        value: 1,
        paused: true,
        onUpdate: this.onUpdateColorTween
      });
      this.tweenColor.pause(0);
      this.matColor = new THREE.Color();
      this.ready();
    };

    DisplacementTerrain.prototype.ready = function() {
      var terrainA, terrainB, terrainGeom, texture;
      texture = Loader.getTexture(Model.newHash + "-terrain");
      texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
      texture.repeat.x = 2;
      texture.repeat.y = 2;
      terrainGeom = Loader.getGeometry("terrain_low");
      this.geometryLowVertices = terrainGeom.vertices;
      this.geometryHighVertices = Loader.getGeometry("terrain_high").vertices;
      this.terrainGeometry = terrainGeom.clone();
      this.material = new THREE.MeshLambertMaterial({
        fog: true,
        map: texture,
        color: 0xffffff,
        ambient: 0xffffff,
        emissive: 0xffffff
      });
      terrainA = new THREE.Mesh(this.terrainGeometry, this.material);
      this.container.add(terrainA);
      terrainB = new THREE.Mesh(this.terrainGeometry, this.material);
      this.container.add(terrainB);
      terrainA.position.y = terrainB.position.y = -150;
      terrainA.scale.z = 1.2;
      terrainB.scale.z = 1.2;
      terrainA.scale.x = 1.4;
      terrainB.scale.x = 1.4;
      this.terrains = [terrainA, terrainB];
      this.frontTerrain = this.terrains[0];
      this.backTerrain = this.terrains[1];
      if (this.isEditor) {
        return;
      }
      this.switchTerrains();
    };

    DisplacementTerrain.prototype.transitionIn = function() {
      Dvorak.Mouse.intersectMeshes = this.terrains;
      Signal.cameraStateChanged.add(this.onCameraStateChanged);
      Signal.colorStateChanged.add(this.onColorStateChanged);
      Model.cameraState = "";
      this.onCameraStateChanged();
      this.onColorStateChanged();
      this.switchTerrains();
      DisplacementTerrain.__super__.transitionIn.call(this);
    };

    DisplacementTerrain.prototype.transitionOut = function() {
      Signal.cameraStateChanged.remove(this.onCameraStateChanged);
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      DisplacementTerrain.__super__.transitionOut.call(this);
    };

    DisplacementTerrain.prototype.onColorStateChanged = function() {
      var timescale;
      this.matColor.setRGB(this.material.color.r, this.material.color.g, this.material.color.b);
      timescale = Dvorak.Color.state === "BLUE" || Dvorak.Color.state === "GREEN" ? 1000000 : 1;
      this.tweenColor.timeScale(timescale);
      this.tweenColor.play(0);
    };

    DisplacementTerrain.prototype.onUpdateColorTween = function() {
      var vColor;
      vColor = Util.CalcAnimValue(this.matColor, Dvorak.Color.terrainColors[Dvorak.Color.state], this.colorAnim.value);
      this.material.color.setRGB(vColor.r, vColor.g, vColor.b);
      this.material.ambient.setRGB(vColor.r, vColor.g, vColor.b);
      this.material.emissive.setRGB(vColor.r, vColor.g, vColor.b);
    };

    DisplacementTerrain.prototype.onCameraStateChanged = function() {
      if (Model.cameraState === "TERRAIN_LOW" && this.oldStateVertices === "TERRAIN_LOW") {
        return;
      }
      if (Model.cameraState === "SKY" && this.oldStateVertices === "TERRAIN_LOW") {
        return;
      }
      if (Model.cameraState === "TERRAIN_LOW" && this.oldStateVertices === "SKY") {
        return;
      }
      if (Model.cameraState === "SKY" && this.oldStateVertices === "SKY") {
        return;
      }
      TweenMax.killTweensOf(this.terrainTween);
      switch (Model.cameraState) {
        case "TERRAIN_HIGH":
          this.terrainCurrentGeom = this.geometryHighVertices;
          break;
        case "TERRAIN_LOW":
          this.terrainCurrentGeom = this.geometryLowVertices;
          break;
        case "SKY":
          this.terrainCurrentGeom = this.geometryLowVertices;
          break;
      }
      if (this.isEditor) {
        return;
      }
      this.terrainTween.play(0);
      this.oldStateVertices = Model.cameraState;
    };

    DisplacementTerrain.prototype.onUpdateTerrainTween = function() {
      var delay, i, toGeometry, verts, x, y, z, _i, _len, _ref;
      delay = this.isEditor ? 1 : 0.0025;
      toGeometry = this.terrainCurrentGeom != null ? this.terrainCurrentGeom : this.geometryLowVertices;
      _ref = this.terrainGeometry.vertices;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        verts = _ref[i];
        x = toGeometry[i].x;
        y = toGeometry[i].y;
        z = toGeometry[i].z;
        verts.x += (x - verts.x) * delay;
        verts.y += (y - verts.y) * delay;
        verts.z += (z - verts.z) * delay;
      }
      this.terrainGeometry.verticesNeedUpdate = true;
    };

    DisplacementTerrain.prototype.positionTerrains = function() {
      this.backTerrain.position.z = this.camera.position.z + (this.terrainH >> 1);
      this.currentTerrain = this.backTerrain;
      this.frontTerrain.position.z = this.backTerrain.position.z + this.terrainH;
      this.switchTerrainPosition = this.backTerrain.position.z + (this.terrainH >> 1);
    };

    DisplacementTerrain.prototype.switchTerrains = function() {
      this.terrains = this.terrains.reverse();
      this.frontTerrain = this.terrains[0];
      this.backTerrain = this.terrains[1];
      this.positionTerrains();
    };

    DisplacementTerrain.prototype.onUpdate = function() {
      if (this.camera.position.z >= this.switchTerrainPosition) {
        this.switchTerrains();
      }
    };

    DisplacementTerrain.prototype.collectParams = function() {
      DisplacementTerrain.__super__.collectParams.call(this);
      this.collection.cameraState = Model.cameraState;
      this.collection.backTerrain = {
        position: [this.backTerrain.position.x, this.backTerrain.position.y, this.backTerrain.position.z],
        scale: [this.backTerrain.scale.x, this.backTerrain.scale.y, this.backTerrain.scale.z],
        color: [this.backTerrain.material.color.r, this.backTerrain.material.color.g, this.backTerrain.material.color.b],
        emissive: [this.backTerrain.material.emissive.r, this.backTerrain.material.emissive.g, this.backTerrain.material.emissive.b],
        ambient: [this.backTerrain.material.ambient.r, this.backTerrain.material.ambient.g, this.backTerrain.material.ambient.b]
      };
      this.collection.frontTerrain = {
        position: [this.frontTerrain.position.x, this.frontTerrain.position.y, this.frontTerrain.position.z],
        scale: [this.frontTerrain.scale.x, this.frontTerrain.scale.y, this.frontTerrain.scale.z],
        color: [this.frontTerrain.material.color.r, this.frontTerrain.material.color.g, this.frontTerrain.material.color.b],
        emissive: [this.frontTerrain.material.emissive.r, this.frontTerrain.material.emissive.g, this.frontTerrain.material.emissive.b],
        ambient: [this.frontTerrain.material.ambient.r, this.frontTerrain.material.ambient.g, this.frontTerrain.material.ambient.b]
      };
      return this.collection;
    };

    DisplacementTerrain.prototype.applyParams = function(capture) {
      Model.cameraState = capture.cameraState;
      this.onCameraStateChanged();
      this.onUpdateTerrainTween();
      this.backTerrain.position.set(capture.backTerrain.position[0], capture.backTerrain.position[1], capture.backTerrain.position[2]);
      this.backTerrain.scale.set(capture.backTerrain.scale[0], capture.backTerrain.scale[1], capture.backTerrain.scale[2]);
      this.frontTerrain.position.set(capture.frontTerrain.position[0], capture.frontTerrain.position[1], capture.frontTerrain.position[2]);
      this.frontTerrain.scale.set(capture.frontTerrain.scale[0], capture.frontTerrain.scale[1], capture.frontTerrain.scale[2]);
      this.frontTerrain.material.color.setRGB(capture.frontTerrain.color[0], capture.frontTerrain.color[1], capture.frontTerrain.color[2]);
      this.frontTerrain.material.emissive.setRGB(capture.frontTerrain.emissive[0], capture.frontTerrain.emissive[1], capture.frontTerrain.emissive[2]);
      this.frontTerrain.material.ambient.setRGB(capture.frontTerrain.ambient[0], capture.frontTerrain.ambient[1], capture.frontTerrain.ambient[2]);
      this.backTerrain.material.color.setRGB(capture.backTerrain.color[0], capture.backTerrain.color[1], capture.backTerrain.color[2]);
      this.backTerrain.material.emissive.setRGB(capture.backTerrain.emissive[0], capture.backTerrain.emissive[1], capture.backTerrain.emissive[2]);
      this.backTerrain.material.ambient.setRGB(capture.backTerrain.ambient[0], capture.backTerrain.ambient[1], capture.backTerrain.ambient[2]);
    };

    return DisplacementTerrain;

  })(Movieclip);
  return DisplacementTerrain;
});
