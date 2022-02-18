const { body } = require("express-validator");

exports.validateVideoPayload = () => {
  return [
    body("name", "Video 'name' doesn't exist").exists(),
    body("url", "Video 'url' is invalid or missing").exists().bail().isURL(),
    body("thumbnailUrl", "Video 'thumbnailUrl' is invalid or missing").exists().bail().isURL(),
    body("isPrivate", "The field 'isPrivate' is of type boolean").optional().isBoolean(),
    body("timesViewed", "The field 'timesViewed' must be of type integer").optional().isInt(),
  ];
};
