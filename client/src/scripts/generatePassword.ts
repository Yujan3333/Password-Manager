// generatePassword.ts

// Generates a random password
const generatePassword = (length: number): string => {
    // Defining character sets for uppercase letters, lowercase letters, numbers, and special characters.
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numericChars = "0123456789";
    const specialChars = "!@#$%^&*()-_+=<>?";
  
    //Combining all character sets into a single string.
    const allChars = uppercaseChars + lowercaseChars + numericChars + specialChars;
  
    //Empty string to store the generated password.
    let password = "";
  
    //Randomly selecting characters from the above combo of string into a single one .
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }
  
    //Return the generated password.
    return password;
  };
  
  
  //Adding an event listener to the generatePassword button to add value to  the password input field.
  const generatePasswordButton = document.getElementById("generatePasswordButton");
  
  if (generatePasswordButton) {
    generatePasswordButton.addEventListener("click", () => {
      // Creating the password with length 12
      const generatedPassword = generatePassword(12);
      // getting the password form the input form of addbutton.
      const passwordInput = document.getElementById("password") as HTMLInputElement;
  
      // Setting the password
      if (passwordInput) {
        passwordInput.value = generatedPassword;
      }
    });
  }
  
  // Password view icon section
  // Add an event listener to the "Toggle Password" icon to switch between visible password and hidden password.
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
  