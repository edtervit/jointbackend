import dotenv from "dotenv";
dotenv.config();

import express from "express";
import request from "request";
import querystring from "querystring";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import trackListRoutes from "./routes/TrackListRoute.js";
import jointPlaylistRoutes from "./routes/JointPlaylistRoute.js";

let app = express();

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8888/callback";

app.get("/login/:id", function (req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope:
          "user-read-private user-read-email playlist-modify-public playlist-read-private user-top-read user-library-read",
        redirect_uri,
        state: req.params.id,
      })
  );
});

app.get("/test", function (req, res) {
  res.redirect("https://edtervit.co.uk");
});

app.get("/callback", function (req, res) {
  let code = req.query.code || null;
  let state = req.query.state;

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || "http://localhost:3000";
    res.redirect(uri + "?access_token=" + access_token + "&state=" + state);
  });
});

let port = process.env.PORT || 8888;
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
);

const url = process.env.DB_URL;
app.use(cors());

app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("useFindAndModify", false);
app.use("/trackLists", trackListRoutes);
app.use("/jointPlaylist", jointPlaylistRoutes);

app.listen(port);
