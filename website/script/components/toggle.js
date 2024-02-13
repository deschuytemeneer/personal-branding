export class Toggle extends HTMLElement {
  #isToggled = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
        :host {
          display: block;
          cursor: default;
        }
      `;
    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    this.mapStateToAttributes();
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick.bind(this));
  }

  mapStateToAttributes() {
    if (this.#isToggled) {
      this.setAttribute("toggled-on", true);
      this.removeAttribute("toggled-off");
    } else {
      this.setAttribute("toggled-off", true);
      this.removeAttribute("toggled-on");
    }
  }

  handleClick() {
    this.#isToggled = !this.#isToggled;
    this.mapStateToAttributes();

    this.dispatchEvent(
      new CustomEvent("toggle", { bubbles: true, detail: { isToggledOn: this.#isToggled } })
    );
  }
}

customElements.define("dmr-toggle", Toggle);
