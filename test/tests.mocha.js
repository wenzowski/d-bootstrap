describe('app', function () {
  before(function (done) {
    when('app', done)
  })

  before(function (done) {
    when('model', done)
  })

  it('is ready', function () {
    expect(window.app).to.not.be(undefined)
    expect(window.model).to.not.be(undefined)
  })
})

function when(global, done) {
  window[global] ? done() : setTimeout(
    when.bind(this, global, done), 1
  )
}
