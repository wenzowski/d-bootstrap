var gulp = require('gulp')
var batch = require('gulp-batch')

var port = process.env.PORT || 8888
var server = null

gulp.task('default', function () {
  gulp.start('watch')
})

gulp.task('watch', function () {
  gulp.start('mocha-phantomjs')
  gulp.watch(['{dropdown,modal,tabs}/*', 'test/**/*']
            , {read: false}
            , batch(function (events, done) {
                gulp.start('mocha-phantomjs', done)
              })
            )
  gulp.watch(['package.json']
            , {read: false}
            , batch(function (events, done) {
                gulp.start('npm', done)
              })
            )
})

gulp.task('npm', function (done) {
  var serving = !!server
  if (serving) {
    server.kill('SIGINT')
    server = null
  }
  var npm = require('child_process').spawn('npm', ['i'], {stdio: 'inherit'})
  npm.on('close', function (code, signal) {
    if (serving) gulp.start('serve')
    done()
  })
})

gulp.task('test', ['mocha-phantomjs'], function () {
  process.emit('exit') // hackish
})

gulp.task('mocha-phantomjs', ['serve', 'path'], function (done) {
  var url = 'http://localhost:' + port + '/mocha'

  require('child_process')
    .spawn('mocha-phantomjs', [url], { stdio: [0, process.stdout, process.stderr] })
    .on('close', function (code, signal) {
      if (signal) console.warn('terminated `mocha-phantomjs` due to %s', signal)
      if (code) gulp.code = code
      done()
    })
})

gulp.task('serve', function (done) {
  if (server) return done()
  var serving = false
  server = require('child_process').fork('server', [], {silent: true})
  server.stderr.pipe(process.stderr)
  server.stdout.on('data', function (data) {
    process.stderr.write(data)
    if (/listening/.test(data) && serving === false) {
      serving = true
      done()
    }
  })
  setTimeout(function () {
    if (serving === false) {
      console.warn('Failed to start server')
      done()
    }
  }, 5000)
})

gulp.task('path', function () {
  var bin = './node_modules/.bin'
  var path = process.env.PATH.split(':')
  if (path.indexOf(bin) === -1)
    path.unshift(bin)
    process.env.PATH = path.join(':')
})

// This task should to be entirely rewritten in gulp
gulp.task('sauce', ['serve', 'path', 'mocha-phantomjs'], function (done) {
  require('child_process')
    .spawn('node', ['test/sauce.js'], { stdio: [0, 1, 2] })
    .on('close', function (code, signal) {
      if (code) gulp.code = code
      done()
    })
})

gulp.task('ci', ['sauce'], function () {
  process.emit('exit') // hackish
})

gulp.on('end', function () {
  process.emit('exit')
})

process.on('exit', function () {
  process.nextTick(function () {
    process.exit(gulp.code)
  })
})

