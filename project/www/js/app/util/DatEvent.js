var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var DatEvent;
  DatEvent = (function() {
    DatEvent.prototype.param = void 0;

    DatEvent.prototype.call = void 0;

    DatEvent.prototype.id = void 0;

    DatEvent.prototype.parentId = void 0;

    function DatEvent(p, id, c, parentId) {
      this.onChanged = __bind(this.onChanged, this);
      this.param = p;
      this.call = c;
      this.id = id;
      this.parentId = parentId;
      this.param.onChange(this.onChanged);
    }

    DatEvent.prototype.onChanged = function(value) {
      return this.call(this.id, value, this.parentId);
    };

    return DatEvent;

  })();
  return DatEvent;
});
