// app.js - simple product data and UI helpers for prototype store with real images
const PRODUCTS = [
  {
    id: 1,
    title: 'Intel Core i5-12400',
    price: 1790000,
    desc: '6 núcleos, 12 hilos — Rendimiento para gaming y productividad.',
    img: 'https://images.openai.com/thumbnails/url/-MS0IHicu1mSUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4qjDJKDPcOSLfILqssTAotzHKq9Ml38Y-0zNENTXbKDDR2Di81KAw08bZ09_Y3c46P8It38Q5ICSrNCFQrBgAecymE'
  },
  {
    id: 2,
    title: 'AMD Ryzen 5 5600X',
    price: 1490000,
    desc: '6 núcleos, alto IPC y eficiencia energética.',
    img: 'https://images.openai.com/thumbnails/url/0w0Q-Hicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4sLa9IiwoxjQxyLwtPjQ_NDC0viEwtdAqLyHbxjg_wzTcoyo3ysCzyKAst967ycc3Szc3ODHXLrTRRKwYA808qVw'
  },
  {
    id: 3,
    title: 'Placa madre B550',
    price: 650000,
    desc: 'Socket AM4, soporte M.2 y PCIe 4.0.',
    img: 'https://images.openai.com/thumbnails/url/D9GxM3icu1mSUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw52DIio8Ar3KjLw8ncMNsgMCzL1jshKcqyyyAw0zjZLr7A0DIkwc6qKtEjxdfEMj_JzzqwMdXOz1A13dFQrBgDywShf'
  },
  {
    id: 4,
    title: 'Memoria RAM 16GB DDR4 3200MHz',
    price: 220000,
    desc: 'Kit 2x8GB para un rendimiento estable.',
    img: 'https://images.openai.com/thumbnails/url/CSemonicu1mSUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw6M8A_yMnTJds5yMc9MLTOKLw1L9MpxTi4u9s72KEgxKfepSCrLdPKu8AuIcEy18A-MCjb3i0_1jzePSlcrBgAfvSoH'
  },
  {
    id: 5,
    title: 'SSD NVMe 1TB',
    price: 320000,
    desc: 'Altas velocidades de lectura/escritura para cargas rápidas.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Samsung_SSD_970_EVO_Plus.jpg'
  }
];

function moneyCOP(n) {
  return n.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    return [];
  }
}
function saveCart(c) {
  localStorage.setItem('cart', JSON.stringify(c));
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id: productId, qty });
  saveCart(cart);
  updateCartUI();
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  updateCartUI();
}

function updateCartUI() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.innerText = count;
}

function findProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

/* --- Renderers --- */
function renderProductList() {
  const el = document.getElementById('product-list');
  if (!el) return;
  el.innerHTML = '';
  PRODUCTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="product-image" src="${p.img}" alt="${p.title}" style="height:140px;object-fit:contain;border-radius:8px"/>
      <h3>${p.title}</h3>
      <p class="price">${moneyCOP(p.price)}</p>
      <p class="muted">${p.desc}</p>
      <div style="margin-top:auto;display:flex;gap:8px">
        <a class="btn small" href="product.html?id=${p.id}">Ver</a>
        <button class="btn small" onclick="addToCart(${p.id},1)">Añadir</button>
      </div>
    `;
    el.appendChild(card);
  });
}

function renderProductDetail() {
  const el = document.getElementById('product-detail');
  if (!el) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 1;
  const p = findProduct(id);
  if (!p) {
    el.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }
  el.innerHTML = `
    <div class="info">
      <img class="product-image" style="height:220px;object-fit:contain;border-radius:12px" src="${p.img}" alt="${p.title}"/>
    </div>
    <div class="info">
      <h2>${p.title}</h2>
      <p class="price">${moneyCOP(p.price)}</p>
      <p>${p.desc}</p>
      <div style="margin-top:16px">
        <label>Cantidad: <input id="qty" type="number" value="1" min="1" style="width:80px"></label>
        <button class="btn" id="add-btn">Agregar al carrito</button>
      </div>
    </div>
  `;
  document.getElementById('add-btn').addEventListener('click', () => {
    const q = Number(document.getElementById('qty').value || 1);
    addToCart(p.id, q);
    alert('Producto agregado al carrito (simulado).');
  });
}

function renderCart() {
  const el = document.getElementById('cart-contents');
  if (!el) return;
  const cart = getCart();
  if (cart.length === 0) {
    el.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }
  let html = '<table style="width:100%;border-collapse:collapse"><thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead><tbody>';
  let total = 0;
  cart.forEach(item => {
    const p = findProduct(item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;
    html += `<tr>
      <td>${p.title}</td>
      <td>${moneyCOP(p.price)}</td>
      <td>${item.qty}</td>
      <td>${moneyCOP(subtotal)}</td>
      <td><button class="btn small" onclick="removeFromCart(${p.id})">Eliminar</button></td>
    </tr>`;
  });
  html += `</tbody></table><p style="text-align:right;font-weight:700;margin-top:10px">Total: ${moneyCOP(total)}</p>`;
  el.innerHTML = html;
}

/* keep UI updated when pages load */
document.addEventListener('DOMContentLoaded', updateCartUI);
