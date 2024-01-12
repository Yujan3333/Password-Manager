  // Logout functionality
  const logoutButton = document.getElementById("logout") as HTMLElement;

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Clear token from local storage
      localStorage.removeItem("token");

      // Redirect to index page i.e. Login page
      window.location.href = "./index.html";
    });
  }