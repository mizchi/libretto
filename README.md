# Libretto

`libretto.js` is controll flow manager with Promise.

## Examples

Sequencial flow

```coffee
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
```

State Machine

```coffee
Purchase = Libretto.extend
  steps:
    start: 'waitUserSelection'
    waitUserSelection: ['purchase', 'cancel']
    purchase: 'end'

  waitUserSelection: (context) =>
    context.itemName = 'apple'
    'purchase'

  purchase: (context) -> new Promise (done) =>
    done()

purchase = new Purchase
purchase.ready().then (context) => console.log 'purchase', context.itemName
```

`start`, `end`, and `cancell` are reserved.
