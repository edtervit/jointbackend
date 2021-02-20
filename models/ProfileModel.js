import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
  userProfileID: {
    type: String,
    required: true,
    unique: true,
  },
  userSpotifyName: {
    type: String,
  },
  userCustomName: {
    type: String,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  userTier: {
    type: String,
    default: "free",
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
