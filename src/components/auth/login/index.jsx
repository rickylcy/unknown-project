import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Box,
  Sheet,
  Button,
  Input,
  Typography,
  CircularProgress,
} from "@mui/joy";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setErrorMessage(err.message);
        setIsSigningIn(false);
      });
    }
  };

  return (
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
        <Toaster toastOptions={{ duration: 4000 }} />
        {userLoggedIn && <Navigate to={"/home"} replace={true} />}
        <Typography level="h4" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        {errorMessage && (
          <Typography color="danger" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="solid"
            disabled={isSigningIn}
            sx={{ bgcolor: "primary.main" }}
          >
            {isSigningIn ? <CircularProgress size="small" /> : "Sign In"}
          </Button>
          <Button
            onClick={onGoogleSignIn}
            variant="outlined"
            disabled={isSigningIn}
          >
            {isSigningIn ? (
              <CircularProgress size="small" />
            ) : (
              "Sign In with Google"
            )}
          </Button>
        </Box>
      </Sheet>
    </Box>
  );
};

export default Login;
