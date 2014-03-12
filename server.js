var gulp  = require('gulp')
var batch = require('gulp-batch')
var port  = process.env.PORT
var app   = require('./test/app')

app.on('loadViews', function (files, filename, options) {
  gulp.watch( files
            , {read: false}
            , batch(function (events, done) {
                app.reloadViews(filename, options)
                done()
              })
            )
})
app.on('loadStyles', function (files, filename, options) {
  gulp.watch( files
            , {read: false}
            , batch(function (events, done) {
                app.reloadStyles(filename, options)
                done()
              })
            )
})
app.on('bundle', function (files) {
  gulp.watch( files
            , {read: false}
            , batch(function (events, done) {
                app.reload()
                done()
              })
            )
})

app.use(require('./'))
app.loadViews(__dirname + '/test/app')

var opts = { port   : port
           , static : __dirname
           }

require('derby-starter').run(app, opts)

