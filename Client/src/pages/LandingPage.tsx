import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const features = [
  {
    icon: <NoteAltIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: " Writing",
    description:
      "Write in markdown and publish beautiful articles with our intuitive editor.",
  },
  {
    icon: <Diversity3Icon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Connect",
    description:
      "Build relationships with diverse readers and fellow writers in our community.",
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "Discover",
    description:
      "Explore diverse content and discover new perspectives from amazing writers.",
  },
];

function LandingPage() {
  return (
    <Box component="section" sx={{ bgcolor: "#fff", pb: 5 }}>
      <Grid sx={{ textAlign: "center", pt: 8, pb: 4 }}>
        <Typography variant="h3" sx={{fontSize:{xs: "1.4rem", md: "3rem"}}}  color="secondary" gutterBottom>
          Your Ideas Deserve a Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 5 }}>
          BlogIt is more than a platform, it's a space where your thoughts meet
          the world.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="medium"
            startIcon={<NoteAltIcon />}
            sx={{ bgcolor: "#3C3D37", fontSize: 14, borderRadius: 2 }}
          >
            Start Writing
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="medium"
            sx={{ bgcolor: "#3C3D37", fontSize: 14, borderRadius: 2, ml: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={5} justifyContent="center" p="0 2rem">
        {features.map((feature, idx) => (
          <Grid size={{ sm: 6, md: 3 }} key={idx}>
            <Card
              sx={{ borderRadius: 6, textAlign: "center", boxShadow: 2, py: 3 }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: "#f1f5fd", margin: "0 auto" }}>
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LandingPage;
