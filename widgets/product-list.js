class ProductList extends HTMLElement {
  static get observedAttributes() {
    return ['products'];
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
    let products = [];
    try {
      products = JSON.parse(this.getAttribute('products') || '[]');
    } catch (e) {}
    this.shadowRoot.innerHTML = `
      <style>
        .list { list-style:none; padding:0; font-family:sans-serif; }
        .item { margin:8px 0; padding:8px; border-bottom:1px solid #eee; display:flex; align-items:center; }
        .img { width:40px; height:40px; object-fit:contain; margin-right:12px; }
        .title { flex:1; }
        .price { color:#1a8917; font-weight:bold; }
      </style>
      <ul class="list">
        ${products.map(p => `
          <li class="item">
            <img class="img" src="${p.image}" alt="${p.title}" />
            <span class="title">${p.title}</span>
            <span class="price">$${p.price}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }
}
customElements.define('product-list', ProductList);
