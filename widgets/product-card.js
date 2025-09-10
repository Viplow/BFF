class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'image', 'price'];
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
    const subtitle = this.getAttribute('subtitle') || '';
    const image = this.getAttribute('image') || '';
    const price = this.getAttribute('price') || '';
    this.shadowRoot.innerHTML = `
      <style>
        .card { border:1px solid #ddd; border-radius:8px; padding:16px; max-width:260px; font-family:sans-serif; box-shadow:0 2px 8px #eee; }
        .img { width:100px; height:100px; object-fit:contain; display:block; margin:0 auto 12px; }
        .title { font-size:1.1em; font-weight:bold; margin-bottom:4px; }
        .subtitle { color:#888; font-size:0.95em; margin-bottom:8px; }
        .price { color:#1a8917; font-weight:bold; font-size:1.1em; }
      </style>
      <div class="card">
        <img class="img" src="${image}" alt="${title}" />
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
        <div class="price">${price}</div>
      </div>
    `;
  }
}
customElements.define('product-card', ProductCard);
