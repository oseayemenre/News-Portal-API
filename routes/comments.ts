import express from "express";
import {
  create_comment,
  delete_comment,
  get_comment,
  get_comments,
} from "../controllers/comment_controller";

const router = express.Router();

router.post("/create", create_comment);
router.post("/delete/:id", delete_comment);
router.post("/", get_comments);
router.post("/:id", get_comment);

export { router as comments };
