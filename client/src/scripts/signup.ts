document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Signup successful');
                
                // Redirect to the login page
                window.location.href = './index.html'; // Replace with the actual login page URL
            } else {
                alert(data.error || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during signup');
        }
    });
});
