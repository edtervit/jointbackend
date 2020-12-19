const mongoose = require("mongoose");

const TrackListSchema = {
  name: {
    type: String,
    required: true,
  },
  theList: {
    type: Array,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
};

const TrackList = mongoose.model("TrackList", TrackListSchema);

module.exports = TrackList;
