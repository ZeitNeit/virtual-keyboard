import KEY_CODES from "./keys.js";

const keyLayout = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Delete",
  "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter",
  "Shift.", "z", "x", "c", "v", "b", "n", "m", ",", ".", "↑", "Shift",
  "Control", "Alt", "Space", "Alt", "Control", "←", "↓", "→"
];

let keyElement

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
    document.querySelectorAll(".keyboard__key").forEach (element => {
      element.addEventListener("keydown", (event) => {
        if (element.textContent === event.key) {
        element.classList.add("active");
        }
      })
    })
    document.addEventListener("keydown", (e) => {
      let keys = document.querySelectorAll(".keyboard__key");
      keys.forEach((key, index) => {
        if (e.key === keyLayout[index] || key.textContent === e.key.toUpperCase()) {
        key.classList.add("active")
        if (e.key === "CapsLock") {
          key.toggle("keyboard__key--active")
        }
      }
    })
    })
    document.addEventListener("keyup", (e) => {
      let keys = document.querySelectorAll(".keyboard__key");
      keys.forEach((key, index) => {
        if (e.key === keyLayout[index] || key.textContent === e.key.toUpperCase()) {
        key.classList.remove("active")
        if (e.key === "CapsLock") {
          key.classList.toggle("keyboard__key--active")
        }
      }
    })
    })


  },

  _createKeys() {
    const fragment = document.createDocumentFragment();


    // CREATE HTML FOR ICON
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach (key => {
      keyElement = document.createElement('button');
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

          case "Delete":
            keyElement.classList.add("keyboard__key");
            keyElement.textContent = "delete";

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

          case "CapsLock":
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

            // keyElement.addEventListener('keydown', (event) => {
            //   if (key == event.key) {
            //     this._triggerEvent("oninput");
            //   }
            // })

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

  // getKeyPressed(keyCode) {
  //   let keyPressed;
  //   for (let i = 0; i < keyLayout.length; i++) {
  //     if (keyCode === KEY_CODES[i].value[0]){
  //       keyPressed = String.fromCharCode(keyCode);
  //     }
  //   return keyPressed;
  // }
  // }
}

// document.onkeydown = (event) => {
//   for (let i = 0; i < keyLayout.length; i++) {
//   if (event.key === keyLayout[i]) {
//   keyElement.classList.add("active")
//   }
//   }
// }

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.launch();
});