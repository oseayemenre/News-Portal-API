import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { auth } from "./routes/auth";
import { categories } from "./routes/categories";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
dotenv.config();

app.use("/auth", auth);
app.use("/categories", categories);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is currently running on http://localhost:${process.env.PORT}`
  );
});
