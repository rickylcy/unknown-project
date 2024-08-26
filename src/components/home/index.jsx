import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Box, Typography, Sheet, Button } from "@mui/joy";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        padding: 3,
        bgcolor: "background.level1",
      }}
    >
      <Sheet
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: "md",
          boxShadow: "lg",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Welcome
        </Typography>
        <Typography level="h6" component="h2" sx={{ mb: 4 }}>
          Hello{" "}
          {currentUser?.displayName
            ? currentUser.displayName
            : currentUser?.email}
          , you are now logged in.
        </Typography>

        <Typography level="body1" sx={{ mb: 2 }}>
          Explore your account settings or start using our services. We're
          excited to have you on board!
        </Typography>

        <Button
          component={Link}
          to="/profile"
          variant="solid"
          sx={{ bgcolor: "primary.main", mb: 2 }}
          fullWidth
        >
          Go to Profile
        </Button>

        <Button component={Link} to="/dashboard" variant="outlined" fullWidth>
          Explore Dashboard
        </Button>
      </Sheet>
    </Box>
  );
};

export default Home;
