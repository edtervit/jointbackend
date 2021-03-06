import JointPlaylistModel from "../models/JointPlaylistModel.js";
import ProfileModel from "../models/ProfileModel.js";

export const createJointPlaylist = async (req, res) => {
  const userCreatorName = req.body.userCreatorName;
  const userCreatorID = req.body.userCreatorID;
  const userFriendName = req.body.userFriendName;
  const userFriendID = req.body.userFriendID;
  const theList = req.body.theList;
  const newJointPlaylist = new JointPlaylistModel({
    userCreatorName,
    userCreatorID,
    userFriendName,
    userFriendID,
    theList,
  });
  try {
    await newJointPlaylist.save();
    res.status(201).json(newJointPlaylist);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getYourJointPlaylists = async (req, res) => {
  try {
    const id = req.params.id;
    let JointPlaylist = await JointPlaylistModel.find({
      userCreatorID: id,
    });
    await Promise.all(
      JointPlaylist.map(async (e, index) => {
        const profile = await ProfileModel.find({
          userProfileID: e.userFriendID,
        });
        if (profile[0] && profile[0].userCustomName) {
          JointPlaylist[index].userFriendName = profile[0].userCustomName;
        }
      })
    );
    res.status(200).json(JointPlaylist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFriendJointPlaylists = async (req, res) => {
  try {
    const id = req.params.id;
    const JointPlaylist = await JointPlaylistModel.find({
      userFriendID: id,
    });
    await Promise.all(
      JointPlaylist.map(async (e, index) => {
        const profile = await ProfileModel.find({
          userProfileID: e.userCreatorID,
        });
        if (profile[0] && profile[0].userCustomName) {
          JointPlaylist[index].userCreatorName = profile[0].userCustomName;
        }
      })
    );
    res.status(200).json(JointPlaylist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getJointPlaylist = async (req, res) => {
  try {
    const id = req.params.id;
    const JointPlaylist = await JointPlaylistModel.find({
      _id: id,
    });
    res.status(200).json(JointPlaylist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteJointPlaylist = async (req, res) => {
  try {
    const id = req.params.id;
    await JointPlaylistModel.findByIdAndRemove(id);
    res.status(202).json({ message: "Post delete Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const dupeCheck = async (req, res) => {
  try {
    const body = req.body;
    const JointPlaylist = await JointPlaylistModel.find({
      userFriendID: body.userFriendID,
      userCreatorID: body.userCreatorID,
      theList: body.theList,
    });
    res.status(200).json(JointPlaylist);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
