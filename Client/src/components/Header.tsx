import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../store/userStore";
import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

function Header() {
  const { user } = useUserStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton
            size="large"
            sx={{
              marginRight: "auto",
              color: "#fff",
              fontWeight: "bold",
              fontFamily: '"Corben", serif',
            }}
          >
            BlogIt
          </IconButton>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {user ? <LoggedInHeader user={user} /> : <LoggedOutHeader />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;