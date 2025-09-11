class NotificationBanner extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'message'];
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
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    let color = '#2196f3';
    if (type === 'success') color = '#1a8917';
    if (type === 'error') color = '#e74c3c';
    this.shadowRoot.innerHTML = `
      <style>
        .banner { background: ${color}; color: #fff; padding: 12px 20px; border-radius: 6px; font-size: 1em; margin: 8px 0; box-shadow: 0 2px 8px #eee; }
      </style>
      <div class="banner">${message}</div>
    `;
  }
}
customElements.define('notification-banner', NotificationBanner);
