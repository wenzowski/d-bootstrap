var gulp = require('gulp')
var batch = require('gulp-batch')

var port = process.env.PORT || 8888

gulp.task('default', function () {
  gulp.start('watch')
})

gulp.task('watch', function () {
  gulp.start('mocha-phantomjs')
  gulp.watch(['{dropdown,modal,tabs}/*', 'test/**/*']
    , batch(function (events, done) {
      gulp.start('mocha-phantomjs', done)
    })
  )
})

gulp.task('test', ['mocha-phantomjs'], function () {
  process.emit('exit') // hackish
})

gulp.task('mocha-phantomjs', ['serve', 'path'], function (done) {
  var url = 'http://localhost:' + port + '/mocha'

  require('child_process')
    .spawn('mocha-phantomjs', [url], { stdio: [0, process.stdout, process.stderr] })
    .on('close', function (code, signal) {
      if (signal) console.warn('terminated `npm test` due to %s', signal)
      if (code) gulp.code = code
      done()
    })
})

gulp.serving = false
gulp.task('serve', function (done) {
  if (gulp.serving === true) {
    done()
  } else {
    gulp.serving = true
    var app = require('./test/app')
    var opts = { port: port, static: __dirname }
    return require('derby-starter').run(app, opts, function (err) {
      done(err)
    })
  }
})

gulp.task('path', function () {
  var bin = './node_modules/.bin'
  var path = process.env.PATH.split(':')
  if (path.indexOf(bin) === -1)
    path.unshift(bin)
    process.env.PATH = path.join(':')
})

gulp.on('end', function () {
  process.emit('exit')
})

process.on('exit', function () {
  process.nextTick(function () {
    process.exit(gulp.code)
  })
})

