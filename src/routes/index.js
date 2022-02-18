const express = require("express");
const router = express.Router();

const videos = require("./videos");

router.use("/videos", videos);

router.get("/", function (req, res) {
  res.status(200).send("Hello tl;dv!");
});

router.get("/health", (req, res) => {
  try {
    return res.status(200).jsonp({
      message: "API ok!",
      timestamp: Date.now(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
    });
  }
});

module.exports = router;
