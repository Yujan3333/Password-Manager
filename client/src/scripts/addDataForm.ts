//scripts/addDataForm.ts

const addButton = document.getElementById("addButton") as HTMLElement;
const addForm = document.getElementById("addForm") as HTMLFormElement;
// const submitFormButton = document.getElementById("submitForm") as HTMLElement;
const cancelFormButton = document.getElementById("cancelForm") as HTMLElement;
const mainData = document.querySelector(".main-data") as HTMLElement;
const mainBody = document.querySelector(".main-body") as HTMLElement;

// Load existing data from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedData = JSON.parse(localStorage.getItem("formData") || "[]");
  displayFormData(storedData);
});

addButton.addEventListener("click", () => {
  //Make the form visible and make it come to center
  addForm.style.display = "block";
  mainBody.style.display = "flex";
  mainBody.style.alignItems = "center";
  mainBody.style.justifyContent = "center";
  
  mainData.style.display = "none"; // Hide main body when form is displayed
});

addForm.addEventListener("submit", () => {
  // addForm.addEventListener("submit", (event) => {
  // event.preventDefault(); // On submit page refresh stop

  // Validation Logic
  const websiteInput = document.getElementById("website") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const emailValue = emailInput.value;

  // validating if the email is in the correct format or not
  if (!isValidEmail(emailValue)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Save the form data in local storage
  const storedData = JSON.parse(localStorage.getItem("formData") || "[]");
  const formData = {
    website: websiteInput.value,
    email: emailValue,
    password: passwordInput.value,
  };

  storedData.push(formData);
  localStorage.setItem("formData", JSON.stringify(storedData));

  // Display the form data in the main-body
  displayFormData(storedData);

  addForm.style.display = "none"; // Hide the form after successful submission
  mainBody.style.display ="block"; //Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
});

cancelFormButton.addEventListener("click", () => {
  addForm.style.display = "none"; // Hide the form on cancel
  mainBody.style.display ="block";  // Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
  // Reset the form elements to their default values
  addForm.reset();

  // To remove the div when the password input value is empty
  const strengthIndicator = document.getElementById(
    "passwordStrength"
  ) as HTMLDivElement;

  // Check if the password length is zero
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  if (passwordInput.value.length === 0) {
    strengthIndicator.style.display = "none";
    return; // Exit the function if the password length is zero
  }
});

function isValidEmail(email: string): boolean {
  // Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// function displayFormData(formDataArray: any[]) {
//   mainData.innerHTML = ""; // Clear existing content

//   formDataArray.forEach((formData) => {
//     const entryDiv = document.createElement("div");
//     entryDiv.innerHTML = `
//       <p>Website: ${formData.website}</p>
//       <p>Email: ${formData.email}</p>
//       <p>Password: ${formData.password}</p>
//       <hr />
//     `;
//     mainData.appendChild(entryDiv);
//   });
// }

// Define types or interfaces if needed
interface FormData {
  website: string;
  email: string;
  password: string;
}

function displayFormData(formDataArray: FormData[]) {
  const mainData = document.querySelector(".main-data") as HTMLElement;
  mainData.innerHTML = ""; // Clear existing content

  formDataArray.forEach((formData, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "data-entry card mb-3";
    entryDiv.innerHTML = `
    <div class="card-body">
    <h5 class="card-title">${formData.website}</h5>
    <p class="card-text"><strong>Email:</strong> ${formData.email}</p>
    <p class="card-text"><strong>Password:</strong> ${formData.password}</p>
    <hr />
    <div class="data-buttons">
      <button class="btn btn-primary edit-button" data-index="${index}" ">
        Edit
      </button>
      <button class="btn btn-danger delete-button" data-index="${index}" ">
        Delete
      </button>
    </div>
  </div>
`;

    mainData.appendChild(entryDiv);

    // Event listener for edit button
    entryDiv.querySelector(".edit-button")?.addEventListener("click", () => {
      const editId = Number(
        entryDiv.querySelector(".edit-button")?.getAttribute("data-index")
      );
      console.log("Edit button clicked for index:", editId);
      // Add your edit logic here
    });
    
  });
}
