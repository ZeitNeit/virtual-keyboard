const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false
  },

  launch() {

  },

  _createKeys() {

  },
  _triggerEvent (handlerName) {
    console.log("Event Triggered! Event name: " + handlerName);
  },

  _toogleCapsLock() {
    console.log("CapsLosk toogled!");
  },

  open(initialValue, oninput, onclose) {

  },

  close() {

  }
};