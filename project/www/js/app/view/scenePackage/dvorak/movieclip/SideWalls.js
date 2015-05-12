var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var SideWalls;
  SideWalls = (function(_super) {
    __extends(SideWalls, _super);

    SideWalls.prototype.spritesNum = 10;

    function SideWalls() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.checkIntersection = __bind(this.checkIntersection, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.collapse = __bind(this.collapse, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      this.setupMatGeom();
      SideWalls.__super__.constructor.call(this);
    }

    SideWalls.prototype.init = function() {
      var i, mat, rock, _i, _ref;
      SideWalls.__super__.init.call(this);
      this.instrId = "contrabassi";
      this.mouseVector = new THREE.Vector3();
      this.projection = new THREE.Vector3();
      this.raycaster = new THREE.Raycaster();
      this.intersection = {
        intersects: false,
        point: new THREE.Vector3()
      };
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        mat = Math.random() * 1 > 0.45 ? this.matA : this.matB;
        rock = new THREE.Mesh(this.geometry, mat);
        this.sprites[i] = rock;
        this.sprites[i].active = false;
        this.container.add(rock);
      }
    };

    SideWalls.prototype.setupMatGeom = function() {
      var height;
      height = 2400;
      this.geometry = new THREE.BoxGeometry(200, height, 30, 1, 1, 1);
      this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, height * 0.4, 0));
      this.matA = new THREE.MeshLambertMaterial({
        fog: true,
        shading: THREE.FlatShading,
        color: 0x149ee7,
        ambient: 0x149ee7
      });
      this.matB = new THREE.MeshLambertMaterial({
        fog: true,
        shading: THREE.FlatShading,
        color: 0x1278c0,
        ambient: 0x1278c0
      });
    };

    SideWalls.prototype.transitionIn = function() {
      this.intersectMeshes = Dvorak.Mouse.intersectMeshes;
      this.projectCamera = Dvorak.Intersector.projectCamera;
      this.projectCameraLookAt = Dvorak.Intersector.projectCameraLookAt;
      SideWalls.__super__.transitionIn.call(this);
    };

    SideWalls.prototype.reset = function(o) {
      o.yEasing = Util.Rand(0.1, 0.07, 2);
      o.xRotation = Util.DegreesToRadians(Util.Rand(5, -5, 0));
      o.xRotationEase = Util.Rand(0.2, 0.1, 1);
      o.yRotation = Util.DegreesToRadians(Util.Rand(10, -10, 0));
      o.yRotationEase = Util.Rand(0.2, 0.1, 1);
      o.zRotation = Util.DegreesToRadians(Util.Rand(15, -15, 0));
      o.zRotationEase = Util.Rand(0.1, 0.07, 2);
      o.scale.y = 0.01;
      o.position.x = this.intersection.point.x;
      o.position.y = this.intersection.point.y;
      o.position.z = this.intersection.point.z;
      o.rotation.z = -o.zRotation;
    };

    SideWalls.prototype.expand = function(o) {
      if (o.scale.y < 1) {
        o.scale.y += (1 - o.scale.y) * o.yEasing;
      }
      if (o.rotation.x < o.xRotation) {
        o.rotation.x += (o.xRotation - o.rotation.x) * o.xRotationEase;
      }
      if (o.rotation.y < o.yRotation) {
        o.rotation.y += (o.yRotation - o.rotation.y) * o.yRotationEase;
      }
      if (o.rotation.z < o.zRotation) {
        o.rotation.z += (o.zRotation - o.rotation.z) * o.zRotationEase;
      }
      if (this.camera.position.z > o.position.z) {
        this.restart(o);
      }
    };

    SideWalls.prototype.collapse = function() {
      var o, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        if (o.scale.y > 0.01) {
          o.scale.y -= (o.scale.y - 0.01) * 0.08;
        }
        o.position.y -= 2;
      }
    };

    SideWalls.prototype.onUpdate = function() {
      SideWalls.__super__.onUpdate.call(this);
      this.checkIntersection();
    };

    SideWalls.prototype.checkIntersection = function() {
      var dir, intersects, p, s, time, xRatio, yRand, yRatio, zRatio;
      time = Date.now() * 0.003;
      xRatio = Util.Rand(0.4, -0.3, 3);
      zRatio = 1;
      yRand = Util.Rand(0.8, 0.3, 3);
      s = Math.cos(time) * 1;
      if (s <= 0) {
        yRatio = -yRand;
      } else {
        yRatio = yRand;
      }
      this.mouseVector.set(xRatio, yRatio, zRatio);
      this.mouseVector.unproject(this.projectCamera);
      dir = this.mouseVector.sub(this.projectCamera.position).normalize();
      this.raycaster.set(this.projectCamera.position, dir);
      intersects = this.raycaster.intersectObjects(this.intersectMeshes);
      if (intersects.length > 0) {
        p = intersects[0].point;
        this.intersection.rotation = yRatio;
        this.intersection.point.x = p.x;
        this.intersection.point.y = p.y;
        this.intersection.point.z = p.z;
        this.intersection.intersects = true;
      } else {
        this.intersection.intersects = false;
      }
    };

    SideWalls.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      SideWalls.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        if (sprite.active) {
          this.captPosition.push(sprite.position.x, sprite.position.y, sprite.position.z);
          this.captRotation.push(sprite.rotation.x, sprite.rotation.y, sprite.rotation.z);
          this.captScale.push(sprite.scale.x, sprite.scale.y, sprite.scale.z);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      return this.collection;
    };

    SideWalls.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
    };

    return SideWalls;

  })(MidiSprites);
  return SideWalls;
});
