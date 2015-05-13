
'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var WerkstattGenerator = yeoman.generators.NamedBase.extend({

  /*
    name            Path of View         ex. --name app/view/ui/MyView
  */

  init: function (name, partialUrl) {
    var nameParts = name.split("/");

    this.name = name;
    this.className = nameParts[nameParts.length-1];
    this.slugName = this._.slugify(this.className.replace(/([A-Z])/g, ' $1'))
    this.partialUrl = this.name.toLowerCase();

    console.log('You called the page subgenerator with the argument = ' + this.name + ' and partialUrl = ' + this.partialUrl);

  },

  files: function () {

    var cb = this.async();
    var coffeeUrl = "../src/coffee/app/view/page/"
    var partialBaseUrl = "../www/partial/page"
    var cssBaseUrl = "../src/sass/page/"

    this.copy('_partial.html', partialBaseUrl + "/" + this.slugName + '.html');
    this.copy('_page.coffee', coffeeUrl + this.name + '.coffee');
    this.copy('_style.scss', cssBaseUrl + "_" + this.name.toLowerCase() + '.scss');

    cb();

  }
});

module.exports = WerkstattGenerator;
