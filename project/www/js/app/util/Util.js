var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var Util;
  Util = (function() {
    function Util() {
      this.ExitFullscreen = __bind(this.ExitFullscreen, this);
      this.LaunchIntoFullscreen = __bind(this.LaunchIntoFullscreen, this);
      this.GetCanvas = __bind(this.GetCanvas, this);
      this.GetCookie = __bind(this.GetCookie, this);
      this.SetCookie = __bind(this.SetCookie, this);
      this.GetUrlVars = __bind(this.GetUrlVars, this);
      this.IsEven = __bind(this.IsEven, this);
      this.Rand = __bind(this.Rand, this);
      this.GetImgNativeSize = __bind(this.GetImgNativeSize, this);
      this.SecondsToMinutes = __bind(this.SecondsToMinutes, this);
      this.SwitchImgLazySrcs = __bind(this.SwitchImgLazySrcs, this);
      this.ToFixed = __bind(this.ToFixed, this);
      this.Norm = __bind(this.Norm, this);
      this.Lerp = __bind(this.Lerp, this);
      this.Map = __bind(this.Map, this);
      this.ComponentToHex = __bind(this.ComponentToHex, this);
      this.RgbToHex = __bind(this.RgbToHex, this);
      this.HexToRgb = __bind(this.HexToRgb, this);
      this.guid = __bind(this.guid, this);
      this.HexString = __bind(this.HexString, this);
      this.UnitToRGB = __bind(this.UnitToRGB, this);
      this.RGBtoUnit = __bind(this.RGBtoUnit, this);
      this.ToType = __bind(this.ToType, this);
      this.IsInt = __bind(this.IsInt, this);
      this.ValidateEmail = __bind(this.ValidateEmail, this);
      this.ConvertToClassName = __bind(this.ConvertToClassName, this);
      this.Limit = __bind(this.Limit, this);
      this.RandomInt = __bind(this.RandomInt, this);
      this.ConvertToSlug = __bind(this.ConvertToSlug, this);
      this.ToggleVisibility = __bind(this.ToggleVisibility, this);
      this.RadiansToDegrees = __bind(this.RadiansToDegrees, this);
      this.TranformArrayFromMiddleAndOut = __bind(this.TranformArrayFromMiddleAndOut, this);
      this.DegreesToRadians = __bind(this.DegreesToRadians, this);
      this.JqueryObjToString = __bind(this.JqueryObjToString, this);
      this.RenderPartial = __bind(this.RenderPartial, this);
      this.CapitalizeFirstLetter = __bind(this.CapitalizeFirstLetter, this);
    }

    Util.prototype.CapitalizeFirstLetter = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Util.prototype.RenderPartial = function(rawPartial, contentData) {
      return $(Mustache.render(rawPartial, contentData));
    };

    Util.prototype.JqueryObjToString = function(jobj) {
      return $('<div>').append($(jobj).clone()).html();
    };

    Util.prototype.DegreesToRadians = function(degrees) {
      return degrees * (Math.PI / 180);
    };

    Util.prototype.TranformArrayFromMiddleAndOut = function(array) {
      var i, j, newArray;
      newArray = [];
      i = Math.ceil(array.length / 2);
      j = i - 1;
      while (j >= 0) {
        newArray.push(array[j--]);
        if (i < array.length) {
          newArray.push(array[i++]);
        }
      }
      return newArray;
    };

    Util.prototype.RadiansToDegrees = function(radians) {
      return radians * (180 / Math.PI);
    };

    Util.prototype.ToggleVisibility = function(object3D, visible) {
      var _this = this;
      return object3D.traverse(function(object) {
        return object.visible = visible;
      });
    };

    Util.prototype.ConvertToSlug = function(text, separator) {
      separator = separator != null ? separator : "-";
      return text.toLowerCase().replace(/[^\w ]+/g, "").replace(RegExp(" +", "g"), separator);
    };

    Util.prototype.RandomInt = function(multiplier) {
      if (multiplier == null) {
        multiplier = 10000000;
      }
      if (multiplier != null) {
        multiplier;
      } else {
        10000000;
      }
      return Math.round(Math.random() * multiplier) + 1;
    };

    Util.prototype.Limit = function(min, max, value) {
      return Math.max(min, Math.min(max, value));
    };

    Util.prototype.ConvertToClassName = function(text) {
      var t, tArray, txt, _i, _len;
      tArray = text.split("-");
      txt = "";
      if (tArray.length > 1) {
        for (_i = 0, _len = tArray.length; _i < _len; _i++) {
          t = tArray[_i];
          txt += this.CapitalizeFirstLetter(t);
        }
      } else {
        txt = this.CapitalizeFirstLetter(tArray[0]);
      }
      return txt;
    };

    Util.prototype.ValidateEmail = function(email) {
      var re;
      re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    Util.prototype.IsInt = function(n) {
      return n % 1 === 0;
    };

    Util.prototype.ToType = function(obj) {
      return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

    Util.prototype.RGBtoUnit = function(value) {
      return (value / 255) * 1;
    };

    Util.prototype.UnitToRGB = function(value) {
      return (value / 1) * 255;
    };

    Util.prototype.HexString = function(hex) {
      return ('000000' + hex.toString(16)).slice(-6);
    };

    Util.prototype.guid = function() {
      var s4;
      s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      return s4() + s4();
    };

    Util.prototype.HexToRgb = function(hex, unit) {
      var b, g, r, result;
      unit = unit != null ? unit : false;
      result = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;
      r = parseInt(result.substring(0, 2), 16);
      b = parseInt(result.substring(2, 4), 16);
      g = parseInt(result.substring(4, 6), 16);
      if (unit) {
        r = this.RGBtoUnit(r);
        b = this.RGBtoUnit(b);
        g = this.RGBtoUnit(g);
      }
      return {
        r: r,
        g: g,
        b: b
      };
    };

    Util.prototype.RgbToHex = function(r, g, b) {
      return "#" + this.ComponentToHex(r) + this.ComponentToHex(g) + this.ComponentToHex(b);
    };

    Util.prototype.ComponentToHex = function(c) {
      var hex;
      hex = c.toString(16);
      if (hex.length === 1) {
        return "0" + hex;
      } else {
        return hex;
      }
    };

    Util.prototype.Map = function(value, min1, max1, min2, max2) {
      return this.Lerp(min2, max2, this.Norm(value, min1, max1));
    };

    Util.prototype.Lerp = function(min, max, amt) {
      return min + (max - min) * amt;
    };

    Util.prototype.Norm = function(value, min, max) {
      return (value - min) / (max - min);
    };

    Util.prototype.ToFixed = function(number, factor) {
      return Math.round(number * factor) / factor;
    };

    Util.prototype.SwitchImgLazySrcs = function(item) {
      var $imgSrcs, $part, imgSrc, src, _i, _len;
      if (item == null) {
        return;
      }
      $part = $(item);
      $imgSrcs = $part.find("img[lazy-src]");
      for (_i = 0, _len = $imgSrcs.length; _i < _len; _i++) {
        imgSrc = $imgSrcs[_i];
        src = imgSrc.getAttribute("lazy-src");
        imgSrc.setAttribute("src", src);
      }
    };

    Util.prototype.SecondsToMinutes = function(time) {
      var minutes, seconds;
      minutes = Math.floor(time / 60);
      seconds = Math.round(time - minutes * 60);
      minutes = minutes.toString();
      seconds = seconds.toString();
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
      if (seconds.length === 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    };

    Util.prototype.GetImgNativeSize = function(url) {
      var img;
      img = new Image();
      img.src = url;
      return {
        width: img.width,
        height: img.height
      };
    };

    Util.prototype.Rand = function(max, min, decimals) {
      var d, randomNum;
      if (min > max) {
        void 0;
      }
      randomNum = Math.random() * (max - min) + min;
      d = Math.pow(10, decimals);
      return ~~((d * randomNum) + 0.5) / d;
    };

    Util.prototype.IsEven = function(value) {
      if ((value % 2) === 0) {
        return true;
      } else {
        return false;
      }
    };

    Util.prototype.GetUrlVars = function(key) {
      var parts, vars;
      vars = {};
      parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
        var cleanVal, indexPos;
        cleanVal = value;
        if (value.indexOf("#") > 0) {
          indexPos = value.indexOf("#");
          cleanVal = value.slice(0, indexPos);
        }
        vars[key] = cleanVal;
      });
      return vars;
    };

    Util.prototype.SetCookie = function(cname, cvalue) {
      return document.cookie = cname + "=" + cvalue;
    };

    Util.prototype.GetCookie = function(cname) {
      var c, ca, cookie, i, name;
      name = cname + "=";
      ca = document.cookie.split(';');
      i = 0;
      cookie = "";
      while (i < ca.length) {
        c = ca[i].trim();
        if (c.indexOf(name) === 0) {
          cookie = c.substring(name.length, c.length);
        }
        i++;
      }
      return cookie;
    };

    Util.prototype.GetCanvas = function(width, height) {
      var canvas;
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    };

    Util.prototype.LaunchIntoFullscreen = function(element) {
      if (element.requestFullscreen) {
        return element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        return element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        return element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        return element.msRequestFullscreen();
      }
    };

    Util.prototype.ExitFullscreen = function() {
      if (document.exitFullscreen) {
        return document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen();
      }
    };

    return Util;

  })();
  return Util;
});
