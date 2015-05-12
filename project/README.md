# npm + bower + gems
<code>npm install && bower install</code><br>
<code>sudo gem install compass-rgbapng</code><br>
<code>sudo gem install breakpoint </code><br>

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
