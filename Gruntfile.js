module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'zryyh.br@mail.com',
                token: '1a704924-9df4-4120-a1b2-5e6939a6710c',
                branch: 'default'
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}