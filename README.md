# NODE 6 required!
# npm + bower
<code>npm install && bower install</code><br>

# bundle gems
<code>gem install bundler</code><br>
<code>bundle install</code><br>
<code>git add Gemfile Gemfile.lock</code><br>

# yeoman
You should be inside folder {projectroot}/generator-seatgen<br>

- Generate a timeview with partial<br>
  <code>
  yo seatgen:timeview --name app/view/layout/FooterTest --partial layout
  </code>

- Generate a view with partial<br>
  <code>
  yo seatgen:view --name app/view/layout/FooterTest --partial layout
  </code>

- Generate a class with partial<br>
  <code>
  yo seatgen:class app/controller/InitialLoadController
  </code>

- Create a subgenerator<br>
  <code>yo generator:subgenerator timeview</code>

# python
  The python files updateMain.py and updateLoadFiles.py generates filepaths automatically when 
  grunt-watch toggle and updates the files Main.coffee and InitialLoadController.coffee respectively.

# SVG
Tutorial from http://codyhouse.co/gem/animate-svg-icons-with-css-and-snap/<br>
- Clean the svg as the tutorial<br>
- Add it to www/svg<br>
- Pass it to the scope and inject it in you HTML with mustache <br>
`<span class="name-btn svg-btn">{{{lineArrowBtn}}}</span>`<br>
- And style it in the _ui.scss



