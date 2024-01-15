  // // Password view icon section
  // // Adding event listener to the "Toggle Password" icon to switch between visible password and hidden password.
  // const togglePasswordIcon = document.getElementById("togglePassword");
  // const passwordInput = document.getElementById("password") as HTMLInputElement;
  
  // if (togglePasswordIcon && passwordInput) {
  //   togglePasswordIcon.addEventListener("click", () => {
  //     // Toggle 
  //     if (passwordInput.type === "password") {
  //       passwordInput.type = "text";
  //       togglePasswordIcon.classList.remove("uil-eye-slash");
  //       togglePasswordIcon.classList.add("uil-eye");
  //     } else {
  //       passwordInput.type = "password";
  //       togglePasswordIcon.classList.remove("uil-eye");
  //       togglePasswordIcon.classList.add("uil-eye-slash");
  //     }
  //   });
  // }
  



  // Password view icon section
document.addEventListener('DOMContentLoaded', () => {
// Adding event listener to the "Toggle Password" icon to switch between visible password and hidden password.
const togglePasswordIcon = document.getElementById("togglePassword") as HTMLElement;  //Add Form
const toggleEditPasswordIcon = document.getElementById("toggleEditPassword") as HTMLElement;  //Edit Form
// const togglePasswordSignupIcon = document.getElementById("toggle-password-signup") as HTMLElement;  //Signup Form
// const togglePasswordSignupConfirmIcon = document.getElementById("toggle-password-signup-confirm") as HTMLElement;  //Signup Form
const toggleLoginPasswordIcon = document.getElementById("toggleLoginPassword") as HTMLElement;  //Login Form


const passwordInput = document.getElementById("password") as HTMLInputElement;  //Add Form
const editPasswordInput = document.getElementById("editPassword") as HTMLInputElement;  //Edit Form
const signupPasswordInput = document.getElementById("passwordSignup") as HTMLInputElement;  //Signup Form
const signupPasswordConfirmInput = document.getElementById("confirmPassword") as HTMLInputElement;  //Signup Form
const showPasswordCheckbox = document.getElementById("showPasswordCheckbox") as HTMLInputElement;  //Signup Form
const loginPasswordInput = document.getElementById("loginPassword") as HTMLInputElement;  //Login Form

// For add form password section
if (togglePasswordIcon && passwordInput) {
  togglePasswordIcon.addEventListener("click", () => {
    // Toggle 
    togglePasswordVisibility(passwordInput, togglePasswordIcon);
    // if (passwordInput.type === "password") {
    //   passwordInput.type = "text";
    //   togglePasswordIcon.classList.remove("uil-eye-slash");
    //   togglePasswordIcon.classList.add("uil-eye");
    // } else {
    //   passwordInput.type = "password";
    //   togglePasswordIcon.classList.remove("uil-eye");
    //   togglePasswordIcon.classList.add("uil-eye-slash");
    // }
  });
}

// For Edit Form Password Icon
if (toggleEditPasswordIcon && editPasswordInput) {
  toggleEditPasswordIcon.addEventListener("click", () => {

    // Toggle 
    togglePasswordVisibility(editPasswordInput, toggleEditPasswordIcon);
    // if (editPasswordInput.type === "password") {
    //   editPasswordInput.type = "text";
    //   toggleEditPasswordIcon.classList.remove("uil-eye-slash");
    //   toggleEditPasswordIcon.classList.add("uil-eye");
    // } else {
    //   editPasswordInput.type = "password";
    //   toggleEditPasswordIcon.classList.remove("uil-eye");
    //   toggleEditPasswordIcon.classList.add("uil-eye-slash");
    // }
  });
}
// // For Signup Form Password Icon
// if (togglePasswordSignupIcon && signupPasswordInput) {
//   togglePasswordSignupIcon.addEventListener("click", () => {
//     // Toggle 
//     togglePasswordVisibility(signupPasswordInput, togglePasswordSignupIcon);
//   });
// }

// // For Signup  Form Confirm Password Icon
// if (togglePasswordSignupConfirmIcon && signupPasswordConfirmInput) {
//   togglePasswordSignupConfirmIcon.addEventListener("click", () => {
//     // Toggle 
//     togglePasswordVisibility(signupPasswordConfirmInput, togglePasswordSignupConfirmIcon);
//   });
// }

  // Using Checkbox FOR SIGN UP PAGE
  if (showPasswordCheckbox && signupPasswordInput && signupPasswordConfirmInput) {
    showPasswordCheckbox.addEventListener("click", () => {
      // Toggle visibility for Signup Password
      togglePasswordVisibility(signupPasswordInput, showPasswordCheckbox);
      // Toggle visibility for Confirm Password
      togglePasswordVisibility(signupPasswordConfirmInput, showPasswordCheckbox);
    });
  }


  // For Login Page
if (toggleLoginPasswordIcon && loginPasswordInput) {
  toggleLoginPasswordIcon.addEventListener("click", () => {
    // Toggle 
    togglePasswordVisibility(loginPasswordInput, toggleLoginPasswordIcon);
  });
}

//FUNCTION FOR PASSWORD ICON AND VISIBILITY
function togglePasswordVisibility(input: HTMLInputElement, toggleIcon: HTMLElement) {
  // Toggle 
  if (input.type === "password") {
    input.type = "text";
    toggleIcon.classList.remove("uil-eye-slash");
    toggleIcon.classList.add("uil-eye");
  } else {
    input.type = "password";
    toggleIcon.classList.remove("uil-eye");
    toggleIcon.classList.add("uil-eye-slash");
  }
}
});