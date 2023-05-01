const specialKeys = [
  {keyCode:192,keyName:"`"},
  {keyCode:9,keyName:"tab"},
  {keyCode:20,keyName:"caps lock"},
  {keyCode:16,keyName:"shift"},
  {keyCode:8,keyName:"delete"},
  {keyCode:13,keyName:"return"},
];

const Keyboard = {
  elements: {
    workArea: null,
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
    this.elements.workArea = document.createElement("textarea");
    // SETUP
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__keys");
    this.elements.workArea.classList.add("work-area")
    // ADD TO DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.workArea);
    document.body.appendChild(this.elements.main);
    // BINDING OF KEYBOARD TO TEXTAREA
    document.querySelectorAll(".work-area").forEach (element =>{
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        })
      })
    })
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "~`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Del",
        "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
        "Shift.", "z", "x", "c", "v", "b", "n", "m", ",", ".", "↑", "Shift",
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
              let ta = document.querySelector('.work-area');
              let start = ta.selectionStart;
              let end = ta.selectionEnd;
              if (start === end) {
                  ta.value = ta.value.substring(0, start) + ta.value.substring(end + 1, ta.value.length);
                  ta.selectionStart = start;
                  ta.selectionEnd = end;
              }
              else {
                  ta.value = ta.value.substring(0, start) + ta.value.substring(end, ta.value.length);
                  ta.selectionStart = start;
                  ta.selectionEnd = start;
              }
              ta.focus();
            });
            break;

          case "Caps Lock":
            keyElement.classList.add("keyboard__key--large", "keyboard__key--pressed");
            keyElement.innerHTML = createIconHTML("keyboard_capslock");

            keyElement.addEventListener ("click", () => {
              this._toggleCapsLock();
              keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
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
              this.properties.value += "\t";
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
      }

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  _triggerEvent (handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

  close() {
  },

  getKeyPressed(keyCode) {
    let keyPressed;
    for (let i = 0; i < specialKeys.length; i++) {
      if (specialKeys[i].keyCode === keyCode) {
        keyPressed = specialKeys[i].keyName.toUpperCase();
        break;
      }
      else {
        keyPressed = String.fromCharCode(keyCode);
      }
    }
    return keyPressed;
  }
};


window.addEventListener("DOMContentLoaded", function() {
  Keyboard.launch();
});