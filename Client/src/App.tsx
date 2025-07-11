import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BlogListPage from "./pages/BlogListPage";
import NewBlogPage from "./pages/NewBlogPage";
import ProfilePage from "./pages/ProfilePage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8D6E63",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#77655fff",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Corben", serif',
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/blogList" element={<BlogListPage />} />
          <Route path="/newBlog" element={<NewBlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
