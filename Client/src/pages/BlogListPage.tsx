import { Link as Link2 } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Avatar, Button, CardActions } from "@mui/material";


const blogs = [
  {
    id: 1,
    title: "My First REST API with Express",
    synopsis: "A beginner's story of building a functional API from scratch using Node.js and Express.",
    featuredImage: "/express.jpg",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    author: "Roy Smitten",
  },
  {
    id: 2,
    title: "Postman Saved My API Life",
    synopsis: "Testing APIs used to be chaotic, until Postman made it fast, visual, and simple.",
    featuredImage: "/postman.jpg",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Beating Tech Imposter Syndrome",
    synopsis: "What I did when I felt like a fraud in tech and what finally helped me overcome it.",
    featuredImage: "/imposter.png",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    author: "Nandini Hinduja",
  },
  {
    id: 4,
    title: "Dark vs Light Mode",
    synopsis: "Tried both for weeks and here is my take on the real pros, cons, and surprises.",
    featuredImage: "/darkLight.jpeg",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    author: "Kyle Roberts",
  },
  {
    id: 5,
    title: "APIs Made Simple",
    synopsis: "An easy-to-follow breakdown of APIs, using real-life examples and zero jargon.",
    featuredImage: "/api.png",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    author: "Kelly Rashir",
  },
  {
    id: 6,
    title: "The Power of Silence",
    synopsis: "Why quiet moments are essential for clarity, creativity, and emotional balance.",
    featuredImage: "/silence.png",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    author: "Chris Jay",
  },
  {
    id: 7,
    title: "Failed Planner, Better Focus",
    synopsis: "I ditched structured planners after constant failure—and surprisingly, got more done.",
    featuredImage: "/failure.png",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    author: "Oprah Winfrey",
  },
  {
    id: 8,
    title: "Small Habits, Big Shifts",
    synopsis: "How daily 5-minute habits helped me improve focus, discipline, and mindset over time.",
    featuredImage: "/habits.jpg",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    author: "Michael Cliff",
  },
];

function BlogListPage() {
  return (
    <Box component="section" sx={{ py: 3, bgcolor: "#F8F8F8" }}>
      <Typography variant="h5" textAlign="center" fontWeight="bold" color="secondary" sx={{ mb: 4 }}>
        All Blogs
      </Typography>
      <Grid container spacing={4} p="1rem">
        {blogs.map((blog) => (
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
                  <Avatar sx={{mr: 1}} src={blog.avatar}/>
                  <Typography color="text.secondary">
                    {blog.author}
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