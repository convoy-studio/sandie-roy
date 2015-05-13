var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var TimelineMenu;
  TimelineMenu = (function(_super) {
    __extends(TimelineMenu, _super);

    function TimelineMenu(id, scope) {
      this.onResize = __bind(this.onResize, this);
      this.onClick = __bind(this.onClick, this);
      this.onLeave = __bind(this.onLeave, this);
      this.onEnter = __bind(this.onEnter, this);
      this.init = __bind(this.init, this);
      scope = {};
      scope.previews = Model.routing;
      TimelineMenu.__super__.constructor.call(this, id, scope);
    }

    TimelineMenu.prototype.init = function() {
      var $li;
      $li = this.element.find("li");
      $li.on("mouseenter", this.onEnter);
      $li.on("mouseleave", this.onLeave);
      $li.on("click", this.onClick);
    };

    TimelineMenu.prototype.onEnter = function(e) {
      var $target, id;
      $target = $(e.currentTarget);
      id = $target.attr("id");
    };

    TimelineMenu.prototype.onLeave = function(e) {
      var $target, id;
      $target = $(e.currentTarget);
      id = $target.attr("id");
    };

    TimelineMenu.prototype.onClick = function(e) {
      var $target, id;
      $target = $(e.currentTarget);
      id = $target.attr("id");
      Router.sendTo(id);
    };

    TimelineMenu.prototype.onResize = function() {
      var elementCss;
      elementCss = {
        left: (Model.windowW >> 1) - (this.element.width() >> 1),
        top: Model.windowH - this.element.height() - 40
      };
      this.element.css(elementCss);
    };

    return TimelineMenu;

  })(View);
  return TimelineMenu;
});
