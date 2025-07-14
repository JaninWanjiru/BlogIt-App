import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImage: string;
  createdAt: string;
}

function UserBlogs() {
  const navigate = useNavigate();
  const { data: blogs } = useQuery({
    queryKey: ["user-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/blogs/user');
      return response.data;
    }
  });

  return (
    <Card elevation={3} sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>My Blogs</Typography>
        {blogs?.map((blog: Blog) => (
          <Box key={blog.id} sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{blog.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{blog.synopsis}</Typography>
            <Button size="small" variant="outlined" onClick={() => navigate(`/edit-blog/${blog.id}`)} startIcon={<Edit />}>Edit</Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default UserBlogs; 