import '@testing-library/jest-dom';

// jsdom does not implement the Web Animations API; polyfill a no-op version
// so Svelte transition code doesn't throw. onfinish is deferred via
// queueMicrotask so Svelte can assign the callback after animate() returns.
if (typeof Element !== 'undefined') {
  Element.prototype.animate = function () {
    const anim = {
      cancel() {},
      finish() {},
      finished: Promise.resolve(),
      onfinish: null,
      currentTime: 0,
      playbackRate: 1,
      playState: 'finished',
    };
    queueMicrotask(() => anim.onfinish?.());
    return anim;
  };
}
