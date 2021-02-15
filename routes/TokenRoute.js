import express from "express";

const router = express.Router();

import { refreshToken } from "../controllers/token.js";

router.route("/refresh").post(refreshToken);

export default router;
