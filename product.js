document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    fetchProducts(category);
  } else {
    document.getElementById("product-results").innerHTML = "<p>No category selected.</p>";
  }

  function fetchProducts(category) {
    const apiMap = {
      books: 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction',
      electronics: 'https://fakestoreapi.com/products/category/electronics',
      tech: 'https://fakestoreapi.com/products/category/electronics',
      kitchen: 'https://dummyjson.com/products/category/groceries',
      pets: 'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
      footwear: "https://fakestoreapi.com/products/category/men's clothing"
    };

    const apiUrl = apiMap[category] || "https://fakestoreapi.com/products";

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        displayProducts(data, category);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        document.getElementById("product-results").innerHTML = "<p>Error loading products.</p>";
      });
  }

  function displayProducts(products, category) {
    const container = document.getElementById("product-results");
    container.innerHTML = `<h2>Products for "${category}"</h2>`;

    if (!Array.isArray(products)) {
      products = products.items || [];
    }

    const html = products.map(product => {
      const title = product.title || product.name || product.volumeInfo?.title || "Untitled";
      const image = product.image || product.volumeInfo?.imageLinks?.thumbnail || product.imageUrl || "assets/noimg.png";
      const price = product.price || product.saleInfo?.listPrice?.amount || "₹ --";

      return `
        <div class="product-card">
          <img src="${image}" alt="${title}">
          <h4>${title}</h4>
          <p>${typeof price === 'number' ? '₹ ' + price : price}</p>
        </div>
      `;
    }).join("");

    container.innerHTML += `<div class="product-list">${html}</div>`;
  }
});
