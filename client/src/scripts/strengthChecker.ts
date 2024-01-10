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

    //if password is inputted and strengthIndicator shows in the frontend
    if (passwordInput && strengthIndicator) {
      const passwordStrength = checkPasswordStrength(passwordInput.value);
      strengthIndicator.textContent = `Strength: ${passwordStrength}`;

      //For colors according to strength
        if (passwordStrength === "Weak") {
            strengthIndicator.style.color = "red";
        } else if (passwordStrength === "Moderate") {
            strengthIndicator.style.color = "blue";
        } else if (passwordStrength === "Strong") {
            strengthIndicator.style.color = "green";
        }
    }
  };
  
  
  // Event Listerner for real time password strength checking
  if (passwordInput) {
    passwordInput.addEventListener("input", updatePasswordStrengthIndicator);
  }
