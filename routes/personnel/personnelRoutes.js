import express from "express";
import db from "../../database/connect.js";

const router = express.Router();

/**
 * Handles GET requests to retrieve all personnel.
 */
router.get("/", async (req, res) => {
  const collection = await db
    .collection("records")
    .find({
      type: "PERSON",
    })
    .toArray();
  res.send(collection).status(200);
});

/**
 * Handles POST requests to create a new personnel record.
 */
router.post("/", async (req, res) => {
  const collection = await db.collection("records");
  const newPerson = {
    name: req.body.name,
    email: req.body.email,
    type: "PERSON",
    factories: req.body.factories,
    personalId: crypto.randomUUID(), // Generate a unique personal ID
  };
  const result = await collection.insertOne(newPerson);
  res.send(result).status(201);
});

/**
 * Handles DELETE requests to remove a personnel record by personalId.
 */
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