class ProgressBar extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'max', 'label', 'color'];
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
    const value = parseInt(this.getAttribute('value') || '0', 10);
    const max = parseInt(this.getAttribute('max') || '100', 10);
    const label = this.getAttribute('label') || '';
    const color = this.getAttribute('color') || '#2196f3';
    const percent = Math.min(100, Math.round((value / max) * 100));
    this.shadowRoot.innerHTML = `
      <style>
        .progress-container { width: 100%; background: #eee; border-radius: 8px; padding: 8px; box-sizing: border-box; }
        .label { font-size: 0.98em; color: #555; margin-bottom: 4px; }
        .bar-bg { width: 100%; background: #ddd; border-radius: 6px; height: 18px; overflow: hidden; }
        .bar { height: 18px; background: ${color}; width: ${percent}%; transition: width 0.4s; border-radius: 6px; }
        .percent { font-size: 0.95em; color: #888; margin-left: 8px; }
      </style>
      <div class="progress-container">
        <div class="label">${label} <span class="percent">${percent}%</span></div>
        <div class="bar-bg">
          <div class="bar"></div>
        </div>
      </div>
    `;
    this.shadowRoot.querySelector('.bar').style.width = percent + '%';
  }
}
customElements.define('progress-bar', ProgressBar);
