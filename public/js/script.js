// selected menu
function redirectToPage() {
  const selectElement = document.getElementById("category");
  const selectedValue = selectElement.value;

  if (selectedValue) {
    window.location.href = selectedValue; // Redirects to the chosen page
  }
}
//added to cart

// Function to update the cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}
// Function to add item to the cart
function addToCart(productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Check if the item already exists in the cart
  let productExists = cart.find((item) => item.name === productName);

  if (!productExists) {
    cart.push({ name: productName, price: productPrice, image: productImage });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // Update the cart count after adding
}
// Function to remove item from the cart
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // Update the cart count after removing
} // Function to handle Add to Cart button click
document.addEventListener("DOMContentLoaded", function () {
  // Find all add-to-cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let productCard = button.closest(".product-card");
      let productName = productCard.querySelector(".product-name").textContent;
      let productPrice =
        productCard.querySelector(".product-price").textContent;
      let productImage = productCard.querySelector(".product-image").src;

      // Remove dollar sign and convert to number
      productPrice = parseFloat(productPrice.replace("$", ""));

      addToCart(productName, productPrice, productImage); // Add to cart
    });
  });

  updateCartCount(); // Initial count update
});

document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");

  // Display all items in the cart
  cart.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
          <div class="product-name">${item.name}</div>
          <div class="product-price">$${item.price}</div>
          <button class="remove-from-cart-btn" data-name="${item.name}">Remove</button>
      `;
    cartContainer.appendChild(cartItem);
  });

  // Handle remove button click
  const removeFromCartButtons = document.querySelectorAll(
    ".remove-from-cart-btn"
  );

  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let productName = button.getAttribute("data-name");
      removeFromCart(productName); // Remove from cart
      button.closest(".cart-item").remove(); // Remove item from UI
    });
  });
});
// Function to remove item from the cart
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // Update the cart count after removing
}

//favourite button added

// Initialize favorites from localStorage or as an empty array
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Update the favorite count on page load
updateFavCount();

// Add event listeners for heart icons (add to favorites)
document.querySelectorAll(".favorite-icon").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    const productCard = event.target.closest(".product-card");
    const product = {
      name: productCard.querySelector(".product-name").textContent,
      price: productCard.querySelector(".product-price").textContent,
      image: productCard.querySelector(".product-image").src,
    };

    // Check if product is already in favorites
    const isFavorite = favorites.some((fav) => fav.name === product.name);

    // If not already in favorites, add it and change the heart icon to red
    if (!isFavorite) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavCount();
      alert(`${product.name} has been added to your favorites.`);
      // Change the heart icon to a red heart
      event.target.src = "./img/redheart.png"; // Update the heart icon to red
    } else {
      alert(`${product.name} is already in your favorites.`);
    }
  });
});

// Render favorite products on the favorites page
if (window.location.pathname.includes("favourite.html")) {
  const favoriteProductsContainer =
    document.getElementById("favorite-products");

  if (favorites.length === 0) {
    favoriteProductsContainer.innerHTML = "<p>No favorite products yet.</p>";
  } else {
    favorites.forEach((product, index) => {
      const productHTML = `
        <div class="product-card">
          <img src="${product.image}" class="product-image" alt="${product.name}" />
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
          <button class="remove-btn" onclick="removeFromFavorites(${index})">Remove</button>
        </div>
      `;
      favoriteProductsContainer.innerHTML += productHTML;
    });
  }
}

// Function to remove a product from favorites
function removeFromFavorites(index) {
  favorites.splice(index, 1); // Remove product from the array
  localStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
  updateFavCount(); // Update the favorite count
  location.reload(); // Refresh the page to reflect changes
}

// Update the favorite count display
function updateFavCount() {
  const favCount = document.getElementById("fav-count");
  if (favCount) {
    favCount.textContent = favorites.length;
  }
}


// Dark mode

function toggleDarkMode() {
  // Get the body element
  const body = document.body;
  // Toggle the dark-mode class on the body
  body.classList.toggle("dark-mode");

  // Update the toggle icon
  const icon = document.getElementById("theme-toggle-icon");
  if (body.classList.contains("dark-mode")) {
    icon.src = "./img/moon.png"; // Change to moon image
    // Save the dark mode preference in localStorage
    localStorage.setItem("dark-mode", "enabled");
  } else {
    icon.src = "./img/sun1.png"; // Change to sun image
    // Save the light mode preference in localStorage
    localStorage.setItem("dark-mode", "disabled");
  }

  // Apply dark mode styles to specific elements
  const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navbarLinks.forEach((link) => {
    link.classList.toggle("dark-mode");
  });

  const searchInput = document.querySelector(".search-input");
  searchInput.classList.toggle("dark-mode");

  const signupButton = document.querySelector(".create-signup-btn");
  signupButton.classList.toggle("dark-mode");
}

// On page load, check if dark mode is enabled
window.onload = () => {
  // Check if dark mode is saved in localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    // Apply dark mode class if dark mode is enabled
    document.body.classList.add("dark-mode");

    // Change the icon to the moon
    const icon = document.getElementById("theme-toggle-icon");
    icon.src = "./img/moon.png";

    // Apply dark mode styles to specific elements
    const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navbarLinks.forEach((link) => {
      link.classList.add("dark-mode");
    });

    const searchInput = document.querySelector(".search-input");
    searchInput.classList.add("dark-mode");

    const signupButton = document.querySelector(".create-signup-btn");
    signupButton.classList.add("dark-mode");
  }
};

