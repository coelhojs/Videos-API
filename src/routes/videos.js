const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

const validator = require("../validator");
const videoController = require("../controllers/videos");

router.get("/", async (req, res) => {
  try {
    const viewedMoreThan = parseInt(req.query.viewedMoreThan) || 0;
    const onlyPublic = req.query.public === "true";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "name";

    const videosList = await videoController.list(
      onlyPublic,
      viewedMoreThan,
      page,
      limit,
      sort
    );

    return res.status(200).json(videosList);
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
});

router.post("/", function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty() == false) {
    return res.status(422).jsonp(errors.array());
  }

  videoController.create(req, res);
});

router.put(
  "/:id",
  validator.validateVideoPayload(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty() == false) {
        return res.status(422).jsonp(errors.array());
      }

      const id = req.params.id;
      const payload = req.body;

      await videoController.update(id, payload);

      res.status(200).json({ message: "Video updated!" });
    } catch (error) {
      res.status(500).json({ error: error.message, stack: error.stack });
    }
  }
);

router.delete("/", function (req, res) {
  videoController.delete(req, res);
});

module.exports = router;
