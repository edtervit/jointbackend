import express from "express";

const router = express.Router();

import { createTrackList, getTrackList } from "../controllers/trackList.js";

router.route("/create").post(createTrackList);

router.route("/getTrackLists/:id").get(getTrackList);

export default router;
