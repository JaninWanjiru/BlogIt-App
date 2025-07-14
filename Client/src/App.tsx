import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Header from "./components/Header";
import { ToastContainer} from 'react-toastify';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BlogListPage from "./pages/BlogListPage";
import FullBlogPage from "./pages/FullBlogPage";
import Protected from "./components/Protected";
import ProfilePage from "./pages/ProfilePage";
import CreateBlogPage from "./pages/CreateBlogPage"
import EditBlogPage from "./pages/EditBlogPage";


const client = new QueryClient()
const theme = createTheme({
  palette: {
    primary: {
      main: "#379cb6ff",        
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#094a59ff",        
      contrastText: "#ffffff",
    },
    text: {
      primary: "#2C2C2C",        
      secondary: "#4B4B4B",
    },
  },
  typography: {
    fontFamily: '"Quicksand", sans-serif',
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
    <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<FullBlogPage />} />
          <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
          <Route path="/create-blog" element={<Protected><CreateBlogPage /></Protected>} />
          <Route path="/edit-blog/:id" element={<Protected><EditBlogPage /></Protected>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
