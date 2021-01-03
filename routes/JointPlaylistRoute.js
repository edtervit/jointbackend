import express from "express";

const router = express.Router();

import {
  createJointPlaylist,
  getJointPlaylist,
  getYourJointPlaylists,
  getFriendJointPlaylists,
  deleteJointPlaylist,
  dupeCheck,
} from "../controllers/jointPlaylist.js";

router.route("/create").post(createJointPlaylist);

router.route("/dupecheck").get(dupeCheck);

router.route("/getYourJointPlaylists/:id").get(getYourJointPlaylists);

router.route("/getFriendJointPlaylists/:id").get(getFriendJointPlaylists);

router.route("/getJointPlaylist/:id").get(getJointPlaylist);

router.route("/deleteJointPlaylist/:id").delete(deleteJointPlaylist);

export default router;
