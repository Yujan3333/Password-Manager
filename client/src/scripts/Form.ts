//scripts/addDataForm.ts

const addButton = document.getElementById("addButton") as HTMLElement;
const addForm = document.getElementById("addForm") as HTMLFormElement;
// const submitFormButton = document.getElementById("submitForm") as HTMLElement;
const cancelFormButton = document.getElementById("cancelForm") as HTMLElement;
const mainData = document.querySelector(".main-data") as HTMLElement;
const mainBody = document.querySelector(".main-body") as HTMLElement;

// Load existing data from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // // FOR LOCAL STORAGE******
  // const storedData = JSON.parse(localStorage.getItem("formData") || "[]");
  // displayFormData(storedData);
  fetchVaults();
});

addButton.addEventListener("click", () => {
  //Make the form visible and make it come to center
  addForm.style.display = "block";
  mainBody.style.display = "flex";
  mainBody.style.alignItems = "center";
  mainBody.style.justifyContent = "center";

  mainData.style.display = "none"; // Hide main body when form is displayed
});

// addForm.addEventListener("submit", () => {
  addForm.addEventListener("submit", (event) => {
  event.preventDefault(); // On submit page refresh stop

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

  // // Save the form data in local storage
  // const storedData = JSON.parse(localStorage.getItem("formData") || "[]");
  // const formData = {
  //   website: websiteInput.value,
  //   email: emailValue,
  //   password: passwordInput.value,
  // };

  // storedData.push(formData);
  // localStorage.setItem("formData", JSON.stringify(storedData));

  // // Display the form data in the main-body
  // displayFormData(storedData);

  //Getting the token in local storage
  const token = localStorage.getItem("token"); 
  console.log(token);
  //SENDING POST request to the backend to store the vault data
  const formData = {
    website: websiteInput.value,
    email: emailInput.value,
    sitepassword: passwordInput.value,
    token:token,
  };

  // Send data to the backend
  fetch('http://127.0.0.1:8000/vaults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    fetchVaults(); // Refresh the displayed vaults after adding a new one
  })
  .catch(error => console.error('Error:', error));


  addForm.style.display = "none"; // Hide the form after successful submission
  mainBody.style.display = "block"; //Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
});

//Validating the email part
function isValidEmail(email: string): boolean {
  // Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}


//Showing the fetched data in frontend "class: main-data"
function fetchVaults() {
  // Fetch vault data from the backend
  fetch('http://127.0.0.1:8000/vaults/9')     //Here i am sending userId in the url
    .then(response => response.json())
    .then(data => {
      displayFormData(data);
    })
    .catch(error => console.error('Error:', error));
}

cancelFormButton.addEventListener("click", () => {
  addForm.style.display = "none"; // Hide the form on cancel
  mainBody.style.display = "block"; // Back to default
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

// Interface for each form in the frontend
interface FormDataAll {
  website: string;
  email: string;
  password: string;
}

//Displaying the card and its related data in edit 
function displayFormData(formDataArray: FormDataAll[]) {
  const mainData = document.querySelector(".main-data") as HTMLElement;
  mainData.innerHTML = ""; // Clear existing content

  formDataArray.forEach((formData, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "data-entry card mb-3";
    entryDiv.innerHTML = `
    <div class="card-body ">
    <h5 class="card-title">Website: ${formData.website}</h5>
    <p class="card-text"><strong>Email:</strong> ${formData.email}</p>
    Password: 
    <input type="password" value="${formData.password}" class="card-text" readonly>
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

      // Create an edit form
      const editForm = document.createElement("form");
      // editForm.innerHTML = `
      //   <label for="editWebsite">Website:</label>
      //   <input type="text" id="editWebsite" name="editWebsite" value="${formData.website}" required /><br />
      //   <label for="editEmail">Email:</label>
      //   <input type="email" id="editEmail" name="editEmail" value="${formData.email}" required /><br />
      //   <label for="editPassword">Password:</label>
      //   <input type="password" id="editPassword" name="editPassword" value="${formData.password}" required /><br />
      //   <button type="button" class="btn btn-primary" id="submitEditForm">Submit</button>
      // `;

      editForm.innerHTML = `
      <form>
        <div class="form-group p-2 ">
          <label for="editWebsite">Website:</label>
          <input type="text" class="form-control" id="editWebsite" name="editWebsite" value="${formData.website}" required />
        </div>
        <div class="form-group p-2">
          <label for="editEmail">Email:</label>
          <input type="email" class="form-control" id="editEmail" name="editEmail" value="${formData.email}" required />
        </div>
        <div class="form-group p-2">
          <label for="editPassword">Password:</label>
          <input type="password" class="form-control" id="editPassword" name="editPassword" value="${formData.password}" required />
        </div>
        <button type="button" class="btn btn-primary p-2" id="submitEditForm">Submit</button>
      </form>
    `;

      // Replace entryDiv content with the edit form
      entryDiv.innerHTML = "";
      entryDiv.appendChild(editForm);

      // Event listener for submit button in the edit form
      editForm
        .querySelector("#submitEditForm")
        ?.addEventListener("click", () => {
          // Update the formDataArray with the edited data
          formDataArray[editId] = {
            website: (
              editForm.querySelector("#editWebsite") as HTMLInputElement
            ).value,
            email: (editForm.querySelector("#editEmail") as HTMLInputElement)
              .value,
            password: (
              editForm.querySelector("#editPassword") as HTMLInputElement
            ).value,
          };

          // Save the updated formDataArray to local storage
          localStorage.setItem("formData", JSON.stringify(formDataArray));

          // Display the updated form data
          displayFormData(formDataArray);
        });
    });
  });
}
