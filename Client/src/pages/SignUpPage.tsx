import { Link as Link2 } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Link } from "@mui/material";

function SignUpPage() {
  return (
    <Box sx={{ bgcolor: "#fff",  pt: 2 }}>
      <Card sx={{ maxWidth: 440, mx: "auto", my: 5, borderRadius: 4, boxShadow: 3 }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Claim Your Space on BlogIt
          </Typography>
          <Typography color="#3C3D37" align="center" sx={{ mb: 4 }}>
            You bring the passion. We bring the platform
          </Typography>
          <Box component="form">
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography>First Name</Typography>
                <TextField
                  name="firstName"
                  placeholder="Enter First Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography>Last Name</Typography>
                <TextField
                  name="lasttName"
                  placeholder="Enter Last Name"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Typography>Username</Typography>
            <TextField
              name="username"
              placeholder="Enter your username"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography>Email</Typography>
            <TextField
              name="email"
              type="email"
              placeholder="john@gmail.com"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography>Password</Typography>
            <TextField
              name="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography>Confirm Password</Typography>
            <TextField
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              fullWidth
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
          <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={Link2} to="/login" color="primary">
              Sign in here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage; 