import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import Icon from "../../Components/Icon";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const handleSignup = async () => {
    const isError = await signup(username, email, password);
    if (!isError) {
        setShowVerification(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getVerificationMail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if(data.message==="success"){
            setShowVerification(false);
            navigate("/");
        }
    }
  };
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/google/googleLogin`, "_self");
  };
    const handleTwitterLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/twitter/twitterLogin`, "_self");
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSignup();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [username, email, password]);
  return (
    <>
      <img src="/logo.png" className={styles.logo}></img>
      {showVerification && (
        <div className={styles.verificationMsg}>
          <Icon name="Mail" height="40px" color="#f8f8f8" />A verification email
          has been sent. Please confirm it from your inbox
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.header}>Sign up to KnowYourKOL</div>
        <div className={styles.dividerHorizontal}></div>
        <br />
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonFade}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className={styles.button} onClick={handleSignup}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.text}>Or</div>
        <br />
        <div className={styles.ssoContainer}>
          <button className={styles.ssoBtn} onClick={handleTwitterLogin}>
            <div className={styles.ssoText}>Sign in with Twitter (X)</div>
            <Icon name="X" width="10%"/>
          </button>
          <button className={styles.ssoBtn} onClick={handleGoogleLogin}>
            <div className={styles.ssoText}>Sign in with Google</div>
            <Icon name="Google" width="10%"/>
          </button>
        </div>
      </div>
    </>
  );
};
export default SignUp;
