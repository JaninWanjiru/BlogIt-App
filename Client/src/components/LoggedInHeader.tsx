import { Stack, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface LoggedInHeaderProps {
  user: {
    firstName: string;
    lastName: string;
  };
}

function LoggedInHeader({ user }: LoggedInHeaderProps) {
  const navLinks = [
    { label: "Blogs", path: "/blogs" },
    { label: "New Blog", path: "/create-blog" },
    // { label: "Profile", path: "/profile" },
  ];

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {navLinks.map((link) => (
        <Link key={link.label} to={link.path} style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {link.label}
          </Typography>
        </Link>
      ))}
      <Typography variant="body2" sx={{ color: "#fff", mr: 1 }}>
        Welcome, {user.firstName}
      </Typography>
      <Avatar color="primary.main">
        {user.firstName[0]?.toUpperCase()}
        {user.lastName[0]?.toUpperCase()}
      </Avatar>
    </Stack>
  );
}

export default LoggedInHeader; 