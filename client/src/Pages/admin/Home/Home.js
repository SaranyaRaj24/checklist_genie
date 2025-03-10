import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button, Typography, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
 
const BackgroundContainer = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #ffffff,#4682b4)",
  position: "fixed",
  top: 0,
  left: 0,
});
 
const SignInCard = styled(Paper)({
  padding: "2.5rem",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  maxWidth: "400px",
  width: "90%",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  color: "#333",
  zIndex: 2,
});
 
const SignInButton = styled(Button)({
  width: "100%",
  marginTop: "1.2rem",
  padding: "12px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#25274D",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1e2240",
  },
});
 
const GoogleSignInButton = styled(Button)({
  width: "100%",
  marginTop: "1.2rem",
  padding: "12px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  color: "#333",
  border: "1px solid #ccc",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});
 
const Home = () => {
  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google`;
  };
 
  const handleMicrosoftSignIn = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER_URL}/microsoft`;
  };
 
  return (
    <BackgroundContainer>
      <SignInCard elevation={3}>
        <Typography variant="h4" fontWeight="700" color="#25274D" gutterBottom>
          CHECKLIST GENIE
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Streamline your workflow and boost productivity with CheckList Genie.
        </Typography>
        <GoogleSignInButton
          variant="outlined"
          startIcon={<FcGoogle size={24} style={{ marginRight: "8px" }} />}
          onClick={handleGoogleSignIn}
        >
          Sign In With Google
        </GoogleSignInButton>
        <SignInButton
          variant="contained"
          startIcon={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Logo"
              style={{ width: 20, height: 20, marginRight: "8px" }}
            />
          }
          onClick={handleMicrosoftSignIn}
        >
          Sign In With Microsoft
        </SignInButton>
      </SignInCard>
    </BackgroundContainer>
  );
};
 
export default Home;
 