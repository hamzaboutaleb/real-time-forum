export function throttle(func, delay) {
  let last;
  return function () {
    const now = Date.now();
    if (!last || now - last >= delay) {
      func();
      last = now;
    }
  };
}
