const addButton = document.getElementById("addButton") as HTMLElement;
const addForm = document.getElementById("addForm") as HTMLFormElement;
const submitFormButton = document.getElementById("submitForm") as HTMLElement;
const cancelFormButton = document.getElementById("cancelForm") as HTMLElement;

addButton.addEventListener("click", () => {
  addForm.style.display = "block";
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault(); // On submit page refresh stop

  // Validation Logic
  const websiteInput = document.getElementById("website") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const emailValue = emailInput.value;

  //validating if the email is correct format or not
  if (!isValidEmail(emailValue)) {
    alert("Please enter a valid email address.");
    return;
  }

  //The data of the form should be sent to the backend and inputted in the db
  console.log('Website:', websiteInput.value);
  console.log('Email:', emailValue);
  console.log('Password:', passwordInput.value);

  
  addForm.style.display = "none"; // Hide the form after successful submission
});

cancelFormButton.addEventListener("click", () => {
  addForm.style.display = "none"; // Hide the form on cancel
  // Reset the form elements to their default values
  addForm.reset();
  
  //To remove the div when the password input value is empty
  const strengthIndicator = document.getElementById("passwordStrength") as HTMLDivElement;

    // Check if the password length is zero 
    if (passwordInput.value.length === 0) {
      strengthIndicator.style.display= "none";
      return; // Exit the function if the password length is zero
    }

});

function isValidEmail(email: string): boolean {
  //Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
