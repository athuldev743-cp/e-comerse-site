document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search");
  const searchInput = document.getElementById("search-input");

  // Search button click handler
  searchBtn.addEventListener("click", function () {
    const keyword = searchInput.value.trim();
    if (keyword) {
      const encodedKeyword = encodeURIComponent(keyword);
      // Redirect to product.html with search keyword
      window.location.href = `products.html?search=${encodedKeyword}`;
    }
  });

  // Enter key press in input triggers the search
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchBtn.click(); // Trigger the click event
    }
  });
});

