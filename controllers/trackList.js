import TrackListModel from "../models/TrackListModel.js";

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
      _id: id,
    });
    res.status(200).json(trackList);
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
