window.eventHub = {
  events: {},
  init() {

  },
  // 发布
  emit(eventName, data) {
    const callbacks = (this.events[eventName]) ? this.events[eventName] : [];
    callbacks.map((cb) => {
      cb.call(undefined, data);
    });
  },
  // 订阅
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    };
    this.events[eventName].push(callback);
  },
  off() {

  },
};
