import express from "express";
import {
  getUsersHandler,
} from "./users.controller";
import passport from "passport";

const router = express.Router();

router
  .get("/", passport.authenticate('jwt', { session: false }), getUsersHandler)
  .get("/:id")

export default router;
