import express from "express";

const router = express.Router();

import {
  createTrackList,
  getTrackList,
  getTrackLists,
  deleteTrackList,
} from "../controllers/trackList.js";

router.route("/create").post(createTrackList);

router.route("/getTrackLists/:id").get(getTrackLists);

router.route("/getTrackList/:id").get(getTrackList);

router.route("/deleteTrackList/:id").delete(deleteTrackList);

export default router;
