// deleteVault.ts

// Function to handle the deletion of a vault entry
const handleDelete = (id: number): Promise<void> => {
    const token = localStorage.getItem("token");
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
  
    return fetch(`http://127.0.0.1:8000/vaults/${id}`, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => response.json())
      .then(() => {
        // After successful deletion, fetch and display updated data
        return Promise.resolve();
      })
      .catch((error) => {
        console.error("Error:", error);
        return Promise.reject(error);
      });
  };
  