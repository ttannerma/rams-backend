import express from "express";
import db from "../../database/connect.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = await db.collection("records").find({
    type: "RESERVATION"
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
  const reservation = req.body;

  const newReservation = { 
    ...reservation,
    type: "RESERVATION",
    id: crypto.randomUUID()
  };

  const result = await collection.insertOne(newReservation);
  res.send(result).status(201);
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { id: req.params.id, type: "RESERVATION" };
    const collection = await db.collection("records");
    const result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch(err) {
    console.error(err)
    res.status(500).send("Internal Server Error");
  }
});

export default router;