export class Drawer extends HTMLElement {
  set opened(value) {
    if (value) {
      this.setAttribute("opened", true);
    } else {
      this.removeAttribute("opened");
    }
  }

  get opened() {
    this.hasAttribute("opened");
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `:host { display: block; }`;
    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.appendChild(slot);
  }

  connectedCallback() {
    this.addEventListener("toggle", this.handleToggle.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("toggle", this.handleToggle.bind(this));
  }

  handleToggle({ detail }) {
    console.log(detail);
    this.opened = detail.isToggledOn;
  }
}

customElements.define("dmr-drawer", Drawer);
