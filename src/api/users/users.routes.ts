import express from "express";
import { getUsersHandler, healthCheck } from "./users.controller";

const router = express.Router();

router.get("/health", healthCheck).get("/", getUsersHandler);

export default router;
