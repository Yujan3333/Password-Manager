document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const loginMessage = document.getElementById("loginMessage");

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to local storage
        localStorage.setItem("token", data.token);

        // Redirect to dashboard.html
        window.location.href = "./dashboard.html";
      } else {
        // alert(data.error || "Login failed");
        displayMessage(data.error || "Login failed", "error");
      }
    } catch (error) {
      console.error(error);
      // alert("An error occurred during login");
      displayMessage("An error occurred during login", "error");
    }
  });

  // Function to display messages
  const displayMessage = (message: string, messageType: "success" | "error") => {
    if (loginMessage) {
        loginMessage.textContent = message;
        loginMessage.className = `login-message-${messageType}`;

        //removing the message after 3 seconds
        setTimeout(() => {
          loginMessage.textContent = '';
          loginMessage.className = '';
      }, 3000);
    }
};

});
