import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
  userProfileID: {
    type: String,
    required: true,
    unique: true,
  },
  userCustomName: {
    type: String,
    unique: true,
    collation: { locale: "en", strength: 2 },
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
