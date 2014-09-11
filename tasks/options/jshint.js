module.exports = {

    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: ['<%= yeoman.app %>/scripts/vendor/*.js']
    },

    all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        'test/spec/**/*.js',
        'test/views/**/*.js',
        'test/models/**/*.js',
        'test/collections/**/*.js'
    ]
};
