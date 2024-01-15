//scripts/Form.ts


const addButton = document.getElementById("addButton") as HTMLElement;
const addForm = document.getElementById("addForm") as HTMLFormElement;
// const submitFormButton = document.getElementById("submitForm") as HTMLElement;
const cancelFormButton = document.getElementById("cancelForm") as HTMLElement;
const mainData = document.querySelector(".main-data") as HTMLElement;
const mainBody = document.querySelector(".main-body") as HTMLElement;

// Load existing data from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  //Sending a Get Request to backend
  fetchVaults();
});

// ADD VAULT FORM *********************************************
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


  //Getting the token in local storage
  const token = localStorage.getItem("token");
  //sending the token thourgh header
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  console.log("Sending POST req", token);
  //SENDING POST request to the backend to store the vault data
  const formData = {
    website: websiteInput.value,
    email: emailInput.value,
    sitepassword: passwordInput.value,
  };

  // Send data to the backend************************************************
  fetch("http://127.0.0.1:8000/vaults", {
    method: "POST",
    headers: headers,
    // {"Content-Type": "application/json"},
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchVaults(); // Refresh the displayed vaults after adding a new one
    })
    .catch((error) => console.error("Error:", error));


  // Reset the form elements to their default values
  addForm.reset();
  updatePasswordStrengthIndicator();  //Update the strength checker to remove it
  // Display Change
  addForm.style.display = "none"; // Hide the form after successful submission
  mainBody.style.display = "block"; //Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
});


//Showing the fetched data in frontend "class: main-data"**********************************
function fetchVaults() {

  //Sending the token to backend as well for userId verify
  const token = localStorage.getItem("token");

  // CHECK IF TOKEN EXPIRED ******************************************************
  if(token){  //due to token possibly being null
    if (isTokenExpired(token)) {
      logout();
    }
  }

  // Put token in Header
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  //Get Data From Backend
  fetch("http://127.0.0.1:8000/vaults", {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      displayFormData(data);
    })
    .catch((error) => console.error("Error:", error));
}

//CANCEL THE ADD FORM *************************
cancelFormButton.addEventListener("click", () => {
  addForm.style.display = "none"; // Hide the form on cancel
  mainBody.style.display = "block"; // Back to default
  mainData.style.display = "grid"; // Show main body when form is hidden
  // Reset the form elements to their default values
  addForm.reset();
  updatePasswordStrengthIndicator(); //if password field null doesnot show strength indicator in strengthChecker.ts
});

 //Toggle the Eye Section for maindata class
 function togglePasswordVisibility(index:number) {
  const passwordInput = document.getElementById(`passwordMainData${index}`) as HTMLInputElement;
  const toggleIcon = document.getElementById(`togglePasswordIconMainData${index}`) as HTMLElement;

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("uil-eye-slash");
      toggleIcon.classList.add("uil-eye");
  } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("uil-eye");
      toggleIcon.classList.add("uil-eye-slash");
  }
}


//DISPLAY DATA ************************************
// Interface for each form in the frontend
interface FormDataAll {
  id: number;
  website: string;
  email: string;
  sitepassword: string;
}

//Displaying the card ******************************************
function displayFormData(formDataArray: FormDataAll[]) {
  const mainData = document.querySelector(".main-data") as HTMLElement;
  mainData.innerHTML = ""; // Clear existing content

  console.log(
    "Checking jwt token expired or not is not Array yes expired",
    formDataArray
  ); //MayNotBeReceived if jwt is expired

  // Reverse the formDataArray to display latest update at first
  // formDataArray.reverse();

  // Generates the HTML element for data fetched from backend **********************
  formDataArray.forEach((formData, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "data-entry card mb-3";
    entryDiv.innerHTML = `
    <div class="card-body ">
    <p class="card-title"> <strong>Website:</strong> ${formData.website}</p>
    <p class="card-text"><strong>Email:</strong> ${formData.email}</p>
    <strong>Password:</strong> </br>
    <div class="password-container">
            <input type="password" id="passwordMainData${index}" value="${formData.sitepassword}" class="card-text" readonly>
            <i id="togglePasswordIconMainData${index}" class="toggle-password-icon-main uil uil-eye-slash" onclick="togglePasswordVisibility(${index})"></i>
    </div>
            <hr />
    <div class="data-buttons">
      <button class="btn btn-primary edit-button" data-index="${index}" data-id="${formData.id}" ">
        Edit
      </button>
      <button class="btn btn-danger delete-button" data-index="${index}" data-id="${formData.id}" ">
        Delete
      </button>
    </div>
  </div>
`;

    mainData.appendChild(entryDiv);
      

    // Event listener for edit button in the main body
    // When edit button clicks loads the data in the editForm
    entryDiv.querySelector(".edit-button")?.addEventListener("click", () => {
      const dataIndex = Number(
        entryDiv.querySelector(".edit-button")?.getAttribute("data-index")
      );

      // Extract the data of the selected entry
      const selectedEntry = formDataArray[dataIndex];

      // Update the edit form with the selected entry data***************************************
      const editForm = document.getElementById("editForm") as HTMLFormElement;
      const editWebsiteInput = document.getElementById(
        "editWebsite"
      ) as HTMLInputElement;
      const editEmailInput = document.getElementById(
        "editEmail"
      ) as HTMLInputElement;
      const editPasswordInput = document.getElementById(
        "editPassword"
      ) as HTMLInputElement;
      //TO STORE THE formData.id
      const editEntryIdInput = document.getElementById(
        "editEntryId"
      ) as HTMLInputElement;

      editWebsiteInput.value = selectedEntry.website;
      editEmailInput.value = selectedEntry.email;
      editPasswordInput.value = selectedEntry.sitepassword;

      const editId = Number(
        entryDiv.querySelector(".edit-button")?.getAttribute("data-id")
      );
      // Set the value of the hidden input with formData.id
      editEntryIdInput.value = editId.toString(); //changing number to string

      // Show the edit form and hide the add form
      editForm.style.display = "block";
      addForm.style.display = "none";
      mainBody.style.display = "flex";
      mainBody.style.alignItems = "center";
      mainBody.style.justifyContent = "center";
      mainData.style.display = "none"; // Hide main body when form is displayed
    });

    // Event listener for cancel button in the edit form*********************************
    document.getElementById("cancelEditForm")?.addEventListener("click", () => {
      const editForm = document.getElementById("editForm") as HTMLFormElement;
      editForm.style.display = "none"; // Hide the edit form on cancel
      mainBody.style.display = "block"; // Back to default
      mainData.style.display = "grid"; // Show main body when form is hidden
    });

    // WHen DELETE button is clicked Event Listener for it **********************************
    // Event listener for delete button in the main body
    entryDiv.querySelector(".delete-button")?.addEventListener("click", () => {
      const deleteId = Number(
        entryDiv.querySelector(".delete-button")?.getAttribute("data-id")
      );

      // Call the handleDelete function from deleteForm.ts
      handleDelete(deleteId)
        .then(() => {
          // After successful deletion, re-fetch and display updated data
          fetchVaults();
        })
        .catch((error) => console.error("Error:", error));
    });

   
  });


}


