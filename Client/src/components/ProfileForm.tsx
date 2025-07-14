import { Box, Card, CardContent, Typography, TextField, Button, Alert, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import useUser from "../store/userStore";
import { toast } from 'react-toastify';

function ProfileForm() {
  const { user } = useUser();
  const [profile, setProfile] = useState({ 
    firstName: "", 
    lastName: "", 
    userName: "", 
    email: "" 
  });
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userName: user.userName || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const { isPending: isProfilePending, mutate: mutateProfile } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (profileData: {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
    }) => {
      const response = await axiosInstance.put("/api/auth/profile", profileData);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.msg);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      toast.success('Profile updated successfully', {
        theme: "colored",
        position: "top-center"
      })
    },
  });

  function handleUpdateProfile() {
    const updatedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      userName: profile.userName,
      email: profile.email
    };
    mutateProfile(updatedProfile);
  }
  
  const { isPending: isPasswordPending, mutate: mutatePassword } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (passwordData: {
      current: string;
      new: string;
    }) => {
      const response = await axiosInstance.put("/api/auth/password", passwordData);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.msg);
      } else {
        setError("There was a hiccup on our end. Please try again.");
      }
    },
    onSuccess: () => {
      toast.success('Password updated successfully', {
        theme: "colored",
        position: "top-center"
      })
    },
  });

  function handleUpdatePassword() {
    const updatedPassword = {
      current: passwords.current,
      new: passwords.new
    };
    mutatePassword(updatedPassword);
  }
  
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F8F8F8" }}>
      <Card elevation={3} sx={{ borderRadius: 4, mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 2 }}>{user?.firstName?.[0]}{user?.lastName?.[0]}</Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">{user?.firstName} {user?.lastName}</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Update Profile</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField label="First Name" fullWidth value={profile.firstName} 
            onChange={(e) => setProfile({...profile, firstName: e.target.value})} sx={{ mb: 2 }} />
          <TextField label="Last Name" fullWidth value={profile.lastName} 
            onChange={(e) => setProfile({...profile, lastName: e.target.value})} sx={{ mb: 2 }} />
          <TextField label="Username" fullWidth value={profile.userName} 
            onChange={(e) => setProfile({...profile, userName: e.target.value})} sx={{ mb: 2 }} />
          <TextField label="Email" fullWidth value={profile.email} 
            onChange={(e) => setProfile({...profile, email: e.target.value})} sx={{ mb: 2 }} />
          <Button variant="contained" fullWidth onClick={handleUpdateProfile} 
            loading={isProfilePending} sx={{ fontWeight: "bold", borderRadius: 2, mb: 2 }}>
            update Profile
          </Button>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Update Password</Typography>
          <TextField label="Current Password" type="password" fullWidth value={passwords.current} 
            onChange={(e) => setPasswords({...passwords, current: e.target.value})} sx={{ mb: 2 }} />
          <TextField label="New Password" type="password" fullWidth value={passwords.new} 
            onChange={(e) => setPasswords({...passwords, new: e.target.value})} sx={{ mb: 2 }} />
          <Button variant="contained" fullWidth onClick={handleUpdatePassword} 
            loading={isPasswordPending} sx={{ fontWeight: "bold", borderRadius: 2, mb: 2 }}>
            update Password
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfileForm; 