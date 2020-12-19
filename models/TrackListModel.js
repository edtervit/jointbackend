const mongoose = require("mongoose");

const TrackListSchema = {
  name: String,
  theList: Array,
  id: String,
};

const TrackList = mongoose.model("TrackList", TrackListSchema);

module.exports = TrackList;
