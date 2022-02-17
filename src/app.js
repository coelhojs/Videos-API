const express = require("express");
const videosController = require("./controllers/videos");

const app = express();
const port = 8080;

require("./db");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const viewedMoreThan = parseInt(req.query.viewedMoreThan) || 0;
    const filter = JSON.parse(req.query.filter) || {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "name";

    const videos = await videosController.list(
      filter,
      viewedMoreThan,
      page,
      limit,
      sort
    );

    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.post("/", function (req, res) {
  videosController.create(req, res);
});

app.put("/", function (req, res) {
  videosController.update(req, res);
});

app.delete("/", function (req, res) {
  videosController.delete(req, res);
});

app.get("/health", async (req, res) => {
  try {
    const healthcheck = {
      message: "API ok!",
      timestamp: Date.now(),
      uptime: process.uptime(),
    };

    return res.status(200).json(healthcheck);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message,
        stack: error.stack,
        timestamp: Date.now(),
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
