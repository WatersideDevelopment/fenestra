module.exports = {
  options: {
    browsers: ['last 2 version']
  },
  multiple_files: {
    expand: true,
    flatten: true,
    src: 'src/css/*.css',
    dest: 'src/css/prefixed/'
  }
}
