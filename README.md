# Prototipo: Tienda de Partes de Computador

## Descripción
Prototipo simple de un aplicativo web para vender partes de computadores. Implementado con HTML5, CSS y JavaScript (vanilla). Es un prototipo educativo y simula la lógica de carrito usando `localStorage`.

## Pantallas (mínimo 3)
1. **Inicio / Listado de productos** (`index.html`)
   - Muestra tarjetas de productos con precio, descripción, botón Ver y Añadir.
2. **Detalle de producto** (`product.html?id=<id>`)
   - Muestra información detallada del producto y permite seleccionar cantidad y añadir al carrito.
3. **Carrito / Checkout (simulado)** (`cart.html`)
   - Lista de ítems en el carrito, eliminación de ítems, vaciar carrito y "Finalizar compra" (simulado).

## Mapa de navegación (rutas y flujo)
- `index.html` (Inicio)
  - -> `product.html?id=1` (Detalle) — Botón "Ver"
  - -> `cart.html` (Carrito) — Enlace superior "Carrito"
  - Botón "Añadir" (desde listado) añade directamente al carrito.
- `product.html?id=<id>`
  - -> `index.html` (Volver)
  - -> `cart.html` (enlace superior)
  - Botón "Agregar al carrito" (añade con la cantidad seleccionada)
- `cart.html`
  - Botón "Finalizar compra" (simulado): limpia carrito y muestra mensaje.
  - Botón "Vaciar carrito": elimina todos los ítems.

## Archivos incluidos
- `index.html` — Página principal con listado
- `product.html` — Página de detalle de producto
- `cart.html` — Página de carrito
- `styles.css` — Estilos
- `app.js` — Lógica de productos y carrito (localStorage)
- `README.md` — Este documento

## Instrucciones
1. Descomprimir el zip y abrir `index.html` en un navegador moderno.
2. No requiere servidor; funciona con archivos locales.

---

Prototipo creado por adinsonpineda
