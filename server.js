const express = require("express");
// App
const app = express();

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://bootcamp-mongodb:27017";
// const url = "mongodb://localhost:27017";
const dbName = "bootcampDb";
const collectionName = "users";

// Constants
const hostname = "0.0.0.0";
const port = 8080;

// GET method route
app.get("/", function (req, res) {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

// GET method route
app.get("/secret", function (req, res, next) {
  res.send("Never be cruel, never be cowardly. And never eat pears!");
  console.log("This is a console.log message.");
});

app.get("/api/get/all", async function (req, res) {
  try {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);
    const query = {};

    const result = await dbo.collection(collectionName).find(query).toArray();

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send("Collection Empty");
    }
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).send("An error ocurred.");
  }
});

app.get("/api/get/byMale", async function (req, res) {
  try {
    const agg = [
      {
        $match: {
          gender: "Male",
        },
      },
    ];
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);

    const coll = dbo.collection(collectionName);
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send("Empty");
    }
    await client.close();
  } catch (err) {
    console.log(err);
    res.status(500).send("An error ocurred.");
  }
});

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);
