module.exports = {
  dist: {
    options: {
      // cssmin will minify later
      style: 'expanded'
    },
    files: {
      'src/css/fenestra.css': 'src/scss/fenestra.scss'
    }
  }
}
