const mongoose = require("mongoose");

const profileSchema = {
  name: String,
  theList: Array,
  id: String,
};

const profile = mongoose.model("profile", profileSchema);

module.exports = profile;
