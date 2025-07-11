import { Link as Link2 } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Link } from "@mui/material";

function LoginPage() {
  return (
    <Box component="form" sx={{ bgcolor: "#fff",pt: 2 }}>
      <Card elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 6, borderRadius: 4 }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Welcome Back, Storyteller
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
            Sign in to your BlogIt account
          </Typography>
          <Box>
            <TextField
              label="Email or Username"
              placeholder="Enter your email or username"
              fullWidth
              required
              sx={{ mb: 3 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link component={Link2} to="/signup" color="primary">
              Sign up here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage; 