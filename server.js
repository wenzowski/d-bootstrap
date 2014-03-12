var gulp  = require('gulp')
var batch = require('gulp-batch')
var port  = process.env.PORT
var app   = require('./test/app')

var opts  = { port   : port
            , static : __dirname
            }

require('derby-starter').run(app, opts)

