import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../axios";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { SIGN_UP_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

const EMAIL_REGEX = /.+@.+\..+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "/sign-up";

const SignUp = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [signup, { error }] = useMutation(SIGN_UP_USER);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
    console.log(email);
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    console.log(pwd);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CALLING SIGN UP");
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      console.log("VALID EMAIL AND PASSWORD");
      console.log(email);
      console.log(pwd);
      let { data } = await signup({
        variables: {
          email: email,
          password: pwd,
        },
      });
      console.log("LOGGING DATA");
      console.log(data);
      Auth.login(data.createUser.token);
      setSuccess(true);
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles["login-container"]}>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? styles["errmsg"] : styles["offscreen"]}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userEmail">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? styles["valid"] : styles["hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validName || !email ? styles["hide"] : styles["invalid"]
                }
              />
            </label>
            <input
              type="email"
              id="userEmail"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                !emailFocus || !email || validName
                  ? styles["offscreen"]
                  : styles["instructions"]
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must enter a valid email
              <br />
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? styles["valid"] : styles["hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPwd || !pwd ? styles["hide"] : styles["invalid"]
                }
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                !pwdFocus || validPwd
                  ? styles["offscreen"]
                  : styles["instructions"]
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validMatch && matchPwd ? styles["valid"] : styles["hide"]
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatch || !matchPwd ? styles["hide"] : styles["invalid"]
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                !matchFocus || validMatch
                  ? styles["offscreen"]
                  : styles["instructions"]
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <span className="sign-up-btn">
              <button disabled={!validName || !validPwd || !validMatch}>
                Sign Up
              </button>
            </span>
          </form>
          <p>
            Already Signed Up?
            <br />
            <span className="login-btn">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default SignUp;
