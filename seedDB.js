require("dotenv").config();

const faker = require("@withshepherd/faker");
const MongoClient = require("mongodb").MongoClient;

const videosCount = 1000;

async function seedDB() {
  const uri = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("database").collection("videos");

    //await collection.drop();

    let videos = [];

    for (let i = 0; i < videosCount; i++) {
      const video = {
        _id: faker.datatype.uuid(),
        name: faker.lorem.sentence(),
        url: faker.internet.url(),
        thumbnailUrl: faker.image.imageUrl(),
        isPrivate: faker.datatype.boolean(),
        timesViewed: faker.datatype.number(),
      };

      videos.push(video);
    }
    await collection.insertMany(videos);

    console.log("Database seeded! :)");
    await client.close();
  } catch (err) {
    console.log(err);
  }
}

seedDB();
