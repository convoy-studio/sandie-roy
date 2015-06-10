var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var SubSideMenu;
  SubSideMenu = (function(_super) {
    __extends(SubSideMenu, _super);

    SubSideMenu.prototype.onSideMenuClicked = void 0;

    function SubSideMenu(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.getItemByIndex = __bind(this.getItemByIndex, this);
      this.resetAllItems = __bind(this.resetAllItems, this);
      this.updateMenu = __bind(this.updateMenu, this);
      this.onItemClicked = __bind(this.onItemClicked, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      var i, m, menu, _i, _ref;
      menu = [];
      for (i = _i = 0, _ref = scope.num - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        m = {};
        m.id = "m-" + i;
        menu.push(m);
      }
      scope.circle = Loader.getSvg("circle");
      scope.menu = menu;
      SubSideMenu.__super__.constructor.call(this, id, scope);
    }

    SubSideMenu.prototype.init = function() {
      this.ready();
    };

    SubSideMenu.prototype.ready = function() {
      var c, i, item, _i, _len, _ref;
      this.circleWrappers = this.element.find(".circle-wrapper");
      this.circleWrappers.on("click", this.onItemClicked);
      _ref = this.circleWrappers;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        c = {};
        c.id = item.id;
        this.scope.menu[i].el = item;
      }
      this.updateMenu(0);
    };

    SubSideMenu.prototype.onItemClicked = function(e) {
      var id, index, target;
      target = e.currentTarget;
      id = target.id;
      index = parseInt(id.substr(id.length - 1), 10);
      this.onSideMenuClicked(index);
      this.updateMenu(index);
    };

    SubSideMenu.prototype.updateMenu = function(index) {
      var item;
      item = this.getItemByIndex(index);
      this.resetAllItems();
      item.el.classList.add("active");
    };

    SubSideMenu.prototype.resetAllItems = function() {
      var m, _i, _len, _ref;
      _ref = this.scope.menu;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.el.classList.remove("active");
      }
    };

    SubSideMenu.prototype.getItemByIndex = function(index) {
      return this.scope.menu[index];
    };

    SubSideMenu.prototype.resize = function() {
      var elementCss;
      elementCss = {
        top: (Model.windowH >> 1) - (this.element.height() >> 1) - 20
      };
      this.element.css(elementCss);
    };

    SubSideMenu.prototype.destroy = function() {
      SubSideMenu.__super__.destroy.call(this);
      this.circleWrappers.off("click", this.onItemClicked);
    };

    return SubSideMenu;

  })(View);
  return SubSideMenu;
});
