var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var Browser;
  Browser = (function() {
    Browser.prototype.dataBrowser = [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
      }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      }, {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
      }, {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
      }
    ];

    function Browser() {
      this.searchVersion = __bind(this.searchVersion, this);
      this.searchString = __bind(this.searchString, this);
      this.init = __bind(this.init, this);
    }

    Browser.prototype.init = function() {
      this.browser = this.searchString(this.dataBrowser) || "Other";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.type = "mobile";
        this.isDesktop = false;
      } else {
        this.type = "desktop";
        this.isDesktop = true;
      }
      return {
        browser: this.browser,
        version: this.version,
        type: this.type,
        isDesktop: this.isDesktop
      };
    };

    Browser.prototype.searchString = function(data) {
      var dataString, i;
      i = 0;
      while (i < data.length) {
        dataString = data[i].string;
        this.versionSearchString = data[i].subString;
        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
        i++;
      }
    };

    Browser.prototype.searchVersion = function(dataString) {
      var index;
      index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    };

    return Browser;

  })();
  return Browser;
});
