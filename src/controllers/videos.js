const { body, validationResult } = require("express-validator");

const Video = require("../models/videos");

exports.create = function (req, res) {
  var newVideo = new Video(req.body);
  console.log(req.body);
  newVideo.save(function (err) {
    if (err) {
      res.status(400).send("Unable to save video to database");
    } else {
      res.redirect("/");
    }
  });
};

exports.list = async (
  onlyPublic = true,
  viewedMoreThan = null,
  page,
  limit,
  sort
) => {
  const skip = (page - 1) * limit;

  let filter = {};

  if (onlyPublic) {
    filter["isPrivate"] = true;
  }

  let query = null;
  if (Object.keys(filter).length > 0) {
    query = Video.find(filter);
  } else {
    query = Video.find();
  }

  if (viewedMoreThan > 0) {
    query.where("timesViewed").gt(viewedMoreThan);
  }

  const videos = await query.sort(sort).skip(skip).limit(limit).lean().exec();

  return {
    data: videos,
    meta: {
      filter: filter,
      page: page,
      limit: limit,
      sort: sort,
    },
  };
};

exports.update = async (id, payload) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new Error("Video not found");
  }

  Object.assign(video, payload);
  video.save();
};

exports.validatePayload = () => {
  return [
    body("name", "Video 'name' doesn't exist").exists(),
    body("url", "Video 'url' is invalid").exists().isURL(),
    body("thumbnailUrl", "Video 'thumbnailUrl' is invalid").exists().isURL(),
    body("isPrivate", "The field 'isPrivate' is of type boolean")
      .optional()
      .isBoolean(),
    body("timesViewed", "The field 'timesViewed' must be of type integer")
      .optional()
      .isInt(),
  ];
};
