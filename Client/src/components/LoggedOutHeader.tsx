import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

function LoggedOutHeader() {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "0.5rem 1rem",
            background: "#3C3D37",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: "0.875rem",
          }}
        >
          Login
        </button>
      </Link>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "0.5rem 1rem",
            background: "#3C3D37",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: "0.875rem",
          }}
        >
          Sign Up
        </button>
      </Link>
    </Stack>
  );
}

export default LoggedOutHeader; 