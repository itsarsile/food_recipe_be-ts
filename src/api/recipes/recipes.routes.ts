import express from "express";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { requireUser } from "../../middlewares/requireUser";

const router = express.Router();
router.use(deserializeUser, requireUser);

router.get("/").post("/").delete("/:id").put("/:id");

export default router;
