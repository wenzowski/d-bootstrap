require 'flour'

{spawn} = require 'child_process'

task 'test', ->
  launch 'mocha'

task 'watch', ->
  invoke 'test'
  ['dropdown/**', 'test/**'].map (glob) ->
    watch glob, -> invoke 'test'

launch = (cmd) ->
  app = spawn cmd
  app.stdout.pipe(process.stdout)
  app.stderr.pipe(process.stderr)
  app.on 'exit', (status) ->
    if status is not 0
      process.exit(status);

