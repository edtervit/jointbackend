const express = require("express");
const router = express.Router();
const profile = require("../models/profileModel");

router.route("/create").post((req, res) => {
  const name = req.body.name;
  const theList = req.body.theList;
  const id = req.body.id;
  const newProfile = new profile({
    name,
    theList,
    id,
  });
  newProfile.save();
});

router.route("/getProfiles/:id").get((req, res) => {
  const id = req.params.id;
  profile
    .find({
      id: id,
    })
    .then((foundProfile) => res.json(foundProfile));
});

module.exports = router;
