import { Link as Link2 } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Avatar, Button, CardActions } from "@mui/material";
import axiosInstance from "../api/axios";
import {useQuery} from "@tanstack/react-query";
import Loader from "../components/Loader";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImage: string;
  createdAt: string;
  lastUpdate: string;
  isDeleted: boolean;
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    profilePic?: string;
  };
}


function BlogListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/blogs')
      console.log(response.data)
      return response.data
    }
  })

  const getAuthorInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" align="center">
          Please try again later.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Loader msg='Fetching, please wait...'/>
    );
  }

  return (
    <Box component="section" sx={{ py: 3, bgcolor: "#F8F8F8" }}>
      <Typography variant="h5" textAlign="center" fontWeight="bold" color="secondary" sx={{ mb: 4 }}>
        All Blogs
      </Typography>
      <Grid container spacing={4} p="1rem">
        {data && data.map((blog: Blog) => (
          <Grid size={{ xs: 12, sm: 6, md: 4}} key={blog.id}>
            <Card sx={{ borderRadius: 4}}>
              <CardMedia
                component="img"
                height="180px"
                image={blog.featuredImage}
              />
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {blog.synopsis}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{mr: 1}} src={blog.user.profilePic}>
                    {getAuthorInitials(blog.user.firstName, blog.user.lastName)}
                  </Avatar>
                  <Typography color="text.secondary">
                    {blog.user.firstName} {blog.user.lastName}
                  </Typography>
                </Box>
                <CardActions>
                <Button
                  component={Link2}
                  to={`/blogs/${blog.id}`}
                  variant="text"
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Read More
                </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogListPage; 