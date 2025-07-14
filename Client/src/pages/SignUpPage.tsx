import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

function SignUpPage() {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const {isPending, mutate} = useMutation({
    mutationKey: ["signup-user"],
    mutationFn: async (newUser: { firstName: string; lastName: string; userName: string; email: string; password: string }) => {
      const res = await axiosInstance.post("/api/auth/register", newUser);
      return res.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  }); 

  function handleCreateAcc() {
    setError("");
    if (pass !== confirmPass) {
      setError("Passwords don't match");
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: pass,
    };
    mutate(newUser);
  }

  return (
    <Box sx={{ bgcolor: "#fff", pt: 2 }}>
      <Card sx={{ maxWidth: 440, mx: "auto", my: 5, borderRadius: 4, boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
            Claim Your Space on Blogit
          </Typography>
          <Typography textAlign="center" color="#3C3D37" mb={4}>
            You bring the passion. We bring the platform
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form">
              <Typography color="primary">First Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Typography color="primary" mt={1}>Last Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <Typography color="primary" mt={1}>Username</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Choose username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Typography color="primary" mt={1}>Email</Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Typography color="primary" mt={1}>Password</Typography>
              <TextField
                fullWidth
                size="small"
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <Typography color="primary" mt={1}>Confirm Password</Typography>
              <TextField
                fullWidth
                size="small"
                type="password"
                placeholder="Confirm password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCreateAcc}
              loading={isPending}
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mt: 2 }}
            >
              Create Account
            </Button>
          </Box>

          <Typography textAlign="center" mt={2} color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Login here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUpPage;
