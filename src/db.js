const mongoose = require("mongoose");

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

mongoose
  .connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, options)
  .then(function () {
    console.log("MongoDB is connected");
  })
  .catch(function (err) {
    console.log(err);
  });
