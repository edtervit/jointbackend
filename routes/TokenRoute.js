import express from "express";

const router = express.Router();

import { refreshToken, guest } from "../controllers/token.js";

router.route("/refresh").post(refreshToken);

router.route("/guest").post(guest);

export default router;
