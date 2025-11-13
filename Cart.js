// This code runs as soon as the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Update the cart count in the header (runs on every page)
    updateCartCount();

    // 2. Attach listeners for "Add to Cart" (runs on every page)
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            const product = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
            addItemToCart(product);
            alert(product.name + " has been added to your cart!");
        });
    });

    // 3. Try to draw the cart page (will only work if we are on cart.html)
    displayCartPageItems();
});

// --- HELPER FUNCTIONS (These were missing) ---

/**
 * Gets the cart from localStorage.
 * @returns {Array} The cart array.
 */
function getCart() {
    return JSON.parse(localStorage.getItem("shoppingCart")) || [];
}

/**
 * Saves the cart to localStorage.
 * @param {Array} cart - The cart array to save.
 */
function saveCart(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// --- CART ACTION FUNCTIONS ---

/**
 * Adds a product to the cart stored in localStorage.
 * (This is from your file, it's correct)
 */
function addItemToCart(product) {
    let cart = getCart(); // Uses helper
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    saveCart(cart); // Uses helper
    updateCartCount();
}
// 2b. Attach listeners for "Remove from Cart" (runs on product page)
const removeFromCartButtons = document.querySelectorAll(".btn-remove-from-cart");
removeFromCartButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const productName = event.target.dataset.name;
        removeItemFromCart(productName);
        console.log("Cart after remove:", getCart()); 
        alert(productName + " has been removed from your cart!");
        console.log("Cart after remove:", getCart());

    });
});


/**
 * (THIS IS THE REMOVE FUNCTION)
 * Removes an item from the cart by its name.
 */
function removeItemFromCart(productName) {
    console.log("Removing item:", productName); // Good for debugging
    let cart = getCart(); // Uses helper

    // "Remove" the item by filtering it out
    cart = cart.filter(item => item.name !== productName);

    saveCart(cart); // Uses helper
    updateCartCount(); // Update header
    displayCartPageItems(); // Re-draw the cart to show it's gone
    
}

/**
 * Updates the cart count number in the header navigation.
 * (This is from your file, it's correct)
 */
function updateCartCount() {
    const cart = getCart(); // Uses helper
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById("cart-count");
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

/**
 * Displays all items from the cart on the cart.html page.
 * (This is the FIXED version of your function)
 */
function displayCartPageItems() {
    const cartContainer = document.getElementById("cart-items-container");
    const totalPriceElement = document.getElementById("total-price");

    // Stop if we're not on the cart page
    if (!cartContainer) {
        return;
    }

    const cart = getCart(); // Uses helper
    let totalPrice = 0;

    cartContainer.innerHTML = ""; // Clear the container

    // Show a message if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "$0.00";
        return;
    }

    // Loop through each item and create the HTML
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemRow = document.createElement("div");
        itemRow.className = "cart-item"; // Matches your CSS

        const itemDetails = document.createElement("div");
        itemDetails.className = "cart-item-details";
        itemDetails.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
        `;

        // Create the "Remove" button
        const removeButton = document.createElement("button");
        removeButton.className = "btn-remove-from-cart";
         // Matches your CSS
        removeButton.textContent = "Remove";

        // Add the click listener to call your remove function
        removeButton.addEventListener("click", () => {
            removeItemFromCart(item.name);
        });

        // Put the pieces together
        itemRow.appendChild(itemDetails);
        itemRow.appendChild(removeButton);
        cartContainer.appendChild(itemRow);
    });

    // Update total price (Fixing the .toFixed(-2) typo)
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}