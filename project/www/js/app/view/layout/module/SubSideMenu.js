var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View"], function(View) {
  var SubSideMenu;
  SubSideMenu = (function() {
    class SubSideMenu extends View {
      constructor(id, scope) {
        var i, j, m, menu, ref;
        menu = [];
        for (i = j = 0, ref = scope.num - 1; undefined !== 0 && (0 <= ref ? 0 <= j && j <= ref : 0 >= j && j >= ref); i = 0 <= ref ? ++j : --j) {
          m = {};
          m.id = "m-" + i;
          menu.push(m);
        }
        scope.circle = Loader.getSvg("circle");
        scope.menu = menu;
        super(id, scope);
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.resetAllItems = this.resetAllItems.bind(this);
        this.getItemByIndex = this.getItemByIndex.bind(this);
        this.resize = this.resize.bind(this);
        this.destroy = this.destroy.bind(this);
      }

      init() {
        boundMethodCheck(this, SubSideMenu);
        this.ready();
      }

      ready() {
        var c, i, item, j, len, ref;
        boundMethodCheck(this, SubSideMenu);
        this.circleWrappers = this.element.find(".circle-wrapper");
        this.circleWrappers.on("click", this.onItemClicked);
        ref = this.circleWrappers;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          c = {};
          c.id = item.id;
          this.scope.menu[i].el = item;
        }
        this.updateMenu(0);
      }

      onItemClicked(e) {
        var id, index, target;
        boundMethodCheck(this, SubSideMenu);
        target = e.currentTarget;
        id = target.id;
        index = parseInt(id.split("-")[1]);
        this.onSideMenuClicked(index);
        this.updateMenu(index);
      }

      updateMenu(index) {
        var item;
        boundMethodCheck(this, SubSideMenu);
        item = this.getItemByIndex(index);
        this.resetAllItems();
        item.el.classList.add("active");
      }

      resetAllItems() {
        var j, len, m, ref;
        boundMethodCheck(this, SubSideMenu);
        ref = this.scope.menu;
        for (j = 0, len = ref.length; j < len; j++) {
          m = ref[j];
          m.el.classList.remove("active");
        }
      }

      getItemByIndex(index) {
        boundMethodCheck(this, SubSideMenu);
        return this.scope.menu[index];
      }

      resize() {
        var elementCss;
        boundMethodCheck(this, SubSideMenu);
        elementCss = {
          top: (Model.windowH >> 1) - (this.element.height() >> 1) - 20
        };
        this.element.css(elementCss);
      }

      destroy() {
        boundMethodCheck(this, SubSideMenu);
        super.destroy();
        this.circleWrappers.off("click", this.onItemClicked);
      }

    };

    SubSideMenu.prototype.onSideMenuClicked = void 0;

    return SubSideMenu;

  }).call(this);
  return SubSideMenu;
});
