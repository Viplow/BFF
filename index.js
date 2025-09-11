

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());

// Serve widgets as static files
app.use('/widgets', express.static(path.resolve('./widgets')));

// Serve the root directory (for demo.html and ssr-demo.html)
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(express.static(__dirname));

// Serve demo.html at /demo
app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Serve ssr-demo.html at /ssrdemo
app.get('/ssrdemo', (req, res) => {
  res.sendFile(path.join(__dirname, 'ssr-demo.html'));
});

// SSR: Product Card
app.get('/ssr/product-card', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/1');
    const product = await response.json();
    res.type('html').send(`
      <script src="/widgets/product-card.js"></script>
      <product-card
        title="${product.title.replace(/"/g, '&quot;')}"
        subtitle="In stock • 4.5 ★"
        image="${product.image}"
        price="$${product.price}">
      </product-card>
    `);
  } catch (err) {
    res.status(500).send('<div>Failed to fetch product data</div>');
  }
});

// SSR: User Profile
app.get('/ssr/user-profile', async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    res.type('html').send(`
      <script src="/widgets/user-profile.js"></script>
      <user-profile
        name="${user.name.first} ${user.name.last}"
        email="${user.email}"
        avatar="${user.picture.large}"
        location="${user.location.city}, ${user.location.country}">
      </user-profile>
    `);
  } catch (err) {
    res.status(500).send('<div>Failed to fetch user data</div>');
  }
});

// SSR: Product List
app.get('/ssr/product-list', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    const products = await response.json();
    res.type('html').send(`
      <script src="/widgets/product-list.js"></script>
      <product-list
        products='${JSON.stringify(products.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image
        })))}'>
      </product-list>
    `);
  } catch (err) {
    res.status(500).send('<div>Failed to fetch product list</div>');
  }
});

// Product Card Component as HTML
app.get('/component/product-card', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/1');
    const product = await response.json();
    res.type('html').send(`
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" style="width:100px;height:100px;object-fit:contain;" />
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <strong>$${product.price}</strong>
      </div>
      <style>
        .product-card { border:1px solid #ddd; padding:16px; border-radius:8px; max-width:300px; font-family:sans-serif; }
        .product-card h2 { font-size:1.2em; margin:0.5em 0; }
        .product-card p { font-size:0.95em; color:#555; }
      </style>
    `);
  } catch (err) {
    res.status(500).send('<div>Failed to fetch product data</div>');
  }
});

// User Profile Component as HTML
app.get('/component/user-profile', async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    res.type('html').send(`
      <div class="user-profile">
        <img src="${user.picture.large}" alt="${user.name.first}" style="width:80px;height:80px;border-radius:50%;" />
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>${user.email}</p>
        <span>${user.location.city}, ${user.location.country}</span>
      </div>
      <style>
        .user-profile { border:1px solid #ccc; padding:16px; border-radius:8px; max-width:250px; font-family:sans-serif; text-align:center; }
        .user-profile h3 { margin:0.5em 0; }
        .user-profile p { color:#666; font-size:0.95em; }
        .user-profile span { font-size:0.9em; color:#888; }
      </style>
    `);
  } catch (err) {
    res.status(500).send('<div>Failed to fetch user data</div>');
  }
});

// Product List Component as HTML
app.get('/component/product-list', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    const products = await response.json();
    res.type('html').send(`
      <ul class="product-list">
        ${products.map(p => `
          <li>
            <img src="${p.image}" alt="${p.title}" style="width:40px;height:40px;object-fit:contain;vertical-align:middle;" />
            <span>${p.title}</span> - <strong>$${p.price}</strong>
          </li>
        `).join('')}
      </ul>
      <style>
        .product-list { list-style:none; padding:0; font-family:sans-serif; }
        .product-list li { margin:8px 0; padding:8px; border-bottom:1px solid #eee; display:flex; align-items:center; }
        .product-list img { margin-right:12px; }
      </style>
    `);
  } catch (err) {
    res.status(500).send('<div>Failed to fetch product list</div>');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFF CaaS server running on port ${PORT}`));
