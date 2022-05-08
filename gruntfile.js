module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  const _ = require('underscore');
  const countriesJSON = grunt.file.readJSON("node_modules/country-region-data/data.json");
  const packageFile   = grunt.file.readJSON("package.json");


  function minifyJSON (json) {
    var js = [];

    json.forEach(function (countryData) {
      var pairs = [];
      countryData.regions.forEach(function (info) {
        if (_.has(info, 'shortCode')) {
          pairs.push(info.name + '~' + info.shortCode);
        } else {
          pairs.push(info.name);
        }
      });

      var regionListStr = pairs.join('|');
      js.push([
        countryData.countryName,
        countryData.countryShortCode,
        regionListStr
      ]);
    });

    return js;
  }


  grunt.initConfig({

    template: {

      includeData: {
        options: {
          data: { __DATA__: JSON.stringify(minifyJSON(countriesJSON)) }
        },
        files: {
          "source/source-data.js": ["source/template.source-data.js"]
        }
      }

      //customBuild: {
      //  options: {
      //    data: {
      //      __DATA__: ""  // populated dynamically
      //    }
      //  },
      //  files: {
      //    "dist/crs.js": ["source/source-crs.js"],
      //  }
      //}
    },

    babel: {
      dist: {
        files: {
          'dist/react-crs.js': 'source/react-crs.jsx'
        },
        options: {
          presets: ['react', 'es2015']
        }
      }
    },

    browserify: {
      test: {
        src: [
          './dist/react-crs.js',
          './test/index.jsx'
        ],
        dest: './test/build.js',
        options: {
          browserifyOptions: { debug: true },
          transform: [['babelify', { "presets": ['es2015', 'react'] }]]
        }
      }
    },

    // TODO this obviously shouldn't give the banner to the test file. There when I need it.... can probably do this in browserify command
    uglify: {
      test: {
        files: {
          'test/build.min.js': 'test/build.js'
        },
        options: {
          report: "min",
          compress: {},
          mangleProperties: true,
          banner: "/*!\n" +
          "* react-country-region-selector\n" +
          "* -----------------------------\n" +
          "* " + packageFile.version + "\n" +
          "* @author Ben Keen\n" +
          "* @repo https://github.com/benkeen/react-country-region-selector\n" +
          "* @licence MIT\n" +
          "*/\n"
        }
      }
    }

  });

  grunt.registerTask('default', ['template:includeData', 'babel:dist', 'browserify:test', 'uglify:test']);

};
