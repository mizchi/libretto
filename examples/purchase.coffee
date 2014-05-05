Libretto = require '../libretto'

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
