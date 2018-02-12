define([], function() {
  "use strict";
  var Browser;
  Browser = (function() {
    class Browser {
      constructor() {
        this.init = this.init.bind(this);
        this.searchString = this.searchString.bind(this);
        this.searchVersion = this.searchVersion.bind(this);
      }

      init() {
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
      }

      searchString(data) {
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
      }

      searchVersion(dataString) {
        var index;
        index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
          return;
        }
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      }

    };

    Browser.prototype.dataBrowser = [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
      },
      {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
      }
    ];

    return Browser;

  }).call(this);
  return Browser;
});
