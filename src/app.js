const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 8080;
const routes = require("./routes/index");

require("./db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

const server = app.listen(port, () => {
  console.log(`Videos API listening on port ${port}`);
});

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received for closing the videos API server");
  server.close(() => {
    console.debug("API server closed");
  });
});
