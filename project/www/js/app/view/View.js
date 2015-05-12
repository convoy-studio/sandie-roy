var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["Mustache"], function(Mustache) {
  "use strict";
  var View;
  View = (function() {
    View.prototype.element = void 0;

    View.prototype.id = void 0;

    View.prototype.partialId = void 0;

    View.prototype.scope = {};

    function View(id, scope) {
      this.destroy = __bind(this.destroy, this);
      var rawPartial, render;
      this.scope = scope;
      this.id = id;
      if (id instanceof jQuery) {
        rawPartial = Util.JqueryObjToString(this.id);
        if (this.scope != null) {
          this.element = $(Mustache.render(rawPartial, this.scope));
        } else {
          this.element = id;
        }
      } else {
        this.partialId = this.id + "-partial";
        rawPartial = Loader.getContentById(this.partialId);
        if (rawPartial != null) {
          if (this.scope != null) {
            while (rawPartial.indexOf("{{") >= 0) {
              render = Mustache.render(rawPartial, this.scope);
              rawPartial = render;
            }
            this.element = $(render);
          } else {
            this.element = $(rawPartial);
          }
        }
      }
      return;
    }

    View.prototype.destroy = function() {
      this.element.remove();
    };

    return View;

  })();
  return View;
});
