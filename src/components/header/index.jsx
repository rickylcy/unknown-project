import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { Box, Button, Typography } from "@mui/joy";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        width: "100%",
        zIndex: 20,
        position: "fixed",
        top: 0,
        left: 0,
        height: "48px",
        borderBottom: "1px solid",
        borderColor: "divider",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.level2",
      }}
    >
      {userLoggedIn ? (
        <Button
          onClick={() => {
            doSignOut().then(() => {
              navigate("/login");
            });
          }}
          variant="plain"
          sx={{ color: "primary.main" }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            component={Link}
            to="/login"
            variant="plain"
            sx={{ color: "primary.main" }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="plain"
            sx={{ color: "primary.main" }}
          >
            Register New Account
          </Button>
        </>
      )}
    </Box>
  );
};

export default Header;
