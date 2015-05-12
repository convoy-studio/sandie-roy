var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View", "Onde"], function(View, Onde) {
  var MainLoader;
  MainLoader = (function(_super) {
    __extends(MainLoader, _super);

    MainLoader.prototype.budgeEl = void 0;

    MainLoader.prototype.budgeIconEl = void 0;

    MainLoader.prototype.textEl = void 0;

    MainLoader.prototype.destroyedCall = void 0;

    function MainLoader(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.onReverseComplete = __bind(this.onReverseComplete, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      MainLoader.__super__.constructor.call(this, id, scope);
    }

    MainLoader.prototype.init = function() {
      this.ready();
      return $(window).on("resize", this.resize);
    };

    MainLoader.prototype.ready = function() {
      var $badge, $icon, $info, $text, charTime, d, delay, end, i, info, insideDelay, splitTitle, start, time, _i, _len, _ref;
      this.tl = new TimelineMax({
        onReverseComplete: this.onReverseComplete
      });
      this.infos = this.element.find("ul li");
      this.ondeEl = this.element.find("#onde");
      delay = 4;
      this.isLoop = this.infos.length > 1 ? true : false;
      time = 0.8;
      this.element.css("opacity", 1);
      _ref = this.infos;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        info = _ref[i];
        $info = $(info);
        $badge = $info.find(".badge");
        $icon = $badge.find("i");
        $text = $info.find(".badge-text");
        start = delay * i;
        end = start;
        d = delay * i;
        insideDelay = i * (time * 0.1);
        splitTitle = new SplitText($text, {
          type: "chars"
        });
        charTime = (12 / splitTitle.chars.length) * 0.05;
        this.tl.from($badge, time, {
          scale: 0,
          force3D: true,
          ease: Elastic.easeInOut
        }, 0.1 + start);
        this.tl.from($icon, time, {
          scale: 0,
          opacity: 0,
          force3D: true,
          ease: Elastic.easeInOut
        }, 0.1 + start * 1.05);
        this.tl.staggerFromTo(splitTitle.chars, time, {
          y: 10,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          force3D: true,
          ease: Back.easeInOut
        }, charTime, 0.1 + start * 1.05);
        if (this.isLoop) {
          this.tl.from($badge, time, {
            scale: 0,
            force3D: true,
            ease: Elastic.easeInOut
          }, end + insideDelay);
          this.tl.from($icon, time, {
            scale: 0,
            opacity: 0,
            force3D: true,
            ease: Elastic.easeInOut
          }, end + insideDelay);
          this.tl.staggerFromTo(splitTitle.chars, time, {
            y: 10,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            force3D: true,
            ease: Back.easeInOut
          }, charTime, end + insideDelay);
          this.tl.to($badge, time, {
            scale: 0,
            force3D: true,
            ease: Elastic.easeInOut
          }, end + delay);
          this.tl.to($icon, time, {
            scale: 0,
            opacity: 0,
            force3D: true,
            ease: Elastic.easeInOut
          }, end + delay);
          this.tl.staggerTo(splitTitle.chars, time, {
            y: 10,
            opacity: 0,
            force3D: true,
            ease: Back.easeInOut
          }, charTime, end + delay);
        }
      }
      this.tl.pause(0);
      this.onde = new Onde();
      this.onde.init(this.ondeEl);
      return this.resize();
    };

    MainLoader.prototype.transitionIn = function() {
      this.tl.timeScale(1.4);
      this.tl.play(0);
      return this.onde.transitionIn();
    };

    MainLoader.prototype.transitionOut = function(cb) {
      this.tl.timeScale(1.8);
      this.tl.reverse();
      this.onde.transitionOut();
      return this.destroyedCall = cb;
    };

    MainLoader.prototype.onReverseComplete = function() {
      return this.destroy();
    };

    MainLoader.prototype.resize = function() {
      return this.onde.resize();
    };

    MainLoader.prototype.destroy = function() {
      $(window).off("resize", this.resize);
      this.onde.destroy();
      this.onde = null;
      MainLoader.__super__.destroy.call(this);
      this.tl.clear();
      this.tl = null;
      return this.destroyedCall();
    };

    return MainLoader;

  })(View);
  return MainLoader;
});
