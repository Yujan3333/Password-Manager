// src/scripts/strengthChecker.ts
// Password strength 

/**
 * 
 * @param password string
 * @returns string strength level
 */
const checkPasswordStrength = (password: string): string => {
    // Password strength rules
    const lengthRegex = /.{8,}/; // Minimum length of 8 characters
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const numberRegex = /\d/; // At least one digit
    const specialCharRegex = /[!@#$%^&*()\-_=+<>?]/; // At least one special character
  
    // Combine the rules to check the overall strength level
    const strength =
      (lengthRegex.test(password) ? 1 : 0) +
      (uppercaseRegex.test(password) ? 1 : 0) +
      (lowercaseRegex.test(password) ? 1 : 0) +
      (numberRegex.test(password) ? 1 : 0) +
      (specialCharRegex.test(password) ? 1 : 0);
  
  // Return the strength level
  if (strength <= 2) {
    return "Weak";
  } else if (strength === 5) {
    return "Strong";
  } else {
    return "Moderate";
  }
  };
  
// To make changes in the front end
const updatePasswordStrengthIndicator = () => {
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const strengthIndicator = document.getElementById("passwordStrength") as HTMLDivElement;

  // Check if the password is empty
  if (passwordInput && strengthIndicator) {
    const password = passwordInput.value.trim();

    if (password.length === 0) {
      // If password is empty, hide the strength indicator
      strengthIndicator.textContent = ""; // Clear the strength text
      strengthIndicator.style.display = "none"; // Hide the strength indicator
    } else {
      // If password is not empty, calculate and display the strength
      const passwordStrength = checkPasswordStrength(password);
      strengthIndicator.textContent = `Strength: ${passwordStrength}`;

      // Set colors according to strength
      if (passwordStrength === "Weak") {
        strengthIndicator.style.color = "red";
      } else if (passwordStrength === "Moderate") {
        strengthIndicator.style.color = "blue";
      } else if (passwordStrength === "Strong") {
        strengthIndicator.style.color = "green";
      }

      // Show the strength indicator
      strengthIndicator.style.display = "block";
    }
  }
};
  
  
  // Event Listerner for real time password strength checking
  const passwordInputS = document.getElementById("password") as HTMLInputElement;
  if (passwordInputS) {
    passwordInputS.addEventListener("input", updatePasswordStrengthIndicator);
  }
