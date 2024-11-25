// Function to update the cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = `Cart Count: ${cart.length}`;
}

// Function to remove item from the cart and localStorage
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Filter out the item from the cart array
  cart = cart.filter(item => item.name !== productName);
  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to handle Add to Cart button click
document.addEventListener("DOMContentLoaded", function () {
  // Get cart data from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let cartCount = document.getElementById("cart-count");

  // Display all items in the cart as full product cards
  cart.forEach(item => {
      let cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
          <div class="cart-item-card">
              <img src="${item.image}" class="product-image" alt="${item.name}" />
              <div class="cart-item-details">
                  <div class="product-name">${item.name}</div>
                  <div class="product-price">$${item.price}</div>
                  <button class="remove-from-cart-btn" data-name="${item.name}">Remove</button>
              </div>
          </div>
      `;
      cartContainer.appendChild(cartItem);
  });

  // Handle remove button click
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");

  removeFromCartButtons.forEach(button => {
      button.addEventListener("click", function () {
          let productName = button.getAttribute("data-name");
          removeFromCart(productName); // Remove from cart
          button.closest(".cart-item").remove(); // Remove item from UI
          updateCartCount(); // Update cart count after removing an item
      });
  });

  // Update cart count on page load
  updateCartCount();
});
