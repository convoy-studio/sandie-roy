'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ClassGenerator = yeoman.generators.NamedBase.extend({
  init: function (name) {
    var nameParts = name.split("/");
    this.name = name;
    this.className = nameParts[nameParts.length-1];
    this.slugName = this._.slugify(this.className.replace(/([A-Z])/g, ' $1'))

    console.log('You called the view subgenerator with the argument = ' + this.name);
    console.log('To initialise it: ' + this._.slugify(this.className) + ' = new ' + this.className + '()');
  },

  files: function () {
    var coffeeUrl = "../src/coffee/"

    this.copy('_class.coffee', coffeeUrl + this.name + '.coffee');
  }
});

module.exports = ClassGenerator;
