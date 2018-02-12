define([], function() {
  "use strict";
  var Util;
  Util = class Util {
    constructor() {
      this.CapitalizeFirstLetter = this.CapitalizeFirstLetter.bind(this);
      this.RenderPartial = this.RenderPartial.bind(this);
      this.JqueryObjToString = this.JqueryObjToString.bind(this);
      this.DegreesToRadians = this.DegreesToRadians.bind(this);
      this.TranformArrayFromMiddleAndOut = this.TranformArrayFromMiddleAndOut.bind(this);
      this.RadiansToDegrees = this.RadiansToDegrees.bind(this);
      this.ToggleVisibility = this.ToggleVisibility.bind(this);
      this.ConvertToSlug = this.ConvertToSlug.bind(this);
      this.RandomInt = this.RandomInt.bind(this);
      this.Limit = this.Limit.bind(this);
      this.ConvertToClassName = this.ConvertToClassName.bind(this);
      this.ValidateEmail = this.ValidateEmail.bind(this);
      this.IsInt = this.IsInt.bind(this);
      this.ToType = this.ToType.bind(this);
      this.RGBtoUnit = this.RGBtoUnit.bind(this);
      this.UnitToRGB = this.UnitToRGB.bind(this);
      this.HexString = this.HexString.bind(this);
      this.guid = this.guid.bind(this);
      this.HexToRgb = this.HexToRgb.bind(this);
      this.RgbToHex = this.RgbToHex.bind(this);
      this.ComponentToHex = this.ComponentToHex.bind(this);
      this.Map = this.Map.bind(this);
      this.Lerp = this.Lerp.bind(this);
      this.Norm = this.Norm.bind(this);
      // Not safe always (be careful with that)
      this.ToFixed = this.ToFixed.bind(this);
      this.SwitchImgLazySrcs = this.SwitchImgLazySrcs.bind(this);
      this.SecondsToMinutes = this.SecondsToMinutes.bind(this);
      this.GetImgNativeSize = this.GetImgNativeSize.bind(this);
      this.Rand = this.Rand.bind(this);
      this.IsEven = this.IsEven.bind(this);
      this.GetUrlVars = this.GetUrlVars.bind(this);
      this.SetCookie = this.SetCookie.bind(this);
      this.GetCookie = this.GetCookie.bind(this);
      this.GetCanvas = this.GetCanvas.bind(this);
      this.LaunchIntoFullscreen = this.LaunchIntoFullscreen.bind(this);
      this.ExitFullscreen = this.ExitFullscreen.bind(this);
    }

    CapitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    RenderPartial(rawPartial, contentData) {
      return $(Mustache.render(rawPartial, contentData));
    }

    JqueryObjToString(jobj) {
      return $('<div>').append($(jobj).clone()).html();
    }

    DegreesToRadians(degrees) {
      return degrees * (Math.PI / 180);
    }

    TranformArrayFromMiddleAndOut(array) {
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
    }

    RadiansToDegrees(radians) {
      return radians * (180 / Math.PI);
    }

    ToggleVisibility(object3D, visible) {
      return object3D.traverse((object) => {
        return object.visible = visible;
      });
    }

    ConvertToSlug(text, separator) {
      separator = separator != null ? separator : "-";
      return text.toLowerCase().replace(/[^\w ]+/g, "").replace(RegExp(" +", "g"), separator);
    }

    RandomInt(multiplier = 10000000) {
      if (multiplier != null) {
        multiplier;
      } else {
        10000000;
      }
      return Math.round(Math.random() * multiplier) + 1;
    }

    Limit(min, max, value) {
      return Math.max(min, Math.min(max, value));
    }

    ConvertToClassName(text) {
      var k, len, t, tArray, txt;
      tArray = text.split("-");
      txt = "";
      if (tArray.length > 1) {
        for (k = 0, len = tArray.length; k < len; k++) {
          t = tArray[k];
          txt += this.CapitalizeFirstLetter(t);
        }
      } else {
        txt = this.CapitalizeFirstLetter(tArray[0]);
      }
      return txt;
    }

    ValidateEmail(email) {
      var re;
      re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    IsInt(n) {
      return n % 1 === 0;
    }

    ToType(obj) {
      return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    RGBtoUnit(value) {
      return (value / 255) * 1;
    }

    UnitToRGB(value) {
      return (value / 1) * 255;
    }

    HexString(hex) {
      return ('000000' + hex.toString(16)).slice(-6);
    }

    guid() {
      var s4;
      s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };
      return s4() + s4();
    }

    HexToRgb(hex, unit) {
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
    }

    RgbToHex(r, g, b) {
      return "#" + this.ComponentToHex(r) + this.ComponentToHex(g) + this.ComponentToHex(b);
    }

    ComponentToHex(c) {
      var hex;
      hex = c.toString(16);
      if (hex.length === 1) {
        return "0" + hex;
      } else {
        return hex;
      }
    }

    Map(value, min1, max1, min2, max2) {
      return this.Lerp(min2, max2, this.Norm(value, min1, max1));
    }

    Lerp(min, max, amt) {
      return min + (max - min) * amt;
    }

    Norm(value, min, max) {
      return (value - min) / (max - min);
    }

    ToFixed(number, factor) {
      return Math.round(number * factor) / factor;
    }

    SwitchImgLazySrcs(item) {
      var $imgSrcs, $part, imgSrc, k, len, src;
      if (item == null) {
        return;
      }
      $part = $(item);
      $imgSrcs = $part.find("img[lazy-src]");
      for (k = 0, len = $imgSrcs.length; k < len; k++) {
        imgSrc = $imgSrcs[k];
        src = imgSrc.getAttribute("lazy-src");
        imgSrc.setAttribute("src", src);
      }
    }

    SecondsToMinutes(time) {
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
    }

    GetImgNativeSize(url) {
      var img;
      img = new Image();
      img.src = url;
      return {
        width: img.width,
        height: img.height
      };
    }

    Rand(max, min, decimals) {
      var d, randomNum;
      if (min > max) {
        void 0;
      }
      randomNum = Math.random() * (max - min) + min;
      d = Math.pow(10, decimals);
      return ~~((d * randomNum) + 0.5) / d;
    }

    IsEven(value) {
      if ((value % 2) === 0) {
        return true;
      } else {
        return false;
      }
    }

    GetUrlVars(key) {
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
    }

    SetCookie(cname, cvalue) {
      return document.cookie = cname + "=" + cvalue;
    }

    GetCookie(cname) {
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
    }

    GetCanvas(width, height) {
      var canvas;
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }

    LaunchIntoFullscreen(element) {
      if (element.requestFullscreen) {
        return element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        return element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        return element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        return element.msRequestFullscreen();
      }
    }

    ExitFullscreen() {
      if (document.exitFullscreen) {
        return document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen();
      }
    }

  };
  return Util;
});
