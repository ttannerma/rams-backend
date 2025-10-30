import express from "express";
import db from "../../database/connect.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = await db.collection("records").find({ 
    type: "PERSON"
  }).toArray();
  res.send(collection).status(200);
});


router.get("/:id", async (req, res) => {
  const collection = await db.collection("records")
  const query = { type: "PERSON" };
  const record = await collection.findOne(query);

  if(!result) {
    res.send("Not Found").status(404);
  } else {
    res.send(record).status(200);
  }
});

router.post("/", async (req, res) => {
  const collection = await db.collection("records");
  const newPerson = {
    name: req.body.name,
    email: req.body.email,
    type: "PERSON",
    factories: req.body.factories,
    personalId: crypto.randomUUID() // Generate a unique personal ID
  }
  const result = await collection.insertOne(newPerson);
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

router.delete("/:id", async (req, res) => {
  try {
    const query = { personalId: req.params.id, type: "PERSON" };
    const collection = await db.collection("records");
    const result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch(err) {
    console.error(err)
    res.status(500).send("Internal Server Error");
  }
});

export default router;