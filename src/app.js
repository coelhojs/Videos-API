const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

require("./db");

const port = 8080;
const videos = require("./routes/videos");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", videos);

const server = app.listen(port, () => {
  console.log(`Videos API listening on port ${port}`);
});

process.on("SIGTERM", () => {
  debug("SIGTERM signal received for closing the videos API server");
  server.close(() => {
    debug("API server closed");
  });
});
