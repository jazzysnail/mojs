var Tweener, h, t;

require('../polyfills/raf');

h = require('../h');

Tweener = (function() {
  function Tweener() {
    this.vars();
    this;
  }

  Tweener.prototype.vars = function() {
    this.tweens = [];
    return this.loop = h.bind(this.loop, this);
  };

  Tweener.prototype.loop = function() {
    var time;
    if (!this.isRunning) {
      return;
    }
    time = Date.now();
    this.update(time);
    if (!this.tweens.length) {
      return this.isRunning = false;
    }
    requestAnimationFrame(this.loop);
    return this;
  };

  Tweener.prototype.startLoop = function() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    return requestAnimationFrame(this.loop);
  };

  Tweener.prototype.stopLoop = function() {
    return this.isRunning = false;
  };

  Tweener.prototype.update = function(time) {
    var i, _results;
    i = this.tweens.length;
    _results = [];
    while (i--) {
      if (this.tweens[i].update(time) === true) {
        _results.push(this.remove(i));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Tweener.prototype.add = function(tween) {
    this.tweens.push(tween);
    return this.startLoop();
  };

  Tweener.prototype.removeAll = function() {
    return this.tweens.length = 0;
  };

  Tweener.prototype.remove = function(tween) {
    var index;
    index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);
    if (index !== -1) {
      return this.tweens.splice(index, 1);
    }
  };

  return Tweener;

})();

t = new Tweener;


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("tweener", [], function() {
    return t;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = t;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.tweener = t;
}