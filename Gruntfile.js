module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'package.json',
        'src/**/*.js'
      ]
    }
  });

  grunt.registerTask('default', ['jshint']);
};

