module.exports = {
  options: {
    livereload: true
  },
  scripts: {
    files: ['src/js/game/*.js', 'src/js/game/data/*.js', 'src/js/*.js'],
    tasks: ['jshint', 'concat', 'uglify'],
    options: {
      spawn: false
    }
  },
  scss: {
    files: ['src/scss/*.scss'],
    tasks: ['sass'],
    options: {
      spawn: false
    }
  },
  css: {
    files: ['src/css/*.css'],
    tasks: ['autoprefixer', 'cssmin'],
    options: {
        spawn: false
    }
  },
  images: {
    files: ['src/images/**/*.{png,jpg,gif}', 'src/images/*.{png,jpg,gif}'],
    tasks: ['imagemin'],
    options: {
      spawn: false
    }
  },
  html:{
    files: ['src/html/*.html'],
    tasks: ['copy'],
    options: {
      spawn: false
    }
  }
}
