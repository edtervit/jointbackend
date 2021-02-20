import mongoose from "mongoose";

const JointPlaylistSchema = mongoose.Schema({
  userCreatorName: {
    type: String,
    required: true,
  },
  userCreatorID: {
    type: String,
    required: true,
  },
  userFriendName: {
    type: String,
    required: true,
  },
  userFriendID: {
    type: String,
    required: true,
  },
  theList: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JointPlaylist = mongoose.model("JointPlaylist", JointPlaylistSchema);

export default JointPlaylist;
