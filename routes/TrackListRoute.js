const express = require("express");
const router = express.Router();
const TrackList = require("../models/TrackListModel");

router.route("/create").post((req, res) => {
  const name = req.body.name;
  const theList = req.body.theList;
  const id = req.body.id;
  const newTrackList = new TrackList({
    name,
    theList,
    id,
  });
  newTrackList.save((error) => {
    return error;
  });
});

router.route("/getTrackLists/:id").get((req, res) => {
  const id = req.params.id;
  TrackList.find({
    id: id,
  }).then((foundTrackList) => res.json(foundTrackList));
});

router.route("/");

module.exports = router;
