import { Router } from "express";
import { globalChatHandler } from "../controllers/globalChat.js";
import { fetchGlobalChat } from "../controllers/fetchGC.js";

const router = Router();

router.post("/global", globalChatHandler);
router.post("/fetchgc", fetchGlobalChat);
export default router;
