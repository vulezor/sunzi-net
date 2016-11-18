module.exports = function(grunt) {
    let bootstrap = 'node_modules'
grunt.initConfig({
  cssmin: {
    my_target: {
      files:{
          'public/assets/css/all.css': [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'src/css/styles.css',
            'bower_components/angular-ui-tree/dist/angular-ui-tree.min.css'
            ]
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.registerTask('css_min',['cssmin']);
}; 