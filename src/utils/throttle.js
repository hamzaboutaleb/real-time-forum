export function throttle(func, delay) {
  let last;
  return function (...args) {
    const now = Date.now();
    if (!last || now - last >= delay) {
      func(...args);
      last = now;
    }
  };
}
