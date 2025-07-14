import {Box, Card, CardContent, Typography, TextField, Button, Alert} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import { toast } from 'react-toastify';

function CreateBlogPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [error, setError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async (blogData: {
      title: string;
      synopsis: string;
      content: string;
      featuredImage: string;
    }) => {
      const response = await axiosInstance.post("/api/blogs", blogData);
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
      toast.success('Blog created successfully', {
        theme: "light",
        position: "top-center"
      })
      navigate("/blogs");
    },
  });

  function handleCreateBlog() {
    const newBlog = {title: title, synopsis: synopsis, content: content, featuredImage: featuredImage};
    mutate(newBlog);
  }

  return(
    <Box sx={{ bgcolor: "#fff", pt: 2 }}>
      <Card elevation={3} sx={{ maxWidth: 500, mx: "auto", my: 5, borderRadius: 4}}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
            Share Your Story
          </Typography>
          <Typography textAlign="center" color="#3C3D37" mb={3}>
            Create a new blog post and let your voice be heard
          </Typography>

          {error && (<Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>)}

          <Box component="form">
            <Typography color="primary">Title</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter blog title"
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            
            <Typography color="primary">Synopsis</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Brief description of your blog"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              required
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
            
            <Typography color="primary">Featured Image URL</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter image URL (optional)"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <Typography color="primary">Content</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Write your blog content in markdown format..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              multiline
              rows={6}
              sx={{ mb: 2 }}
            />
            
            <Button
              type="button"
              variant="contained"
              fullWidth
              size="medium"
              onClick={handleCreateBlog}
              loading={isPending}
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mt: 2 }}
            >
              Create Blog
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateBlogPage;
