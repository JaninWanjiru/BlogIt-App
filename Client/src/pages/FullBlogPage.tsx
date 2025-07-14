import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import ReactMarkdown from "react-markdown";
import Loader from "../components/Loader";
import dayjs from "dayjs";

function FullBlogPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["full-blog", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader msg="Fetching, please wait..." />;
  }

  if (error)
    return (
      <Typography align="center" mt={5}>
        Please try again later
      </Typography>
    );
  return (
    <Box component="section" sx={{ bgcolor: "#fff", pt: 2 }}>
      <Card
        elevation={3}
        sx={{ maxWidth: 700, mx: "auto", my: 5, borderRadius: 4 }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={1}>
            {data.title}
          </Typography>

          {data.featuredImage && (
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <img
                src={data.featuredImage}
                alt="Blog"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </Box>
          )}
          <Typography variant="body2" color="secondary" mb={2}>
            {data.synopsis}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar
              src={data.user?.firstName}
              alt={data.user?.firstName}
            />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {data.user?.firstName} {data.user?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {dayjs(data.createdAt).format("MMM D, YYYY")}
              </Typography>
            </Box>
          </Stack>
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FullBlogPage;
