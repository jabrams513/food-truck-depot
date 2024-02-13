import React, { useState } from "react";
import styles from "./Login.module.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() && password.trim()) {
      const currentUser = {
        email: email,
        password: password,
      };
      console.log("LOGGING CURRENT USER ENTRIES");
      console.log(currentUser);

      try {
        let data = await login({
          variables: {
            email: email,
            password: password,
          },
        });
        console.log("LOGGING RESPONSE");
        console.log(data);
        console.log("LOGGING TOKEN");
        console.log(data.data.login.token);
        Auth.login(data.data.login.token);
        // if (responseData) {
        //   //window.location.replace("/");
        // } else {
        //   alert("Error: " + data);
        // }
      } catch (e) {
        console.error("Error:", error);
        console.log("OTHER ERROR");
        console.log(e);
        alert("An error occurred while logging in.");
      }
    }
  };

  return (
    <main>
      <div className={styles["login-container"]}>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className={styles["custom-form-control"]}>
            <label>Login</label>
          </div>
          <div className={styles["custom-form-control"]}>
            <label>Email:</label>
            <br />
            <input
              className={styles["custom-form-input"]}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles["custom-form-control"]}>
            <label>Password:</label>
            <br />
            <input
              className={styles["custom-form-input"]}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles["custom-form-control"]}>
            <input
              id="login-btn-pg"
              className={styles["login-btn"]}
              type="submit"
              value="Login"
            />
          </div>
          <div className={styles["custom-form-control"]}>
            <label>
              <a href="/sign-up" className={styles["sign-up-btn"]}>
                Sign Up
              </a>
            </label>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
