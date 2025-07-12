import express from "express";
import authRouter from "./routes/auth.route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send(`<h1>You've unlocked Jane's Blog api</h1>`);
});

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3850;
app.listen(port, () => console.log(`Server is running on port ${port}`));
