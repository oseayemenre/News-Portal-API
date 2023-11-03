import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { auth } from "./routes/auth";
import { categories } from "./routes/categories";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
dotenv.config();

app.use("/api/auth", auth);
app.use("/api/categories", categories);

app.listen(PORT, () => {
  console.log(`Server is currently running on http://localhost:${PORT}`);
});
