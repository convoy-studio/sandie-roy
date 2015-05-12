var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip", "RibbonGroup"], function(Movieclip, RibbonGroup) {
  "use strict";
  var MouseTrailRibbonGroup;
  MouseTrailRibbonGroup = (function(_super) {
    __extends(MouseTrailRibbonGroup, _super);

    MouseTrailRibbonGroup.prototype.theta = 0;

    function MouseTrailRibbonGroup() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.onUpdateColorTween = __bind(this.onUpdateColorTween, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.init = __bind(this.init, this);
      MouseTrailRibbonGroup.__super__.constructor.call(this);
    }

    MouseTrailRibbonGroup.prototype.init = function() {
      var m, ribbon, _i, _len, _ref;
      MouseTrailRibbonGroup.__super__.init.call(this);
      this.ribbons = this.params.ribbons;
      _ref = this.ribbons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ribbon = _ref[_i];
        m = Util.MeshColorMaterial(Dvorak.Color.RED.clone(), null, THREE.DoubleSide);
        ribbon.material = m;
      }
      this.ribbonGroup = new RibbonGroup(this.container, this.ribbons);
      this.ribbonGroup.pooler = Dvorak.Pooler;
      this.ribbonGroup.init();
      this.colorAnim = {
        value: 0
      };
      this.tweenColor = TweenMax.to(this.colorAnim, 2, {
        value: 1,
        paused: true,
        onUpdate: this.onUpdateColorTween
      });
      this.tweenColor.pause(0);
      this.skyColorFrom = new THREE.Color(0xeadbba);
    };

    MouseTrailRibbonGroup.prototype.transitionIn = function() {
      this.ribbonGroup.pooler = Dvorak.Pooler;
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.onColorStateChanged();
      MouseTrailRibbonGroup.__super__.transitionIn.call(this);
    };

    MouseTrailRibbonGroup.prototype.transitionOut = function() {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      MouseTrailRibbonGroup.__super__.transitionOut.call(this);
    };

    MouseTrailRibbonGroup.prototype.onColorStateChanged = function() {
      var currentMills, timescale;
      currentMills = Sound.instance.getPosition();
      if (Dvorak.Color.state === "WHITE" && currentMills < 60000) {
        this.skyColorTo = Dvorak.Color.RED;
        timescale = 1;
      } else if (Dvorak.Color.state === "WHITE" && currentMills > 60000) {
        this.skyColorTo = new THREE.Color(0x2c474e);
        timescale = 1;
      } else if (Dvorak.Color.state === "BLUE") {
        this.skyColorTo = Dvorak.Color.WHITE;
        timescale = 1;
      } else if (Dvorak.Color.state === "GREEN") {
        this.skyColorTo = Dvorak.Color.LIGHT_WHITE;
        timescale = 10000;
      } else if (Dvorak.Color.state === "RED") {
        this.skyColorTo = new THREE.Color(0x393431);
        timescale = 100000;
      }
      this.tweenColor.timeScale(timescale);
      this.tweenColor.play(0);
    };

    MouseTrailRibbonGroup.prototype.onUpdateColorTween = function() {
      var ribbon, vColor, _i, _len, _ref;
      vColor = Util.CalcAnimValue(this.skyColorFrom, this.skyColorTo, this.colorAnim.value);
      _ref = this.ribbonGroup.ribbons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ribbon = _ref[_i];
        ribbon.material.uniforms.color.value.setRGB(vColor.r, vColor.g, vColor.b);
      }
    };

    MouseTrailRibbonGroup.prototype.onUpdate = function() {
      var rX, rY, rZ, randomScale, x, y, z;
      if (this.params.motionType === "MOUSE") {
        randomScale = (Sound.frequency / 200) * 120;
        this.ribbonGroup.ribbonTarget.x = Util.Rand(Dvorak.Mouse.projection.x + randomScale, Dvorak.Mouse.projection.x - randomScale, 0);
        this.ribbonGroup.ribbonTarget.y = Util.Rand(Dvorak.Mouse.projection.y + randomScale, Dvorak.Mouse.projection.y - randomScale, 0);
        this.ribbonGroup.ribbonTarget.y += 100;
        this.ribbonGroup.ribbonTarget.z = Util.Rand(Dvorak.Mouse.projection.z + randomScale, Dvorak.Mouse.projection.z - randomScale, 0);
        this.ribbonGroup.ribbonSeparation = 100 * (Sound.frequency / 200) * 1;
      } else {
        this.theta += (this.ribbonTargetVars.theta - Math.sin(this.theta) * 0.02) + (Sound.frequency / 200) * 0.1;
        rX = this.ribbonTargetVars.x + Math.sin(this.theta) * Math.random() * this.ribbonTargetVars.xOffset;
        rY = Math.max(this.ribbonTargetVars.y + Math.cos(this.theta) * Math.random() * this.ribbonTargetVars.yOffset, 0);
        rZ = this.ribbonTargetVars.z + Math.sin(this.theta) * Math.random() * this.ribbonTargetVars.zOffset;
        x = rX * Math.cos(this.theta);
        y = rY * Math.sin(this.theta);
        z = Dvorak.Mouse.projection.z + rZ * Math.cos(this.theta);
        this.ribbonGroup.ribbonTarget.x += (x - this.ribbonGroup.ribbonTarget.x) * this.ribbonTargetVars.xEasing;
        this.ribbonGroup.ribbonTarget.y += (this.ribbonTargetVars.yOffset2 + y - this.ribbonGroup.ribbonTarget.y) * this.ribbonTargetVars.yEasing;
        this.ribbonGroup.ribbonTarget.z += (z - this.ribbonGroup.ribbonTarget.z) * this.ribbonTargetVars.zEasing;
      }
      this.ribbonGroup.onUpdate();
    };

    MouseTrailRibbonGroup.prototype.transitionIn = function() {
      var curvesLen, i, iters, j, k, mathRandom, targets, _i, _ref;
      if (this.params.motionType === "AROUND") {
        mathRandom = Util.Rand(1, 0, 1);
        this.ribbonTargetVars = {
          x: Util.Rand(1200, -1200, 0),
          y: Util.Rand(600, -600, 0),
          z: Util.Rand(600, -600, 0),
          xOffset: Util.Rand(600, 300, 0),
          yOffset: Util.Rand(60, 20, 0),
          yOffset2: Util.Rand(400, 100, 0),
          zOffset: Util.Rand(400, 100, 0),
          xEasing: Util.Rand(1, 0.8, 1),
          yEasing: Util.Rand(1, 0.8, 1),
          zEasing: Util.Rand(1, 0.8, 1),
          separation: Util.Rand(1, -1, 1),
          theta: Util.Rand(0.01, -0.01, 2)
        };
      }
      this.ribbonGroup.ribbons[0].pts[0].set(0, 0, 0);
      this.ribbonGroup.ribbons[0].pts[1].set(0, 0, 0);
      this.ribbonGroup.ribbons[0].pts[2].set(0, 0, 0);
      iters = this.ribbonGroup.ribbons[0].numCurves;
      targets = this.ribbonGroup.ribbons[0].ribbonTargetsArray;
      curvesLen = this.ribbonGroup.ribbons[0].curves.length;
      j = 0;
      k = 0;
      for (i = _i = 0, _ref = iters * curvesLen; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.ribbonGroup.ribbonTarget.set(0, 0, 0);
        this.ribbonGroup.onUpdate();
        if (j >= curvesLen) {
          k += 1;
          j = 0;
        }
        j += 1;
      }
      MouseTrailRibbonGroup.__super__.transitionIn.call(this);
    };

    MouseTrailRibbonGroup.prototype.collectParams = function() {
      var color;
      MouseTrailRibbonGroup.__super__.collectParams.call(this);
      this.collection.ribbonsNum = this.params.ribbons.length;
      this.collection.setup = this.params;
      delete this.collection.setup.ribbons[0].material;
      this.collection.ribbonTargetPosition = [this.ribbonGroup.ribbonTarget.x, this.ribbonGroup.ribbonTarget.y, this.ribbonGroup.ribbonTarget.z];
      color = this.ribbonGroup.ribbons[0].material.uniforms.color.value;
      this.collection.ribbonColor = [color.r, color.g, color.b];
      this.collection.ribbonSeparation = this.ribbonGroup.ribbonSeparation;
      this.collection.pts = {
        pts0: [this.ribbonGroup.ribbons[0].pts[0].x, this.ribbonGroup.ribbons[0].pts[0].y, this.ribbonGroup.ribbons[0].pts[0].z],
        pts1: [this.ribbonGroup.ribbons[0].pts[1].x, this.ribbonGroup.ribbons[0].pts[1].y, this.ribbonGroup.ribbons[0].pts[1].z],
        pts2: [this.ribbonGroup.ribbons[0].pts[2].x, this.ribbonGroup.ribbons[0].pts[2].y, this.ribbonGroup.ribbons[0].pts[2].z]
      };
      this.collection.ribbonStepId = this.ribbonGroup.ribbons[0].stepId;
      this.collection.curveStepId = this.ribbonGroup.ribbons[0].currentCurve.stepId;
      this.collection.curvesLen = this.ribbonGroup.ribbons[0].curves.length;
      this.collection.ribbonTargetsArray = this.ribbonGroup.ribbons[0].ribbonTargetsArray;
      this.collection.randomVec = [this.ribbonGroup.ribbons[0].randomVec.x, this.ribbonGroup.ribbons[0].randomVec.y, this.ribbonGroup.ribbons[0].randomVec.z];
      this.collection.randomAddVec = [this.ribbonGroup.ribbons[0].randomAddVec.x, this.ribbonGroup.ribbons[0].randomAddVec.y, this.ribbonGroup.ribbons[0].randomAddVec.z];
      this.collection.lastMidPt = [this.ribbonGroup.ribbons[0].lastMidPt.x, this.ribbonGroup.ribbons[0].lastMidPt.y, this.ribbonGroup.ribbons[0].lastMidPt.z];
      this.collection.midPt = [this.ribbonGroup.ribbons[0].midPt.x, this.ribbonGroup.ribbons[0].midPt.y, this.ribbonGroup.ribbons[0].midPt.z];
      return this.collection;
    };

    MouseTrailRibbonGroup.prototype.applyParams = function(capture) {
      var i, iters, j, k, ribbon, ribbons, t, targets, _i, _j, _len, _ref, _ref1;
      ribbons = capture.setup.ribbons;
      _ref = this.ribbonGroup.ribbons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ribbon = _ref[_i];
        ribbon.material.uniforms.color.value.setRGB(capture.ribbonColor[0], capture.ribbonColor[1], capture.ribbonColor[2]);
      }
      this.ribbonGroup.ribbonSeparation = capture.ribbonSeparation;
      this.ribbonGroup.ribbons[0].stepId = capture.ribbonStepId;
      this.ribbonGroup.ribbons[0].currentCurve.stepId = capture.curveStepId;
      iters = ribbons[0].numCurves;
      targets = capture.ribbonTargetsArray;
      j = 0;
      k = 0;
      for (i = _j = 0, _ref1 = iters * capture.curvesLen; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        t = targets[k];
        if (t != null) {
          this.ribbonGroup.ribbonTarget.set(t.x, t.y, t.z);
          this.ribbonGroup.onUpdate();
        }
        if (j >= capture.curvesLen) {
          k += 1;
          j = 0;
        }
        j += 1;
      }
    };

    return MouseTrailRibbonGroup;

  })(Movieclip);
  return MouseTrailRibbonGroup;
});
