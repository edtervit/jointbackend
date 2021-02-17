import mongoose from "mongoose";

const TrackListSchema = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TrackList = mongoose.model("TrackList", TrackListSchema);

export default TrackList;
