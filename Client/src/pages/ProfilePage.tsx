import { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import useUser from "../store/userStore";
import ProfileForm from "../components/ProfileForm";
import UserBlogs from "../components/UserBlogs";

function ProfilePage() {
  const { logoutUser } = useUser();
  const [showBlogs, setShowBlogs] = useState(false);

  function handleToggleBlogs() {
    setShowBlogs(!showBlogs);
  }

  return (
    <Box sx={{ py: 3, bgcolor: "#F8F8F8", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 500, mx: "auto", px: 2 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary" sx={{ mb: 4 }}>Profile</Typography>
        {showBlogs ? (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileForm />
              <Button variant="outlined" color="error" fullWidth onClick={logoutUser} sx={{ fontWeight: "bold", borderRadius: 2, mb: 2 }}>Log Out</Button>
              <Button variant="contained" fullWidth onClick={handleToggleBlogs} sx={{ fontWeight: "bold", borderRadius: 2 }}>
                Hide My Blogs
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <UserBlogs />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ProfileForm />
            <Button variant="outlined" color="error" fullWidth onClick={logoutUser} sx={{ fontWeight: "bold", borderRadius: 2, mb: 2, maxWidth: 400 }}>Log Out</Button>
            <Button variant="contained" fullWidth onClick={handleToggleBlogs} sx={{ fontWeight: "bold", borderRadius: 2, maxWidth: 400 }}>
              Show My Blogs
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;