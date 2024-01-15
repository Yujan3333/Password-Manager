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


//IF THE TOKEN EXPIRED CONDITION CHECK *****************************

// Function to check if the token has expired
function isTokenExpired(token:String) {
  if (!token) {
    return true; // Token is considered expired if it doesn't exist
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken || !decodedToken.exp) {
    return true; // Unable to decode token or no expiration time
  }

  const currentTime = Math.floor(Date.now() / 1000);  //gives time in seconds

  return decodedToken.exp < currentTime; // Check if the token has expired
}

// Function to log the user out and show an alert
function logout() {
  alert("Your session has expired. Please log in again."); 
  localStorage.removeItem("token");
  window.location.href = "./index.html"; // Redirect to the login page
}

// Parse JWT token to get its payload
function parseJwt(token:String) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null; // Return null if unable to parse the token
  }
}
