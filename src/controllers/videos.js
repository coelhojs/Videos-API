const videos = require("../models/videos");
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

exports.list = async (filter = {}, viewedMoreThan = 0, page, limit, sort) => {
  const skip = (page - 1) * limit; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0

  const videos = await Video.find(filter)
    .where("timesViewed")
    .gt(viewedMoreThan)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();

  return {
    data: videos,
    meta: {
      filter: filter,
      page: page,
      limit: limit,
      sort: sort,
    },
  };

  // Video.find().exec(function (err, videos) {
  //   if (err) {
  //     return res.send(500, err);
  //   }
  //   res.send(videos);
  // });
};
