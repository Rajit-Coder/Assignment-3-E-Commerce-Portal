document.addEventListener("DOMContentLoaded", () => {
    
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            // Prevent the browser from refreshing the page
            event.preventDefault();

            // In a real website, you would send the data to a backend server here.
            // For this project, we will simulate a successful send.

            // 1. Get the values (Optional: you can validate them further here)
            const name = document.getElementById("name").value;
            
            // 2. Show success message
            alert(`Thank you, ${name}! Your message has been sent. We will get back to you shortly.`);

            // 3. Clear the form
            contactForm.reset();
        });
    }
});