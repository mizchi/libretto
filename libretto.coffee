class Libretto
  @extend: (obj) ->
    cls = class extends @
    for key, val of obj
      cls::[key] = val
    cls

  getNextStep: (next = null) ->
    if (@steps instanceof Array)
      if next is '_pre_'
        return @steps[0]
      if (typeof next) is 'string'
        if (@steps instanceof Array)
          if @steps.indexOf(next) >= 0
            return next
        throw "Destination missing: #{next}"
      else
        return @steps[@steps.indexOf(@current) + 1]

    else if (@steps instanceof Object)
      if (typeof next) is 'string'
        return 'start' if next is '_pre_'
        if @steps[@current].length?
          return next if next in @steps[@current]
          throw "Can't go #{next} from #{@current}"
        else
          return next
      else
        return null if @current is 'end'
        if @steps[@current].length? and not ((typeof @steps[@current]) is 'string')
          throw "Must return in branch" unless next?
        unless @steps[@current]
          throw 'error'
        @steps[@current]

  constructor: () ->
    context = {}
    @_promise = new Promise (done) =>
      action = (result) =>
        @current = @getNextStep(result)
        return done(context) unless @current
        return Promise.resolve(@[@current](context)).then action
      @ready = ->
        action '_pre_'
        return @_promise

  start: =>

  end: (context) =>

  then: (f) =>
    @_promise.then(f)

  cancel: =>
    Promise.reject(@_promise)

  dispose: =>
    delete @_promise
    @cancel()

if window?
  window.Libretto = Libretto
else if module?
  module.exports = Libretto
