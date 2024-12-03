import React from "react";
import "../../admin/Home/Home.css";
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  const handleGoogleSignIn = () => {
    try {
      window.location.href = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google`;
    } catch (error) {
      console.error("Error redirecting to Google Sign-In:", error);
      alert("Failed to redirect to Google authentication.");
    }
  };

  const handleMicrosoftSignIn = () => {
    try {
      window.location.href = `${process.env.REACT_APP_BACKEND_SERVER_URL}/microsoft`;
    } catch (error) {
      console.error("Error redirecting to Microsoft Sign-In:", error);
      alert("Failed to redirect to Microsoft authentication.");
    }
  };

  return (
    <div className="home-container">
      <div className="signin-section">
        <h1 className="welcome-message">Sign in to CheckList Genie</h1>
        <p className="welcome-subtext">
          Welcome user, please sign in to continue
        </p>
        <div className="signin-buttons">
          <button className="signin-button google" onClick={handleGoogleSignIn}>
            <FcGoogle style={{ fontSize: "1.7rem", marginRight: "0.5rem" }} /> Sign In With Google
          </button>
          <button className="signin-button microsoft" onClick={handleMicrosoftSignIn}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDrif7V52AU5hUpNi-RGXdzeOmxdsdVoJ4Q&s"
              alt="Microsoft Logo"
              className="microsoft-logo"
            />
            Sign In With Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
