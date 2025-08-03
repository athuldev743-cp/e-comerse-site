document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");
  const category = params.get("category");

  if (search) {
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.products || [];
        if (filtered.length === 0) {
          document.getElementById("category-title").textContent = `Search: "${search}"`;
          document.getElementById("product-results").innerHTML = `
            <p>No results found for "<strong>${search}</strong>".</p>
            <p>Try searching: <em>iphone, laptop, perfume, watch, skincare</em>.</p>
          `;
          return;
        }
        displayProducts(filtered, `Search: "${search}"`);
      })
      .catch(err => {
        console.error("Search failed:", err);
        document.getElementById("product-results").innerHTML = "<p>Error loading search results.</p>";
      });

  } else if (category) {
    fetchProducts(category);

  } else {
    fetchProducts(); // Load all products by default
  }

  function fetchProducts(category) {
    const apiMap = {
      electronics: 'https://dummyjson.com/products/category/smartphones',
      tech: 'https://dummyjson.com/products/category/laptops',
      kitchen: 'https://dummyjson.com/products/category/groceries',
      footwear: 'https://dummyjson.com/products/category/mens-shoes',
      skincare: 'https://dummyjson.com/products/category/skincare',
      home: 'https://dummyjson.com/products/category/home-decoration'
    };

    const apiUrl = apiMap[category] || "https://dummyjson.com/products";

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.products || data;
        displayProducts(items, category || "All Products");
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        document.getElementById("product-results").innerHTML = "<p>Error loading products.</p>";
      });
  }

  function displayProducts(products, heading) {
    const container = document.getElementById("product-results");
    const title = document.getElementById("category-title");

    title.textContent = heading;
    container.innerHTML = "";

    if (!Array.isArray(products)) {
      products = products.items || [];
    }

    if (products.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    const html = products.map(product => {
      const title = product.title || "Untitled";
      const image = product.thumbnail || product.image || "assets/noimg.png";
      const price = product.price || "₹ --";

      return `
        <div class="product-card border p-3 rounded bg-white" style="width: 200px;">
          <img src="${image}" alt="${title}" class="img-fluid mb-2" style="height: 150px; object-fit: contain;">
          <h6>${title}</h6>
          <p>₹ ${price}</p>
        </div>
      `;
    }).join("");

    container.innerHTML = `<div class="d-flex flex-wrap gap-3">${html}</div>`;
  }
});
