import express from "express";

const router = express.Router();

import {
  createProfile,
  getProfileById,
  getProfileByCustomName,
} from "../controllers/profile.js";

router.route("/create").post(createProfile);
router.route("/getByID/:id").get(getProfileById);
router.route("/getByName/:id").get(getProfileByCustomName);

export default router;
