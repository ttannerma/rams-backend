import express from "express";
import db from "../../database/connect.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = await db.collection("records").find({
    type: "FACTORY"
  }).toArray();
  res.send(collection).status(200);
});


router.get("/:id", async (req, res) => {
  const collection = await db.collection("records")
  const query = { _id: new ObjectId(req.params.id) };
  const record = await collection.findOne(query);

  if(!result) {
    res.send("Not Found").status(404);
  } else {
    res.send(record).status(200);
  }
});

router.post("/", async (req, res) => {
  const collection = await db.collection("records");
  const name = req.body.name;
  const tz = req.body.timezone;
  const type = "FACTORY";

  const newFactory = { name, timezone: tz, type };
  const result = await collection.insertOne(newFactory);
  res.send(result).status(201);
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        value: req.body.value
      }
    };
    const collection = await db.collection("records");
    const result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch(err) {
    console.error(err)
    res.status(500).send("Internal Server Error");
  }
})

router.delete("/:name", async (req, res) => {
  try {
    const query = { name: req.params.name };
    const collection = await db.collection("records");
    const result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch(err) {
    console.error(err)
    res.status(500).send("Internal Server Error");
  }
});

export default router;