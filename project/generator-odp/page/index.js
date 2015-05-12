'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ViewGenerator = yeoman.generators.NamedBase.extend({

  /*
    name            Path of View         ex. --name app/view/ui/MyView
    partialUrl      Path of Partial      ex. --partial layout

    If partialUrl is null will gonna create just a simple View.coffee file
  */

  init: function (name, partialUrl) {
    var nameParts = name.split("/");

    this.name = name;
    this.className = nameParts[nameParts.length-1];
    this.slugName = this._.slugify(this.className.replace(/([A-Z])/g, ' $1'))
    this.partialUrl = partialUrl;

    console.log('You called the page subgenerator with the argument = ' + this.name + ' and partialUrl = ' + this.partialUrl);

  },

  files: function () {

    var cb = this.async();
    var coffeeUrl = "../src/coffee/app/view/layout/page/"
    var partialBaseUrl = "../www/partial/page"

    this.copy('_partial.html', partialBaseUrl + "/" + this.slugName + '.html');
    this.copy('_page.coffee', coffeeUrl + this.name + '.coffee');

    cb();

  }
});

module.exports = ViewGenerator;
