import express from "express";
import cookieParser from 'cookie-parser'
import authRouter from "./routes/auth.route";
import blogsRouter from './routes/blogs.route';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://blog-it-app-orcin.vercel.app/"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Blog api</h1>`);
});

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogsRouter);

const port = process.env.PORT || 3850;
app.listen(port, () => console.log(`Server is running on port ${port}`));
