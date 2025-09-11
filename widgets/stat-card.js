class StatCard extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'icon', 'color'];
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
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '';
    const icon = this.getAttribute('icon') || '';
    const color = this.getAttribute('color') || '#2196f3';
    this.shadowRoot.innerHTML = `
      <style>
        .stat-card { background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #eee; padding: 18px 24px; min-width: 120px; text-align: center; border-top: 4px solid ${color}; }
        .icon { font-size: 2em; margin-bottom: 8px; display: block; }
        .value { font-size: 1.3em; font-weight: bold; margin-bottom: 4px; }
        .label { color: #888; font-size: 0.98em; }
      </style>
      <div class="stat-card">
        <span class="icon">${icon}</span>
        <div class="value">${value}</div>
        <div class="label">${label}</div>
      </div>
    `;
  }
}
customElements.define('stat-card', StatCard);
