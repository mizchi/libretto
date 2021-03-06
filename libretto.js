// Generated by CoffeeScript 1.7.1
(function() {
  var Libretto,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Libretto = (function() {
    Libretto.extend = function(obj) {
      var cls, key, val;
      cls = (function(_super) {
        __extends(_Class, _super);

        function _Class() {
          return _Class.__super__.constructor.apply(this, arguments);
        }

        return _Class;

      })(this);
      for (key in obj) {
        val = obj[key];
        cls.prototype[key] = val;
      }
      return cls;
    };

    Libretto.prototype.getNextStep = function(next) {
      if (next == null) {
        next = null;
      }
      if (this.steps instanceof Array) {
        if (next === '_pre_') {
          return this.steps[0];
        }
        if ((typeof next) === 'string') {
          if (this.steps instanceof Array) {
            if (this.steps.indexOf(next) >= 0) {
              return next;
            }
          }
          throw "Destination missing: " + next;
        } else {
          return this.steps[this.steps.indexOf(this.current) + 1];
        }
      } else if (this.steps instanceof Object) {
        if ((typeof next) === 'string') {
          if (next === '_pre_') {
            return 'start';
          }
          if (this.steps[this.current].length != null) {
            if (__indexOf.call(this.steps[this.current], next) >= 0) {
              return next;
            }
            throw "Can't go " + next + " from " + this.current;
          } else {
            return next;
          }
        } else {
          if (this.current === 'end') {
            return null;
          }
          if ((this.steps[this.current].length != null) && !((typeof this.steps[this.current]) === 'string')) {
            if (next == null) {
              throw "Must return in branch";
            }
          }
          if (!this.steps[this.current]) {
            throw 'error';
          }
          return this.steps[this.current];
        }
      }
    };

    function Libretto() {
      this.dispose = __bind(this.dispose, this);
      this.cancel = __bind(this.cancel, this);
      this.then = __bind(this.then, this);
      this.end = __bind(this.end, this);
      this.start = __bind(this.start, this);
      var context;
      context = {};
      this._promise = new Promise((function(_this) {
        return function(done) {
          var action;
          action = function(result) {
            _this.current = _this.getNextStep(result);
            if (!_this.current) {
              return done(context);
            }
            return Promise.resolve(_this[_this.current](context)).then(action);
          };
          return _this.ready = function() {
            action('_pre_');
            return this._promise;
          };
        };
      })(this));
    }

    Libretto.prototype.start = function() {};

    Libretto.prototype.end = function(context) {};

    Libretto.prototype.then = function(f) {
      return this._promise.then(f);
    };

    Libretto.prototype.cancel = function() {
      return Promise.reject(this._promise);
    };

    Libretto.prototype.dispose = function() {
      delete this._promise;
      return this.cancel();
    };

    return Libretto;

  })();

  if (typeof window !== "undefined" && window !== null) {
    window.Libretto = Libretto;
  } else if (typeof module !== "undefined" && module !== null) {
    module.exports = Libretto;
  }

}).call(this);
