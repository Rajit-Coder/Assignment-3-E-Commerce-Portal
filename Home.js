// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.getElementById("next-slide");
    const prevBtn = document.getElementById("prev-slide");

    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        // Show the target slide
        slides[index].classList.add("active");
    }

    // Function to show the next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0; // Loop back to the first slide
        }
        showSlide(currentSlide);
    }

    // Function to show the previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1; // Loop back to the last slide
        }
        showSlide(currentSlide);
    }

    // Event Listeners for buttons
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Auto-play the slider
    let slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Pause auto-play when mouse is over the slider
    const slider = document.getElementById("hero-slider");
    slider.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
    });

    // Resume auto-play when mouse leaves the slider
    slider.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Show the first slide initially
    showSlide(currentSlide);
});