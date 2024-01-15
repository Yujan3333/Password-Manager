// EDIT FORM PUT/UPDATE Request *******************************
//to send the updated form data to backend
const editForm = document.getElementById("editForm") as HTMLFormElement;
const submitEditFormButton = document.getElementById(
  "submitEditForm"
) as HTMLElement;
const cancelEditFormButton = document.getElementById(
  "cancelEditForm"
) as HTMLElement;
const emailErrorDiv = document.getElementById("editEmailError") as HTMLDivElement;
//For getting the vaultId to send in backend

submitEditFormButton.addEventListener("click", () => {
  // Validation Logic for the edit form
  const editWebsiteInput = document.getElementById(
    "editWebsite"
  ) as HTMLInputElement;
  const editPasswordInput = document.getElementById(
    "editPassword"
  ) as HTMLInputElement;
  const editEmailInput = document.getElementById(
    "editEmail"
  ) as HTMLInputElement;
  const editEntryIdInput = document.getElementById(
    "editEntryId"
  ) as HTMLInputElement;

  const editEmailValue = editEmailInput.value;

  // validating if the email is in the correct format or not
  if (!isValidEmail(editEmailValue)) {
    // Show error message in a div
    emailErrorDiv.innerText = "Please enter a valid email address.";

    // Add the 'hidden' class after 3 seconds
    setTimeout(() => {
      emailErrorDiv.innerText = "";
    }, 3000);

    return;
  } else {
    // Clear the error message if email is valid
    emailErrorDiv.innerText = "";
  }


  //Validating the email Function *****************************************************
  function isValidEmail(email: string): boolean {
    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Getting the token from local storage
  const token = localStorage.getItem("token");

  // Sending the token through the header
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  // Creating the updated data object
  const updatedData = {
    website: editWebsiteInput.value,
    email: editEmailInput.value,
    sitepassword: editPasswordInput.value,
  };


  // Extracting the id of the edited entry related to backend  from the button's backend-id attribute
  // Get the edited entry's ID from the hidden input
  const editId = editEntryIdInput.value;
  console.log("Index is", editId);

  // Making a PUT request to update the entry in the backend
  fetch(`http://127.0.0.1:8000/vaults/${editId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchVaults(); // Refresh the displayed vaults after editing
    })
    .catch((error) => console.error("Error:", error));

  editForm.reset();//reset the form data to empty
  updatePasswordStrengthIndicatorEdit();  //Remove the Strength checker after update btn is hit

  // Hide the edit form after successful submission
  editForm.style.display = "none";
  mainBody.style.display = "block"; // Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
});

cancelEditFormButton.addEventListener("click", () => {
  editForm.style.display = "none"; // Hide the edit form on cancel
  mainBody.style.display = "block"; // Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
  editForm.reset();//reset the form data to empty
  updatePasswordStrengthIndicatorEdit();  //Remove the Strength checker after cancel is hit
});


// // PASSWORD STRENGTH CHECK *********************************************
// // To remove the div when the edi form password input value is empty
// const strengthIndicator = document.getElementById(
//   "editPasswordStrength"
// ) as HTMLDivElement;

// // Check if the password length is zero
// const editPasswordInputStrengthChecker = document.getElementById(
//   "editPassword"
// ) as HTMLInputElement;
// if (editPasswordInputStrengthChecker.value.length === 0) {
//   strengthIndicator.style.display = "none";
// }
