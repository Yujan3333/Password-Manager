document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");
  const signupMessage = document.getElementById("signupMessage");

  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("passwordSignup") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      displayMessage("Password must contain 6 chars, 1 number, 1 symbol.","error");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      // alert('Passwords do not match');
      displayMessage("Passwords do not match", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // alert('Signup successful');
        displayMessage("Signup successful", "success");

        // Redirect to the login page
        window.location.href = "./index.html"; // Replace with the actual login page URL
      } else {
        // alert(data.error || 'Signup failed');
        displayMessage(data.error || "Signup failed", "error");
      }
    } catch (error) {
      console.error(error);
      // alert('An error occurred during signup');
      displayMessage("An error occurred during signup", "error");
    }
  });

  // Function to display messages in the signupMessage div
  const displayMessage = (
    message: string,
    messageType: "success" | "error"
  ) => {
    if (signupMessage) {
      signupMessage.textContent = message;
      signupMessage.className = `signup-message-${messageType}`;

      // Clear the message after 3 seconds
      setTimeout(() => {
        signupMessage.textContent = "";
        signupMessage.className = "";
      }, 3000);
    }
  };
});
