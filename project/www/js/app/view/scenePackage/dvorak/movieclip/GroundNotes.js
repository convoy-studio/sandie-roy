var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var GroundNotes;
  GroundNotes = (function(_super) {
    __extends(GroundNotes, _super);

    function GroundNotes() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.collapse = __bind(this.collapse, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.createSprites = __bind(this.createSprites, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      this.shadowScale = [];
      this.trianglePosition = [];
      this.triangleRotation = [];
      this.triangleScale = [];
      GroundNotes.__super__.constructor.call(this);
    }

    GroundNotes.prototype.init = function() {
      var spriteNum;
      GroundNotes.__super__.init.call(this);
      this.instrId = "flauti";
      spriteNum = 14;
      this.setupMatGeom();
      this.createSprites(spriteNum);
    };

    GroundNotes.prototype.createSprites = function(num) {
      var g, i, l, t, tShadow, _i, _ref;
      for (i = _i = 0, _ref = num - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        g = new THREE.Group();
        t = new THREE.Mesh(this.geomGem, this.matGem);
        tShadow = new THREE.Sprite(this.shadowMat);
        l = new THREE.Line(this.lineGeom, this.lineMat);
        this.sprites[i] = {
          group: g,
          line: l,
          triangle: t,
          shadow: tShadow
        };
        this.sprites[i].active = false;
        g.add(l);
        g.add(t);
        g.add(tShadow);
        this.container.add(g);
      }
    };

    GroundNotes.prototype.setupMatGeom = function() {
      var color;
      color = new THREE.Color(0x14baf4);
      this.geomGem = Loader.getGeometry("gem");
      this.matGem = new THREE.MeshLambertMaterial({
        color: color,
        ambient: color,
        emissive: color
      });
      this.lineMat = new THREE.LineBasicMaterial({
        linewidth: 3,
        color: color
      });
      this.lineGeom = new THREE.Geometry();
      this.lineGeom.vertices.push(new THREE.Vector3(0, 0, 0));
      this.lineGeom.vertices.push(new THREE.Vector3(0, 500, 0));
      this.textureShadow = Loader.getTexture("ball_gold-texture");
      this.shadowMat = new THREE.SpriteMaterial({
        fog: true,
        map: this.textureShadow,
        color: 0x000000,
        transparent: true,
        opacity: 0.2
      });
    };

    GroundNotes.prototype.onColorStateChanged = function() {
      var color;
      if (Dvorak.Color.state === "BLUE") {
        color = Dvorak.Color.WHITE;
        this.matGem.color.setRGB(color.r, color.g, color.b);
        this.matGem.ambient.setRGB(color.r, color.g, color.b);
        this.matGem.emissive.setRGB(color.r, color.g, color.b);
        this.lineMat.color.setRGB(color.r, color.g, color.b);
      } else if (Dvorak.Color.state === "WHITE") {
        color = Dvorak.Color.BLUE;
        this.matGem.color.setRGB(color.r, color.g, color.b);
        this.matGem.ambient.setRGB(color.r, color.g, color.b);
        this.matGem.emissive.setRGB(color.r, color.g, color.b);
        this.lineMat.color.setRGB(color.r, color.g, color.b);
      }
    };

    GroundNotes.prototype.reset = function(o) {
      var instrVel;
      o.reducer = Model.cameraState === "SKY" || !Dvorak.Mouse.intersection.intersects ? 0 : 1;
      instrVel = Util.Rand(80, 30, 0);
      o.globalScale = Util.Rand(1, 0.4, 1);
      o.shadowScaleX = (130 * o.globalScale) * o.reducer;
      o.shadowScaleY = (50 * o.globalScale) * o.reducer;
      o.triangleScale = 0.8 * o.globalScale;
      o.trianglePosY = 100 + (instrVel * 4);
      o.lineScaleY = 0.5 + (instrVel / 100) * 1;
      o.lineScaleY *= o.reducer;
      o.triangle.scale.x = o.triangle.scale.y = o.triangle.scale.z = 0.001;
      o.shadow.scale.x = o.shadow.scale.y = 0.001;
      o.line.scale.y = o.lineScaleY;
      o.group.position.x = this.mouseProjection.x;
      o.group.position.y = this.mouseProjection.y;
      o.group.position.z = this.mouseProjection.z;
    };

    GroundNotes.prototype.expand = function(o) {
      o.triangle.rotation.y += 0.1;
      if (o.triangle.position.y < o.trianglePosY) {
        o.triangle.position.y += (o.trianglePosY - o.triangle.position.y) * 0.1;
      }
      if (o.triangle.scale.y < o.triangleScale) {
        o.triangle.scale.x += (o.triangleScale - o.triangle.scale.x) * 0.1;
        o.triangle.scale.y += (o.triangleScale - o.triangle.scale.y) * 0.1;
        o.triangle.scale.z += (o.triangleScale - o.triangle.scale.z) * 0.1;
      }
      if (o.shadow.scale.x < o.shadowScaleX) {
        o.shadow.scale.x += (o.shadowScaleX - o.shadow.scale.x) * 0.1;
      }
      if (o.shadow.scale.y < o.shadowScaleY) {
        o.shadow.scale.y += (o.shadowScaleY - o.shadow.scale.y) * 0.1;
      }
      if (this.camera.position.z > o.group.position.z) {
        this.restart(o);
      }
    };

    GroundNotes.prototype.collapse = function() {
      var o, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        o.triangle.rotation.y -= 0.1;
        if (o.triangle.scale.y > 0.01) {
          o.triangle.scale.x -= (o.triangle.scale.x - 0.01) * 0.1;
          o.triangle.scale.y -= (o.triangle.scale.y - 0.01) * 0.1;
          o.triangle.scale.z -= (o.triangle.scale.z - 0.01) * 0.1;
        }
        if (o.shadow.scale.x > 0.01) {
          o.shadow.scale.x -= (o.shadow.scale.x - 0.01) * 0.1;
        }
        if (o.shadow.scale.y > 0.01) {
          o.shadow.scale.y -= (o.shadow.scale.y - 0.01) * 0.1;
        }
      }
    };

    GroundNotes.prototype.transitionIn = function() {
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.onColorStateChanged();
      GroundNotes.__super__.transitionIn.call(this);
    };

    GroundNotes.prototype.transitionOut = function(forced) {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      GroundNotes.__super__.transitionOut.call(this, forced);
    };

    GroundNotes.prototype.collectParams = function() {
      var matC, sgp, sgr, sgs, sprite, sss, stp, str, sts, _i, _len, _ref;
      GroundNotes.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      matC = this.matGem.color;
      this.collection.color = [matC.r, matC.g, matC.b];
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      this.shadowScale.length = 0;
      this.trianglePosition.length = 0;
      this.triangleRotation.length = 0;
      this.triangleScale.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        if (sprite.active) {
          sss = sprite.shadow.scale;
          sgp = sprite.group.position;
          sgr = sprite.group.rotation;
          sgs = sprite.group.scale;
          stp = sprite.triangle.position;
          str = sprite.triangle.rotation;
          sts = sprite.triangle.scale;
          this.shadowScale.push(sss.x, sss.y, sss.z);
          this.captPosition.push(sgp.x, sgp.y, sgp.z);
          this.captRotation.push(sgr.x, sgr.y, sgr.z);
          this.captScale.push(sgs.x, sgs.y, sgs.z);
          this.trianglePosition.push(stp.x, stp.y, stp.z);
          this.triangleRotation.push(str.x, str.y, str.z);
          this.triangleScale.push(sts.x, sts.y, sts.z);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      this.collection.shadowScale = this.shadowScale;
      this.collection.trianglePosition = this.trianglePosition;
      this.collection.triangleRotation = this.triangleRotation;
      this.collection.triangleScale = this.triangleScale;
      return this.collection;
    };

    GroundNotes.prototype.applyParams = function(capture) {
      var color, cp, cr, cs, ctp, ctr, cts, i, j, s, spritesNum, sss, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      color = capture.color;
      this.matGem.color.setRGB(color[0], color[1], color[2]);
      this.matGem.ambient.setRGB(color[0], color[1], color[2]);
      this.matGem.emissive.setRGB(color[0], color[1], color[2]);
      this.lineMat.color.setRGB(color[0], color[1], color[2]);
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        sss = capture.shadowScale;
        cp = capture.position;
        cr = capture.rotation;
        cs = capture.scale;
        ctp = capture.trianglePosition;
        ctr = capture.triangleRotation;
        cts = capture.triangleScale;
        s.group.position.set(cp[j], cp[j + 1], cp[j + 2]);
        s.group.rotation.set(cr[j], cr[j + 1], cr[j + 2]);
        s.group.scale.set(cs[j], cs[j + 1], cs[j + 2]);
        s.triangle.position.set(ctp[j], ctp[j + 1], ctp[j + 2]);
        s.triangle.rotation.set(ctr[j], ctr[j + 1], ctr[j + 2]);
        s.triangle.scale.set(cts[j], cts[j + 1], cts[j + 2]);
        s.shadow.scale.set(sss[j], sss[j + 1], sss[j + 2]);
        j += 3;
      }
    };

    return GroundNotes;

  })(MidiSprites);
  return GroundNotes;
});
