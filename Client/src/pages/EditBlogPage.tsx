import { Box, Card, CardContent, Typography, TextField, Button} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { toast } from 'react-toastify';

function EditBlogPage() {
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["get-blog-for-update"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${blogId}`)
      return response.data
    }
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setSynopsis(data.synopsis ?? "");
      setContent(data.content ?? "");
      setFeaturedImage(data.featuredImage ?? "");
    }
  }, [data]);

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-blog"],
    mutationFn: async (blogData: { title: string; synopsis: string; content: string; featuredImage: string; }) => {
      const response = await axiosInstance.patch(`/api/blogs/${blogId}`, blogData);
      return response.data;
    },
    onError: () => {
      toast.error('Could not update blog')
    },
    onSuccess: () => {
      toast.success('Blog updated successfully', { theme: "colored", position: "top-center" });
      navigate("/profile");
    },
  });

  const { isPending: isDeleting, mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/api/blogs/${blogId}`);
      return response.data;
    },
    onError: () => {
      toast.error('Could not delete blog')
    },
    onSuccess: () => {
      toast.success('Blog deleted successfully', { theme: "colored", position: "top-center" });
      navigate("/profile");
    },
  });

  function handleUpdateBlog() {
    mutate({ title, synopsis, content, featuredImage });
  }

  function handleDeleteBlog() {
    deleteMutate();
  }

  if (isLoading) return <Typography align="center" mt={5}>Loading...</Typography>;

  return (
    <Box sx={{ bgcolor: "#fff", pt: 2 }}>
      <Card elevation={3} sx={{ maxWidth: 500, mx: "auto", my: 5, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
            Edit Your Blog
          </Typography>

          <Box component="form">
            <Typography color="primary">Title</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter blog title"
              value={title}
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
              onClick={handleUpdateBlog}
              loading={isPending}
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mt: 2 }}
            >
              Update Blog
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              fullWidth
              size="medium"
              onClick={handleDeleteBlog}
              loading={isDeleting}
              sx={{ fontWeight: "bold", fontSize: 15, borderRadius: 2, mt: 2 }}
            >
              Delete Blog
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditBlogPage;