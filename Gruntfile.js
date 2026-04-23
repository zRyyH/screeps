require('dotenv').config();

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    shell: {
      build: {
        command: 'npx tsc',
      },
    },
    screeps: {
      options: {
        email: process.env.SCREEPS_EMAIL,
        token: process.env.SCREEPS_TOKEN,
        branch: process.env.SCREEPS_BRANCH || 'default',
      },
      dist: {
        src: ['dist/*.js'],
      },
    },
  });

  grunt.registerTask('deploy', ['shell:build', 'screeps']);
};
