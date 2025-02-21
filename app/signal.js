let contextStack = [];
let scheduledSignals = new Set();
let isUpdateScheduled = false;

export class Signal {
  #value;
  #listeners;
  constructor(initlaValue) {
    this.#value = initlaValue;
    this.#listeners = new Set();
  }

  get value() {
    const effect = contextStack[contextStack.length - 1];
    if (effect) {
      this.#listeners.add(effect);
      effect.deps.add(this);
    }
    return this.#value;
  }

  set value(value) {
    this.#value = value;
    scheduleUpdate(this);
  }

  deleteListener(listener) {
    this.#listeners.delete(listener);
  }

  notifySubscribers() {
    [...this.#listeners].forEach((sub) => sub.execute());
  }
}

class Effect {
  constructor(fn) {
    this.fn = fn;
    this.deps = new Set();
    this.cleanup = null;
    this.disposed = false;
  }

  execute() {
    if (this.disposed) return;
    this.deps.forEach((signal) => signal.deleteListener(this));
    this.deps.clear();
    if (this.cleanup) this.cleanup();
    contextStack.push(this);
    try {
      this.cleanup = this.fn();
    } finally {
      contextStack.pop();
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.deps.forEach((signal) => signal.listeners.delete(this));
    this.deps.clear();
    if (this.cleanup) this.cleanup();
  }
}

function scheduleUpdate(signal) {
  scheduledSignals.add(signal);
  if (!isUpdateScheduled) {
    isUpdateScheduled = true;
    requestAnimationFrame(() => {
      scheduledSignals.forEach((signal) => signal.notifySubscribers());
      scheduledSignals.clear();
      isUpdateScheduled = false;
    });
  }
}

export function createSignal(value) {
  const signal = new Signal(value);
  return signal;
}

export function createEffect(fn) {
  const effect = new Effect(fn);
  effect.execute();
  return () => effect.dispose();
}
