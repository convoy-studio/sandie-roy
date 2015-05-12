var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var TallLines;
  TallLines = (function(_super) {
    __extends(TallLines, _super);

    TallLines.prototype.spritesNum = 30;

    function TallLines() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.checkIntersection = __bind(this.checkIntersection, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.linePosY = [];
      this.lineScaleY = [];
      this.tailScaleY = [];
      this.tailPosY = [];
      TallLines.__super__.constructor.call(this);
    }

    TallLines.prototype.init = function() {
      var g, i, l, tShadow, tail, _i, _ref;
      TallLines.__super__.init.call(this);
      this.instrId = "violoncelli";
      this.mouseVector = new THREE.Vector3();
      this.raycaster = new THREE.Raycaster();
      this.intersection = {
        intersects: false,
        point: new THREE.Vector3()
      };
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        g = new THREE.Group();
        tShadow = new THREE.Sprite(this.shadowMat);
        l = new THREE.Mesh(this.lineGeom, this.lineMat);
        tail = new THREE.Mesh(this.tailGeom, this.lineMat);
        this.sprites[i] = {
          group: g,
          line: l,
          shadow: tShadow,
          tail: tail
        };
        this.sprites[i].active = false;
        this.reset(this.sprites[i]);
        this.container.add(g);
        g.add(l);
        g.add(tail);
        g.add(tShadow);
      }
    };

    TallLines.prototype.setupMatGeom = function() {
      this.lineMat = Util.MeshColorMaterial(0x0d726d, 1, THREE.DoubleSide);
      this.lineGeom = Loader.getGeometry("tall_line");
      this.tailGeom = Loader.getGeometry("tall_line_tail");
      this.textureShadow = Loader.getTexture("ball_gray-texture");
      this.shadowMat = new THREE.SpriteMaterial({
        map: this.textureShadow,
        color: 0x000000,
        transparent: true,
        opacity: 0.3
      });
    };

    TallLines.prototype.onColorStateChanged = function() {
      var color;
      color = Dvorak.Color.state === "GREEN" ? Dvorak.Color.LIGHT_WHITE : Dvorak.Color.GREEN;
      this.lineMat.uniforms.color.value.setRGB(color.r, color.g, color.b);
    };

    TallLines.prototype.reset = function(o) {
      o.lineYVel = Util.Rand(0.6, 0.3, 1);
      o.lineScaleY = Util.Rand(1.6, 0.8, 1);
      o.lineEndPosY = 0;
      o.group.position.x = this.intersection.point.x;
      o.group.position.z = this.intersection.point.z;
      o.line.position.y = 3000;
      o.line.scale.y = 0;
      o.shadow.scale.x = 60;
      o.shadow.scale.y = 10;
      o.shadow.position.y = 4;
      o.tail.position.y = o.lineScaleY * 800;
      o.tail.scale.set(0, 0, 0);
    };

    TallLines.prototype.expand = function(o) {
      if (o.line.position.y >= o.lineEndPosY) {
        o.line.position.y += (o.lineEndPosY - o.line.position.y) * o.lineYVel;
      }
      if (o.line.scale.y < o.lineScaleY) {
        o.line.scale.y += (o.lineScaleY - o.line.scale.y) * (o.lineYVel * 0.5);
      }
      if (o.tail.scale.z < 1) {
        o.tail.scale.x += (1 - o.tail.scale.x) * (o.lineYVel * 0.08);
        o.tail.scale.y += (1 - o.tail.scale.y) * (o.lineYVel * 0.08);
        o.tail.scale.z += (1 - o.tail.scale.z) * (o.lineYVel * 0.08);
      }
      if (this.camera.position.z > o.group.position.z) {
        this.restart(o);
      }
    };

    TallLines.prototype.onUpdate = function() {
      TallLines.__super__.onUpdate.call(this);
      this.checkIntersection();
    };

    TallLines.prototype.checkIntersection = function() {
      var dir, intersects, p, xRatio, yRatio, zRatio;
      xRatio = Util.Rand(0.1, -0.5, 3);
      yRatio = Util.Rand(1, -1, 3);
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

    TallLines.prototype.transitionIn = function() {
      this.intersectMeshes = Dvorak.Mouse.intersectMeshes;
      this.projectCamera = Dvorak.Intersector.projectCamera;
      this.projectCameraLookAt = Dvorak.Intersector.projectCameraLookAt;
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.onColorStateChanged();
      TallLines.__super__.transitionIn.call(this);
    };

    TallLines.prototype.transitionOut = function(forced) {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      TallLines.__super__.transitionOut.call(this, forced);
    };

    TallLines.prototype.collectParams = function() {
      var c, sprite, _i, _len, _ref;
      TallLines.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      c = this.lineMat.uniforms.color.value;
      this.collection.color = [c.r, c.g, c.b];
      this.captPosition.length = 0;
      this.linePosY.length = 0;
      this.lineScaleY.length = 0;
      this.tailScaleY.length = 0;
      this.tailPosY.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        if (sprite.active) {
          this.captPosition.push(sprite.group.position.x, sprite.group.position.y, sprite.group.position.z);
          this.linePosY.push(sprite.line.position.y);
          this.lineScaleY.push(sprite.line.scale.y);
          this.tailScaleY.push(sprite.tail.scale.x);
          this.tailPosY.push(sprite.tail.position.y);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.linePosY = this.linePosY;
      this.collection.lineScaleY = this.lineScaleY;
      this.collection.tailScaleY = this.tailScaleY;
      this.collection.tailPosY = this.tailPosY;
      return this.collection;
    };

    TallLines.prototype.applyParams = function(capture) {
      var g, i, j, l, s, spritesNum, tShadow, tail, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        g = s.group;
        tail = s.tail;
        tShadow = s.shadow;
        l = s.line;
        this.lineMat.uniforms.color.value.setRGB(capture.color[0], capture.color[1], capture.color[2]);
        g.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        l.position.y = capture.linePosY[i];
        l.scale.y = capture.lineScaleY[i];
        tail.position.y = capture.tailPosY[i];
        tail.scale.y = capture.tailScaleY[i];
        tShadow.scale.x = 60;
        tShadow.scale.y = 10;
        tShadow.position.y = 4;
        j += 3;
      }
    };

    return TallLines;

  })(MidiSprites);
  return TallLines;
});
