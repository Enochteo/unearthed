import express from "express";
import path from "path";
import { fileURLToPath } from "url";
//import giftData from "../data/gifts.js";
import GiftController from "../controllers/gifts.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", GiftController.getGifts);

router.get("/:giftId", GiftController.getGiftsbyId);

router.post("/", GiftController.createGift);

router.delete("/:id", GiftController.deleteGift);

router.patch("/:id", GiftController.updateGift);

export default router;
