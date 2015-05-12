var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["SongPage"], function(SongPage) {
  var Dvorak;
  Dvorak = (function(_super) {
    __extends(Dvorak, _super);

    function Dvorak(id, scope) {
      scope.startBtnTxt = Model.content["startBtnTxt"];
      scope.concertBtnTxt = Model.content["concertBtnTxt"];
      scope.concertImage = Loader.getImageURL(id + "-dvorak");
      Dvorak.__super__.constructor.call(this, id, scope);
    }

    return Dvorak;

  })(SongPage);
  return Dvorak;
});
