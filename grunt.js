/*global module:false*/
module.exports = function(grunt) {
  var helpers = require('./cli/helpers')
  
  // set working dir to closest .urza dir
  var workingDir = helpers.getAppRoot()
  
  // load up require plugin
  grunt.loadNpmTasks('grunt-requirejs');
  
  // Project configuration.
  var gruntConfig = {
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      lib: ['*.js','lib/**/*.js','test/**/*.js'],
      client : ['client/js/external/app.js','client/js/lib/**/*.js']
    },
    jshint: {
      options: {
        // Note: these appear to be completely overridden, not overloaded.
        curly: false,
        eqeqeq: false,
        forin: false,
        indent: 2,
        immed: true,
        latedef: true,
        newcap: true,
        nonew: true,
        regexp : true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        trailing: true,
        laxcomma: true
      },
      globals: {
        emit : true
      },
      lib : {
        options : {
          onecase : true,
          asi: true,
          loopfunc: true,
          node:true
        }
      },
      client : {
        options : {
          asi:true,
          loopfunc: true,
          boss: true,
          browser:true
        }
      }
    },
    requirejs : {
      // TODO: link up lib/views to generated view file.
      appDir : workingDir + "/client",
      baseUrl : "js",
      dir : workingDir + "/public",
      optimize : "uglify",
      preserveLicenseComments: false,
      paths : {
        "jquery" : workingDir + "/node_modules/urza/client/js/vendor/require-jquery-min",
        "external/app" : workingDir + "/node_modules/urza/client/js/external/app",
        "lib/router" : workingDir + "/node_modules/urza/client/js/lib/router",
        "lib/view" : workingDir + "/node_modules/urza/client/js/lib/view",
        "vendor/require-backbone" : workingDir + "/node_modules/urza/client/js/vendor/require-backbone"
      },
      modules : [
        {
          name : "client",
          exclude: ['jquery']
        }
      ]
    }
  }
  
  grunt.initConfig(gruntConfig);

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('build', 'lint requirejs')
};