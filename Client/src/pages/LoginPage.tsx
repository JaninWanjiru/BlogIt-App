import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import useUser from "../store/userStore";

function LoginPage() {
  const navigate = useNavigate();

  const {setUser} =useUser()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");

  const {isPending, mutate} = useMutation({
    mutationKey: ["signin-user"],
    mutationFn: async (signinData: { identifier: string; password: string}) => {
      const res = await axiosInstance.post("/api/auth/login", signinData);
      return res.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      } 
    },
    onSuccess: (data) => {
      setUser(data)
      navigate("/blogs");
    },
  })

  function handleSignin() {
    setError("")
    mutate({identifier, password})
  }
  
  return (
    <Box component="form" sx={{ bgcolor: "#fff",my: 3 }}>
      <Card elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 5, borderRadius: 4 }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Welcome Back, Storyteller
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
            Sign in to your BlogIt account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <Box>
            <TextField
              label="Email or Username"
              placeholder="Enter your email or username"
              fullWidth
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4 }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignin}
              loading={isPending}
              size="large"
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Typography align="center" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign up here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage; 