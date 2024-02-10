import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email and password are not empty or whitespace
    if (email.trim() && password.trim()) {
      const newUser = {
        email: email,
        password: password
      };

      const stringUser = JSON.stringify(newUser);

      try {
        const responseData = await fetch('/api/users/', {
          method: 'POST',
          body: stringUser,
          headers: { 'Content-Type': 'application/json' },
        });

        if (responseData.ok) {
          window.location.replace('/');
        } else {
          alert('Error: ' + responseData.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing up.');
      }
    }
  };

  return (
    <main>
      <div className="login-container">
        <form id="sign-up-form" onSubmit={handleSubmit}>
          <div className="custom-form-control">
            <label>Sign Up</label>
          </div>
          <div className="custom-form-control">
            <label>Email:</label><br />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="custom-form-control">
            <label>Password:</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="custom-form-control">
            <input id="sign-up-btn-pg" type="submit" value="Sign Up" />
          </div>
          <div className="custom-form-control">
            <label><a href="/login">Login</a></label>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
