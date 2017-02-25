# Html

参考文档:

- [CodePen Example](http://codepen.io/sol0mka/pen/b8831849500f0d5cd0ab5691ebe17873?editors=0010)
- [Tween API](./tweens/tween.md)
- [back](./readme.md)

目录:

  - [完整的API参考](#full-api-reference)
  - [Other CSS properties](#other-css-properties)
  - [Teach mojs with customProperties](#teach-mojs-with-customproperties)
  - [Independent deltas](#independent-deltas)

### 完整的API参考:

模块包含了 `transforms/opacity` (`x`、 `y`、`opacity` 等。) 上面所列出的一些预定义属性。浏览器可以很轻松的处理这些预定义动画属性，所以在理想情况下，您可以不需要使用预设集合以外的属性来完成所有的工作。
```javascript
const html = new mojs.Html({
  // HTML元素 {String, Object} [selector, HTMLElement]
  el:           null,
  // ∆ :: translateX 属性. {String, Number, Object} [value, delta]
  x:          0,
  // ∆ :: translateY 属性. {String, Number, Object} [value, delta]
  y:          0,
  // ∆ :: translateZ 属性. {String, Number, Object} [value, delta]
  z:          0,
  // ∆ :: skewX 属性. {String, Number, Object} [value, delta]
  skewX:      0,
  // ∆ :: skewY 属性. {String, Number, Object} [value, delta]
  skewY:      0,
  // ∆ :: X轴-旋转 属性. {String, Number, Object} [value, delta]
  angleX:     0,
  // ∆ :: Y轴-旋转 属性. {String, Number, Object} [value, delta]
  angleY:     0,
  // ∆ :: Z轴-旋转 属性. {String, Number, Object} [value, delta]
  angleZ:     0,
  // ∆ :: 比例 属性. {String, Number, Object} [value, delta]
  scale:      1,
  // ∆ :: 横向-比例 属性. {String, Number, Object} [value, delta]
  scaleX:     1,
  // ∆ :: 纵向-比例 属性. {String, Number, Object} [value, delta]
  scaleY:     1,
  // ∆ :: 不透明度 属性. {String, Number, Object} [value, delta]
  opacity:    1,
  
  /*
    关于其他的CSS属性请查阅`其它CSS属性`部分。
  */

  // Custom properties to alter mojs behaviour (see `Teach mojs with customProperties` section). {Object}
  customProperties: null,
  // If should be shown before animation starts. {Boolean}
  isShowStart:      true,
  // If should stay shown after animation ends. {Boolean}
  isShowEnd:        true,
  // If refresh state on subsequent plays. {Boolean}
  isShowStart:      true,
  // If should trigger composite layer for the module. {Boolean}
  isForce3d:        false,
  // If should hide module with `transforms` instead of `display`. {Boolean}
  isSoftHide:       true,
  // If refresh state on subsequent plays. {Boolean}
  isRefreshState:   true,
  // Context callbacks will be called with. {Object}
  callbacksContext: this

  /* TWEEN PROPERTIES */
  // Duration {Number}
  duration:       350,
  // Delay {Number}
  delay:          0,
  // If should repeat after animation finished {Number} *(1)
  repeat:         0,
  // Speed of the tween {Number}[0..∞]
  speed:          1,
  // If the progress should be flipped on repeat animation end {Boolean}
  yoyo:           false,
  // Easing function {String, Function}[ easing name, path coordinates, bezier string, easing function ]
  easing:         'sin.out',
  // Easing function for backward direction of the tween animation (fallbacks to `easing`) {String, Function}[ easing name, path coordinates, bezier string, easing function ]
  backwardEasing: null,
  // properties fro entire timeline
  timeline: {
   /* (+) TIMELINE PROPERTIES AND CALLBACKS - see Tween API */ 
  },

  /* TWEEN CALLBACKS */
  /*
    Fires on every update of the tween in any period (including delay periods). You probably want to use `onUpdate` method instead.
    @param p {Number} Normal (not eased) progress.
    @param isForward {Boolean} Direction of the progress.
    @param isYoyo {Boolean} If in `yoyo` period.
  */
  onProgress (p, isForward, isYoyo) {},
  /*
    Fires when tween's the entire progress reaches `0` point(doesn't fire in repeat periods).
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onStart (isForward, isYoyo) {},
  /*
    Fires when tween's the progress reaches `0` point in normal or repeat period.
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onFirstUpdate (isForward, isYoyo) {},
  /*
    Fires on first update of the tween in sufficiently active period (excluding delay periods).
    @param ep {Number} Eased progress.
    @param p {Number} Normal (not eased) progress.
    @param isForward {Boolean} Direction of the progress.
    @param isYoyo {Boolean} If in `yoyo` period.
  */
  onUpdate (ep, p, isForward, isYoyo) {},
  /*
    Fires when tween's the progress reaches `1` point in normal or repeat period.
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onRepeatComplete (isForward, isYoyo) {},
  /*
    Fires when tween's the entire progress reaches `1` point(doesn't fire in repeat periods).
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onComplete (isForward, isYoyo) {},
  /* Fires when the `.play` method called and tween isn't in play state yet. */
  onPlaybackStart () {},
  /* Fires when the `.pause` method called and tween isn't in pause state yet. */
  onPlaybackPause () {},
  /* Fires when the `.stop` method called and tween isn't in stop state yet. */
  onPlaybackStop () {},
  /* Fires when the tween end's animation (regardless progress) */
  onPlaybackComplete () {},

})
  /*
    Creates next state transition chain.
    @param options {Object} Next shape state.
  */
  .then({ /* next state options */ })

  /*
    Starts playback.
    @param shift {Number} Start progress shift in milliseconds.
  */
  .play( shift = 0 )
  /*
    Starts playback in backward direction.
    @param shift {Number} Start progress shift in milliseconds.
  */
  .playBackward( shift = 0 )
  /*
    Resumes playback in direction it was prior to `pause`.
    @param shift {Number} Start progress shift in milliseconds.
  */
  .resume( shift = 0 )
  /*
    Pauses playback.
  */
  .pause()
  /*
    Stops playback.
    @param {Number} Progress to set after the stop [0...1].
  */
  .stop( progress = 0 )
  /*
    Restarts playback.
    @param shift {Number} Start progress shift in milliseconds.
  */
  .replay( shift = 0 )
  /*
    Restarts playback in backward direction.
    @param shift {Number} Start progress shift in milliseconds.
  */
  .replayBackward( shift = 0 )
  /*
    Sets progress of the tween.
    @param progress {Number} Progress to set [ 0..1 ].
  */
  .setProgress( progress )
  /*
    Sets speed of the tween.
    @param speed {Number} Progress to set [ 0..∞ ].
  */
  .setSpeed ( speed )

  /* Stops and resets the tween. */
  .reset ( speed )

```

### Other CSS properties

Other `CSS` properties would be inferred automatically, please set them in `camelCase`:

```javascript
const html = new mojs.Html({
  el: '#js-el',
  borderColor: { 'cyan': '#FA3204' },
  borderWidth: { 2: 12 }
});
```

- [CodePen Example](http://codepen.io/sol0mka/pen/14bcdfac6a89b918ac0292b35c0f156e?editors=0010)

### Teach mojs with customProperties

If property doesn't work as expected you can teach `mojs` with a `customProperties` definition:

```javascript
const html = new mojs.Html({
  el: '#js-el',
  customProperties: {
    originY: 50,
    anotherCustomProp: 0,
    draw (el, props) {
      el.style['transformOrigin'] = `50% ${props.originY}%`;
    }
  }
});
```

`customProperties` object should have
  - list of custom properties names with their `default` value (`originY: 50, anotherCustomProp: 0`).
  - `draw` function that will be responsible for rendering that custom properties. It will be called on each animation frame and will be provided with `el` and `props` object that contain current states for all custom properties (`props.originY, props.anotherCustomProp`). Feel free to apply that state to the `el` any way that works for you.

All custom properties are expected to be plain `numbers`, you can define `units` in the `draw` function.

- [CodePen Example](http://codepen.io/sol0mka/pen/08ed252eed451c270e49882b08cbbd41?editors=0010)

### Independent deltas

All `delta` values of the `Html` module could have entire set of `Tween` properties and can be animated individually:

```javascript
const html = new mojs.Html({
  el: '#js-el',
  x: { 200: 0, delay: 200, duration: 2000, easing: 'cubic.in' },
  y: { 0: 200, duration: 2000, easing: 'cubic.out', onComplete () { /* ... */ } }
});
```

This makes `mojs` animations ultimately flexible.

- [CodePen Example](http://codepen.io/sol0mka/pen/087649b78e2d8aa407fb73051d7770ec?editors=0010)

References:

- [Tween API](./tweens/tween.md)
- [back](./readme.md)
