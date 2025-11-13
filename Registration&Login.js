// Wait for the document to load before running script
document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("register-form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordMatchError = document.getElementById("password-match-error");

    registerForm.addEventListener("submit", function(event) {
        
        // 1. Check if passwords match
        if (password.value !== confirmPassword.value) {
            // Stop the form from submitting
            event.preventDefault(); 
            
            passwordMatchError.textContent = "Passwords do not match.";
            confirmPassword.style.borderColor = "red";
        } else {
            passwordMatchError.textContent = "";
            confirmPassword.style.borderColor = "green";
            alert("Registered Successfully");
        }

        // 2. You can add more complex checks here
        
        // If all checks pass, the form will submit to the 'action' URL
        // In a real app, you'd use fetch() to send this to your backend API
    });
});