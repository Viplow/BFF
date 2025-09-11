class InfoCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'content', 'icon'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  attributeChangedCallback() {
    this.render();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const title = this.getAttribute('title') || '';
    const content = this.getAttribute('content') || '';
    const icon = this.getAttribute('icon') || '';
    this.shadowRoot.innerHTML = `
      <style>
        .info-card { background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 18px 20px; min-width: 180px; border-left: 4px solid #2196f3; margin-bottom: 1em; }
        .icon { font-size: 1.5em; margin-bottom: 8px; display: block; }
        .title { font-size: 1.1em; font-weight: bold; margin-bottom: 4px; }
        .content { color: #555; font-size: 0.98em; }
      </style>
      <div class="info-card">
        <span class="icon">${icon}</span>
        <div class="title">${title}</div>
        <div class="content">${content}</div>
      </div>
    `;
  }
}
customElements.define('info-card', InfoCard);
