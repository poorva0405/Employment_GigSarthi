import express from "express";
import { runFeature } from "../controllers/featureController.js";

const router = express.Router();

router.get("/:id", runFeature);

export default router;