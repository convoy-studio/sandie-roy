var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var Trees;
  Trees = (function(_super) {
    __extends(Trees, _super);

    Trees.prototype.spritesNum = 6;

    Trees.prototype.counter = 0;

    Trees.prototype.delayIndex = 0;

    function Trees() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.checkIntersection = __bind(this.checkIntersection, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.onMidiChanged = __bind(this.onMidiChanged, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      Trees.__super__.constructor.call(this);
    }

    Trees.prototype.init = function() {
      var i, m, _i, _ref;
      Trees.__super__.init.call(this);
      this.instrId = "corni";
      this.mouseVector = new THREE.Vector3();
      this.normalVector = new THREE.Vector3();
      this.projection = new THREE.Vector3();
      this.raycaster = new THREE.Raycaster();
      this.intersection = {
        intersects: false,
        point: new THREE.Vector3(),
        normal: new THREE.Vector3()
      };
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        m = this.mesh.clone();
        this.sprites[i] = m;
        this.sprites[i].active = false;
        this.reset(this.sprites[i]);
        this.container.add(m);
      }
    };

    Trees.prototype.onMidiChanged = function() {
      Trees.__super__.onMidiChanged.call(this);
    };

    Trees.prototype.setupMatGeom = function() {
      var matrix, size, texture;
      size = 160;
      matrix = new THREE.Matrix4();
      matrix.makeTranslation(0, size >> 1, 0);
      texture = Loader.getTexture("tree-texture");
      texture.minFilter = THREE.LinearFilter;
      this.geom = new THREE.PlaneBufferGeometry(size, size);
      this.geom.applyMatrix(matrix);
      this.material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
      });
      this.mesh = new THREE.Mesh(this.geom, this.material);
    };

    Trees.prototype.reset = function(o) {
      o.lineYVel = Util.Rand(0.09, 0.05, 2);
      o.toScale = Util.Rand(3, 2, 2);
      o.position.x = this.intersection.point.x;
      o.position.y = this.intersection.point.y;
      o.position.z = this.intersection.point.z;
      o.scale.x = o.scale.y = o.scale.z = 0;
    };

    Trees.prototype.expand = function(o) {
      if (o.scale.x < o.toScale) {
        o.scale.x += (o.toScale - o.scale.x) * o.lineYVel;
        o.scale.y += (o.toScale - o.scale.y) * o.lineYVel;
        o.scale.z += (o.toScale - o.scale.z) * o.lineYVel;
      }
      if (this.camera.position.z > o.position.z) {
        this.restart(o);
      }
    };

    Trees.prototype.onUpdate = function() {
      Trees.__super__.onUpdate.call(this);
      this.checkIntersection();
    };

    Trees.prototype.transitionIn = function() {
      this.intersectMeshes = Dvorak.Mouse.intersectMeshes;
      this.projectCamera = Dvorak.Intersector.projectCamera;
      this.projectCameraLookAt = Dvorak.Intersector.projectCameraLookAt;
      Trees.__super__.transitionIn.call(this);
    };

    Trees.prototype.checkIntersection = function() {
      var dir, intersects, p, xRatio, yRatio, zRatio;
      xRatio = Util.Rand(0.4, -0.6, 3);
      yRatio = Util.Rand(0.9, -0.9, 3);
      zRatio = 1;
      this.mouseVector.set(xRatio, yRatio, zRatio);
      this.mouseVector.unproject(this.projectCamera);
      dir = this.mouseVector.sub(this.projectCamera.position).normalize();
      this.raycaster.set(this.projectCamera.position, dir);
      intersects = this.raycaster.intersectObjects(this.intersectMeshes);
      if (intersects.length > 0) {
        p = intersects[0].point;
        this.intersection.point.x = p.x;
        this.intersection.point.y = p.y;
        this.intersection.point.z = p.z;
      }
    };

    Trees.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      Trees.__super__.collectParams.call(this);
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

    Trees.prototype.applyParams = function(capture) {
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

    return Trees;

  })(MidiSprites);
  return Trees;
});
