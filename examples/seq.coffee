Libretto = require '../libretto'
Seq = Libretto.extend
  steps: ['a', 'b', 'c']
  a: ->
    console.log 'a'

  b: -> new Promise (done) =>
    setTimeout =>
      console.log 'b'
      done()
    , 100
  c: ->
    console.log 'c'

seq = new Seq
seq.ready().then => console.log 'seq done'
