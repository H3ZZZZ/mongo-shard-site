const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const uri = "mongodb://localhost:27020"; // mongos port
const client = new MongoClient(uri);

app.get("/tweets", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("twitter");
    const tweets = await db.collection("tweets").find({}).limit(10).toArray();
    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
