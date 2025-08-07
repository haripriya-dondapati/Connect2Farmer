async function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username-1').value;
  const password = document.getElementById('pswd-1').value;

  try {
      const response = await fetch('http://localhost:3000/auth/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: username,
              password: password
          })
      });

      const data = await response.json();

      if (response.ok) {
          
          localStorage.setItem('authToken', data.jwtToken);
        //   alert('Login successful!');
        simulateSignIn(true);
          setTimeout(() => {
            window.location.href = '../frontend/index.html';
          }, 2000);
          
      } else {
          alert(data.message )
      }
  } catch (error) {
      console.error('Login error:', error);
    //   alert('An error occurred during login. Please try again.');
    simulateSignIn(false)
  }
}

// Function to handle registration form submission
async function handleRegistration(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pswd').value;

  try {
      const response = await fetch('http://localhost:3000/auth/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              email: email,
              password: password
          })
      });

      const data = await response.json();

      if (response.ok) {
        simulateSignUp(true)
          alert('Registration successful! Please login.');
          // Clear the form
          document.getElementById('RegForm').reset();

          // Optionally switch to login form
          // Add your logic to switch forms here
      } else {
          alert(data.message || 'Registration failed. Please try again.');
      }
  } catch (error) {
      console.error('Registration error:', error);
      simulateSignUp(false)
    //   alert('An error occurred during registration. Please try again.');
  }
}

// Add event listeners to forms
document.getElementById('LoginForm').addEventListener('submit', handleLogin);
document.getElementById('RegForm').addEventListener('submit', handleRegistration);


function showPopup(success, message) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = `popup ${success ? 'success' : 'error'}`;
    
    // Add content
    popup.innerHTML = `
      <span class="popup-icon">${success ? '✓' : '✕'}</span>
      <span>${message}</span>
      <span class="popup-close" onclick="this.parentElement.remove()">×</span>
    `;
    
    // Add to document
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 300);
    }, 3000);
  }

 
  function simulateSignIn(success) {
    if (success) {
      showPopup(true, "Successfully signed in! please login");
    } else {
      showPopup(false, "Sign in failed. Please try again.");
    }
  }
  function simulateSignUp(success) {
    if (success) {
      showPopup(true, "Successfully signUp!");
    } else {
      showPopup(false, "SignUp failed. Please try again.");
    }
  }