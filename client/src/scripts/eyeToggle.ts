  // Password view icon section
  // Adding event listener to the "Toggle Password" icon to switch between visible password and hidden password.
  const togglePasswordIcon = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  
  if (togglePasswordIcon && passwordInput) {
    togglePasswordIcon.addEventListener("click", () => {
      // Toggle 
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordIcon.classList.remove("uil-eye-slash");
        togglePasswordIcon.classList.add("uil-eye");
      } else {
        passwordInput.type = "password";
        togglePasswordIcon.classList.remove("uil-eye");
        togglePasswordIcon.classList.add("uil-eye-slash");
      }
    });
  }