/**
 * @param length number for the password length
 * @returns string password
 */
const generatePassword = (length: number): string => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numericChars = "0123456789";
  const specialChars = "!@#$%^&*()-_+=<>?";


    // Ensure at least one character from each character set
    const oneUppercase = uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    const oneLowercase = lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    const oneNumeric = numericChars.charAt(Math.floor(Math.random() * numericChars.length));
    const oneSpecial = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
    // Combine all character sets
    const allChars = uppercaseChars + lowercaseChars + numericChars + specialChars;
  
    // Calculate the remaining length for random characters
    const remainingLength = length - 4;
  
    // Check if the combined character set is long enough
    if (allChars.length < remainingLength) {
      throw new Error("Combined character set is not long enough for the desired password length.");
    }
  
    let password = oneUppercase + oneLowercase + oneNumeric + oneSpecial;

  // Loop to randomly select characters from the combined character set
  for (let i = 0; i < remainingLength; i++) {
    // Generate a random index within the length of the combined character set
    const randomIndex = Math.floor(Math.random() * allChars.length);

    // Append the randomly selected character to the password string
    password += allChars.charAt(randomIndex);
  }

  return password;
};

const generatePasswordButton = document.getElementById("generatePasswordButton");

if (generatePasswordButton) {
  generatePasswordButton.addEventListener("click", () => {
    const generatedPassword = generatePassword(12);

    const showGeneratedPassword = document.getElementById("generatedPasswordDiv") as HTMLElement;

    if (showGeneratedPassword) {
      showGeneratedPassword.style.display = "block";
      // showGeneratedPassword.innerHTML = `${generatedPassword}`;
      showGeneratedPassword.innerHTML = "Copied to Clipboard";

       // Copy the generated password to the clipboard By creating a temporary textarea
      const textarea = document.createElement("textarea");
      textarea.value = generatedPassword;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      // alert("Password copied to clipboard!");
      console.log("Copied Password is ", generatedPassword);

      // Set a timeout to hide the generated password after 5 seconds
      setTimeout(() => {
        showGeneratedPassword.style.display = "none";
        // showGeneratedPassword.innerHTML = ""; // Clear the content
      }, 1000);
    }
  });
}
