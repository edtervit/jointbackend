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

  const query = { userProfileID: id };
  const update = {
    $set: { userProfileID: id, userSpotifyName: name },
  };
  const options = { upsert: true, setDefaultsOnInsert: true };

  try {
    const res2 = await ProfileModel.updateOne(query, update, options);
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
      //if finds a tracklist from the id just send that
      res.status(200).json(trackList);
    } else {
      //if can't find tracklist from id, check to see if theyre using a custom name
      const profile = await ProfileModel.find({
        userCustomName: id,
      }).collation({ locale: "en", strength: 2 });

      //if they have a custom name, use their profileid to find their track list
      if (profile.length > 0) {
        const profileID = profile[0].userProfileID;
        const trackList2 = await TrackListModel.find({
          id: profileID,
        });
        if (trackList2.length > 0) {
          //if they have custom name and tracklist send itttttt
          res.status(200).json(trackList2);
        } else {
          //if they have custom name but no tracklist
          res.statusMessage = "Can't find tracklist";
          res.status(404).json(profile[0].userCustomName);
        }
      } else {
        //if they don't have a custom name check for a profile
        const profile2 = await ProfileModel.find({
          userProfileID: id,
        }).collation({ locale: "en", strength: 2 });

        if (profile2.length > 0) {
          //if they have profile but no tracklist
          res.statusMessage = "Can't find tracklist";
          res.status(404).json(profile2[0].userSpotifyName);
        } else {
          //if they don't have a profile or tracklist
          res.statusMessage = "Can't find anything";
          res.status(404).end();
        }
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
