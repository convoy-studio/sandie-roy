define [], () ->

  "use strict"
  
  class Browser

      dataBrowser: [
        string: navigator.userAgent
        subString: "Chrome"
        identity: "Chrome"
      ,
        string: navigator.userAgent
        subString: "MSIE"
        identity: "Explorer"
      ,
        string: navigator.userAgent
        subString: "Firefox"
        identity: "Firefox"
      ,
        string: navigator.userAgent
        subString: "Safari"
        identity: "Safari"
      ,
        string: navigator.userAgent
        subString: "Opera"
        identity: "Opera"
      ]

      constructor: () ->

      init: =>
        @browser = @searchString(@dataBrowser) or "Other"
        @version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or "Unknown"
        if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            @type = "mobile"
            @isDesktop = false
        else
            @type = "desktop"
            @isDesktop = true
        return { browser:@browser, version:@version, type:@type, isDesktop:@isDesktop }

      searchString: (data) =>
        i = 0

        while i < data.length
          dataString = data[i].string
          @versionSearchString = data[i].subString
          return data[i].identity  unless dataString.indexOf(data[i].subString) is -1
          i++

      searchVersion: (dataString) =>
        index = dataString.indexOf(@versionSearchString)
        return  if index is -1
        parseFloat dataString.substring(index + @versionSearchString.length + 1)

  return Browser
