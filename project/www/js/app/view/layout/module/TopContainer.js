var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View", "TimelineMenu"], function(View, TimelineMenu) {
  var TopContainer;
  TopContainer = (function(_super) {
    __extends(TopContainer, _super);

    function TopContainer(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.onResize = __bind(this.onResize, this);
      this.onReady = __bind(this.onReady, this);
      this.init = __bind(this.init, this);
      scope = {};
      scope.previews = Model.routing;
      TopContainer.__super__.constructor.call(this, id, scope);
    }

    TopContainer.prototype.init = function() {
      Signal.onResize.add(this.onResize, this);
      TweenMax.delayedCall(0.1, this.onReady);
    };

    TopContainer.prototype.onReady = function() {
      var $previewContainers, p, preview, _i, _len;
      this.timelineMenu = new TimelineMenu("timeline-menu");
      this.element.append(this.timelineMenu.element);
      this.timelineMenu.init();
      this.previews = [];
      $previewContainers = this.element.find(".preview-container");
      for (_i = 0, _len = $previewContainers.length; _i < _len; _i++) {
        preview = $previewContainers[_i];
        p = {};
        p.el = preview;
        p.titleEl = $(preview).find(".title").get(0);
        this.previews.push(p);
      }
      this.onResize();
    };

    TopContainer.prototype.onResize = function() {
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

    TopContainer.prototype.destroy = function() {
      TopContainer.__super__.destroy.call(this);
    };

    return TopContainer;

  })(View);
  return TopContainer;
});
