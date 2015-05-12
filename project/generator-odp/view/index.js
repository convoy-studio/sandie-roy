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

    if(this.partialUrl == undefined) {
      console.log('You called the view subgenerator with the argument = ' + this.name);
      console.log('To initialise it: ' + this._.slugify(this.className) + ' = new ' + this.className + '()');
    } else {
      console.log('You called the view subgenerator with the argument = ' + this.name + ' and partialUrl = ' + this.partialUrl);
      console.log('To initialise it: ' + this._.slugify(this.className) + ' = new ' + this.className + '("'+this.slugName+'", {})');
    }

  },

  files: function () {

    var cb = this.async();
    var coffeeUrl = "../src/coffee/"
    var partialBaseUrl = "../www/partial/"

    if(this.partialUrl == undefined) {
    } else {
      this.copy('_partial.html', partialBaseUrl + this.partialUrl + "/" + this.slugName + '.html');
    }

    this.copy('_view.coffee', coffeeUrl + this.name + '.coffee');

    cb();

  }
});

module.exports = ViewGenerator;
