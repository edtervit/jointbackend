const mongoose = require("mongoose");

const profileSchema = {
  name: String,
  theList: Object,
};

const profile = mongoose.model("profile", profileSchema);

module.exports = profile;
