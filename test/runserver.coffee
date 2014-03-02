app        = require('./server')
expressApp = require('derby-starter/lib/server').setup(app, {})
server     = require('http').createServer(expressApp)
port       = process.env.PORT || 2668
location   = "http://localhost:#{port}"

module.exports.port = port
module.exports.location = location

before (done) ->
  server.listen port, (err) ->
    throw err if err
    done()

after ->
  server.close()

