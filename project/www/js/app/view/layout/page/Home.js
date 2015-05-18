var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page", "TimelineMenu"], function(Page, TimelineMenu) {
  var Home;
  Home = (function(_super) {
    __extends(Home, _super);

    function Home(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.ready = __bind(this.ready, this);
      scope = {};
      scope.previews = Model.routing.slice(0, Model.routing.length - 1);
      Home.__super__.constructor.call(this, id, scope);
    }

    Home.prototype.ready = function() {
      var $previewContainers, p, preview, _i, _len;
      this.timelineMenu = new TimelineMenu("timeline-menu");
      this.element.append(this.timelineMenu.element);
      this.previews = [];
      $previewContainers = this.element.find(".preview-container");
      for (_i = 0, _len = $previewContainers.length; _i < _len; _i++) {
        preview = $previewContainers[_i];
        p = {};
        p.el = preview;
        p.titleEl = $(preview).find(".title").get(0);
        this.previews.push(p);
      }
      this.timelineMenu.previews = this.previews;
      this.timelineMenu.init();
      Home.__super__.ready.call(this);
    };

    Home.prototype.resize = function() {
      var elementCss, preview, titleCss, _i, _len, _ref;
      elementCss = {
        width: Model.windowW,
        height: Model.windowH
      };
      this.element.css(elementCss);
      this.timelineMenu.onResize();
      _ref = this.previews;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        preview = _ref[_i];
        titleCss = {
          top: (Model.windowH >> 1) - (preview.titleEl.offsetHeight >> 1),
          left: (Model.windowW >> 1) - (preview.titleEl.offsetWidth >> 1)
        };
        TweenMax.set(preview.titleEl, titleCss);
      }
    };

    Home.prototype.destroy = function() {
      this.timelineMenu.destroy();
      Home.__super__.destroy.call(this);
    };

    return Home;

  })(Page);
  return Home;
});
