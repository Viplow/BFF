class UserProfile extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'email', 'avatar', 'location'];
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
    const name = this.getAttribute('name') || '';
    const email = this.getAttribute('email') || '';
    const avatar = this.getAttribute('avatar') || '';
    const location = this.getAttribute('location') || '';
    this.shadowRoot.innerHTML = `
      <style>
        .profile { border:1px solid #ccc; border-radius:8px; padding:16px; max-width:220px; font-family:sans-serif; text-align:center; }
        .avatar { width:70px; height:70px; border-radius:50%; margin-bottom:10px; }
        .name { font-weight:bold; font-size:1.1em; }
        .email { color:#666; font-size:0.95em; margin-bottom:4px; }
        .location { color:#888; font-size:0.9em; }
      </style>
      <div class="profile">
        <img class="avatar" src="${avatar}" alt="${name}" />
        <div class="name">${name}</div>
        <div class="email">${email}</div>
        <div class="location">${location}</div>
      </div>
    `;
  }
}
customElements.define('user-profile', UserProfile);
