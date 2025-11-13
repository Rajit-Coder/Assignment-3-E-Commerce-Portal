document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("search-bar");
    const productCards = document.querySelectorAll(".product-card");
    const categoryLinks = document.querySelectorAll(".category-link");

    // --- 1. SEARCH BAR FILTER ---
    searchInput.addEventListener("keyup", (event) => {
        const searchTerm = event.target.value.toLowerCase();

        productCards.forEach(card => {
            // Find the product name (h3) inside the card
            const productName = card.querySelector("h3").textContent.toLowerCase();

            // Check if the product name includes the search term
            if (productName.includes(searchTerm)) {
                card.style.display = "block"; // Show the card
            } else {
                card.style.display = "none"; // Hide the card
            }
        });
    });

    // --- 2. CATEGORY LINK FILTER ---
    categoryLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Stop the link from navigating

            const selectedCategory = link.dataset.category;

            // Remove 'active' class from all links
            categoryLinks.forEach(l => l.classList.remove("active"));
            // Add 'active' class to the clicked link
            link.classList.add("active");

            // Filter the product cards
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;

                // Show if "all" is selected OR if card matches category
                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    card.style.display = "block"; // Show the card
                } else {
                    card.style.display = "none"; // Hide the card
                }
            });
        });
    });

});