import ProfileModel from "../models/ProfileModel.js";

export const createProfile = async (req, res) => {
  const userProfileID = req.body.userProfileID;
  const userCustomName = req.body.userCustomName;

  const query = { userProfileID: userProfileID };
  const update = {
    $set: { userProfileID: userProfileID, userCustomName: userCustomName },
  };
  const options = { upsert: true };

  try {
    const res2 = await ProfileModel.updateOne(query, update, options);
    res.status(201).json(res2);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await ProfileModel.find({
      userProfileID: id,
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProfileByCustomName = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await ProfileModel.find({
      userCustomName: id,
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
