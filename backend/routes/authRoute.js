import { Router } from "express";
import { authHandler } from "../controllers/authhandler.js";

const router = Router();

router.get("/", authHandler);

export default router;
