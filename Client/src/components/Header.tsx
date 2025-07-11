import { AppBar, Toolbar, Box, Stack, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton
            size="large"
            sx={{ marginRight: "auto", color: "#fff", fontWeight: "bold" }}
          >
            BlogIt
          </IconButton>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={3}>
          <Link to="/login">
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#3C3D37",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#3C3D37",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Sign Up
            </button>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
