// utils/eventEmitter.js
class MoodChange {
    constructor() {
      this.listeners = {};
    }
  
    on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  
    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach((listener) => {
          listener(data);
        });
      }
    }
  
    off(event, listenerToRemove) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(listener => listener !== listenerToRemove);
      }
    }
  }
  
  const moodChange = new MoodChange();
  export default moodChange;