import express from "express";
import { getMeHandler, getUsersHandler } from "./users.controller";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { requireUser } from "../../middlewares/requireUser";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .get("/me", getMeHandler)
  .get("/", getUsersHandler)
  .get("/:id");

export default router;
