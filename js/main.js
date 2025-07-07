const category = new URLSearchParams(window.location.search).get('category');
const productList = document.getElementById('productList');
const priceSlider = document.getElementById('priceFilter');
const priceLabel = document.getElementById('priceValue');

// Get products in current category
const categoryProducts = products.filter(p => p.category === category);

// Get min and max price
const prices = categoryProducts.map(p => p.price);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

// Set up price slider
priceSlider.min = minPrice;
priceSlider.max = maxPrice;
priceSlider.value = maxPrice;
priceLabel.textContent = maxPrice;

// Display products within selected price
function displayProducts(max) {
  productList.innerHTML = "";
  categoryProducts
    .filter(p => p.price <= max)
    .forEach(p => {
      productList.innerHTML += `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}" width="150"/>
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
        </div>
      `;
    });
}

priceSlider.addEventListener('input', () => {
  priceLabel.textContent = priceSlider.value;
  displayProducts(priceSlider.value);
});

// Initial display
displayProducts(maxPrice);
