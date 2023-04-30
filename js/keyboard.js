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
    value: "",
    capsLock: false
  },

  launch() {
    // CREATE
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    // SETUP
    this.elements.main.classList.add("keyboard", "1keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    // ADD TO DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "~`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Del",
        "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "↑", "Shift",
        "Ctrl", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"
    ];
    // CREATE HTML FOR ICON
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach (key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ["Backspace", "Del", "Enter", "Shift"].indexOf(key) !== -1;
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key--large");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener ("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });
          break;

          case "Del":
            keyElement.classList.add("keyboard__key");
            keyElement.textContent = "del";

            keyElement.addEventListener ("click", () => {
              this.properties.value = this.properties.value.substring(0, this.properties.value.length + 1);
              this._triggerEvent("oninput");
            });
            break;

          case "Caps Lock":
            keyElement.classList.add("keyboard__key--large", "keyboard__key--pressed");
            keyElement.innerHTML = createIconHTML("keyboard_capslock");

            keyElement.addEventListener ("click", () => {
              this._toogleCapsLock();
              keyElement.classList.toogle("keyboard__key--active", this.properties.capsLock);
            });
            break;

            case "Enter":
              keyElement.classList.add("keyboard__key--large");
              keyElement.innerHTML = createIconHTML("keyboard_return");

              keyElement.addEventListener ("click", () => {
                this.properties.value += "\n";
                this._triggerEvent("oninput");
              });
              break;

              case "Tab":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("keyboard_tab");

                keyElement.addEventListener ("click", () => {
                  this.properties.value += "	";
                  this._triggerEvent("oninput");
                });
                break;

              case "Space":
                keyElement.classList.add("keyboard__key--extra-large");
                keyElement.innerHTML = createIconHTML("space_bar");

                keyElement.addEventListener("click", () => {
                  this.properties.value += " ";
                  this._triggerEvent("oninput");
                });
                break;

              default:
                keyElement.textContent = key.toLowerCase();

                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                    this._triggerEvent("oninput");
                });
                break;
      };

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
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

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.launch();
});