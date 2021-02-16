import TrackListModel from "../models/TrackListModel.js";
import ProfileModel from "../models/ProfileModel.js";
export const createTrackList = async (req, res) => {
  const name = req.body.name;
  const theList = req.body.theList;
  const id = req.body.id;
  const newTrackList = new TrackListModel({
    name,
    theList,
    id,
  });
  try {
    await newTrackList.save();
    res.status(201).json(newTrackList);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTrackLists = async (req, res) => {
  try {
    const id = req.params.id;
    const trackList = await TrackListModel.find({
      id: id,
    });
    res.status(200).json(trackList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTrackList = async (req, res) => {
  try {
    const id = req.params.id;
    const trackList = await TrackListModel.find({
      id: id,
    });
    if (trackList.length > 0) {
      res.status(200).json(trackList);
    } else {
      // const profile = await ProfileModel.find({
      //   userCustomName: { $regex: /ed/i },
      // });
      const profile = await ProfileModel.find({
        userCustomName: id,
      }).collation({ locale: "en", strength: 2 });

      if (profile.length > 0) {
        const profileID = profile[0].userProfileID;
        const trackList2 = await TrackListModel.find({
          id: profileID,
        });
        res.status(200).json(trackList2);
      } else {
        res.status(404).json({ message: "Can't find tracklist" });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTrackList = async (req, res) => {
  try {
    const id = req.params.id;
    await TrackListModel.findByIdAndRemove(id);
    res.status(202).json({ message: "Post delete Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
