var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page"], function(Page) {
  var Resonances;
  Resonances = (function(_super) {
    __extends(Resonances, _super);

    Resonances.prototype.canClick = true;

    function Resonances(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.logoSimple = Loader.getSvg("logo-simple");
      scope.progressArc = Loader.getSvg("progress-arc");
      scope.startExperience = Model.content["startExperience"];
      scope.malevitch = Loader.getImageURL(id + "-malevitch");
      Resonances.__super__.constructor.call(this, id, scope);
    }

    Resonances.prototype.init = function(cb) {
      Resonances.__super__.init.call(this, cb);
    };

    Resonances.prototype.ready = function() {
      Resonances.__super__.ready.call(this);
      this.startXpBtn = this.element.find(".start-xp-btn");
      this.bottom = this.element.find("#bottom");
      this.mediaContentBlock = this.element.find("#media-content-block");
    };

    Resonances.prototype.addAnimations = function() {
      Resonances.__super__.addAnimations.call(this);
    };

    Resonances.prototype.transitionIn = function() {
      this.element.find('.btn.acircle').addClass("open");
      Resonances.__super__.transitionIn.call(this);
    };

    Resonances.prototype.transitionOut = function() {
      this.element.find('.btn.acircle').removeClass("open");
      Resonances.__super__.transitionOut.call(this);
    };

    Resonances.prototype.resize = function() {
      var bottomCss, topBound;
      Resonances.__super__.resize.call(this);
      topBound = this.mediaContentBlock.offset().top + this.mediaContentBlock.height();
      bottomCss = {
        top: topBound + ((Model.windowH - $("#footer").height() - topBound) >> 1) - (this.bottom.height() >> 1)
      };
      this.bottom.css(bottomCss);
    };

    Resonances.prototype.destroy = function() {
      Resonances.__super__.destroy.call(this);
    };

    return Resonances;

  })(Page);
  return Resonances;
});
