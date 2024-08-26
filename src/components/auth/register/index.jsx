import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { Box, Button, Input, Typography, Sheet } from "@mui/joy";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/home");
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100vw",
          bgcolor: "background.level1",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 400,
            p: 4,
            borderRadius: "md",
            boxShadow: "lg",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            level="h4"
            component="h3"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            Create a New Account
          </Typography>
          <form onSubmit={onSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography level="body2" fontWeight="bold">
                Email
              </Typography>
              <Input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body2" fontWeight="bold">
                Password
              </Typography>
              <Input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body2" fontWeight="bold">
                Confirm Password
              </Typography>
              <Input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
            </Box>

            {errorMessage && (
              <Typography color="danger" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              sx={{ bgcolor: "primary.main", mb: 2 }}
              disabled={isRegistering}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </Button>
            <Typography level="body2" textAlign="center">
              Already have an account?{" "}
              <Link
                to={"/login"}
                style={{
                  color: "#1976d2",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Continue
              </Link>
            </Typography>
          </form>
        </Sheet>
      </Box>
    </>
  );
};

export default Register;
