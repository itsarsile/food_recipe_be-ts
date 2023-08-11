import express from "express";
import {
  createUserHandler,
  getUsersHandler,
  healthCheck,
} from "./users.controller";

const router = express.Router();

router
  .get("/health", healthCheck)
  .get("/", getUsersHandler)
  .post("/register", createUserHandler);

export default router;
