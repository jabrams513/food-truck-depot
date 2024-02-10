import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() && password.trim()) {
      const currentUser = {
        email: email,
        password: password
      };

      const stringUser = JSON.stringify(currentUser);

      try {
        const responseData = await fetch('/api/users/login', {
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
        alert('An error occurred while logging in.');
      }
    }
  };

  return (
    <main>
      <div className="login-container">
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="custom-form-control">
            <label>Login</label>
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
            <input id="login-btn-pg" type="submit" value="Login" />
          </div>
          <div className="custom-form-control">
            <label><a href="/sign-up">Sign Up</a></label>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;