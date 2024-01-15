// Password view icon section
document.addEventListener("DOMContentLoaded", () => {
  // Adding event listener to the "Toggle Password EYE" icon to switch between visible password and hidden password.
  const togglePasswordIcon = document.getElementById(
    "togglePassword"
  ) as HTMLElement; //Add Form
  const toggleEditPasswordIcon = document.getElementById(
    "toggleEditPassword"
  ) as HTMLElement; //Edit Form
  const toggleLoginPasswordIcon = document.getElementById(
    "toggleLoginPassword"
  ) as HTMLElement; //Login Form

  // Getting the password input value from the respective form
  const passwordInput = document.getElementById("password") as HTMLInputElement; //Add Form
  const editPasswordInput = document.getElementById(
    "editPassword"
  ) as HTMLInputElement; //Edit Form
  const signupPasswordInput = document.getElementById(
    "passwordSignup"
  ) as HTMLInputElement; //Signup Form
  const signupPasswordConfirmInput = document.getElementById(
    "confirmPassword"
  ) as HTMLInputElement; //Signup Form
  const showPasswordCheckbox = document.getElementById(
    "showPasswordCheckbox"
  ) as HTMLInputElement; //Signup Form
  const loginPasswordInput = document.getElementById(
    "loginPassword"
  ) as HTMLInputElement; //Login Form

  // For add form password section
  if (togglePasswordIcon && passwordInput) {
    togglePasswordIcon.addEventListener("click", () => {
      // Toggle
      togglePasswordVisibility(passwordInput, togglePasswordIcon);
    });
  }

  // For Edit Form Password Icon
  if (toggleEditPasswordIcon && editPasswordInput) {
    toggleEditPasswordIcon.addEventListener("click", () => {
      // Toggle
      togglePasswordVisibility(editPasswordInput, toggleEditPasswordIcon);
    });
  }

  // Using Checkbox FOR SIGN UP PAGE
  if (
    showPasswordCheckbox &&
    signupPasswordInput &&
    signupPasswordConfirmInput
  ) {
    showPasswordCheckbox.addEventListener("click", () => {
      // Toggle visibility for Signup Password
      togglePasswordVisibility(signupPasswordInput, showPasswordCheckbox);
      // Toggle visibility for Confirm Password
      togglePasswordVisibility(
        signupPasswordConfirmInput,
        showPasswordCheckbox
      );
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
  function togglePasswordVisibility(
    input: HTMLInputElement,
    toggleIcon: HTMLElement
  ) {
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
