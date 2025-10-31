import express from "express";
import db from "../../database/connect.js";

const router = express.Router();

/**
 * Handles GET requests to retrieve all factories.
 */
router.get("/", async (req, res) => {
  const collection = await db
    .collection("records")
    .find({
      type: "FACTORY",
    })
    .toArray();
  res.send(collection).status(200);
});

/**
 * Handles POST requests to create a new factory.
 */
router.post("/", async (req, res) => {
  const collection = await db.collection("records");
  const name = req.body.name;
  const tz = req.body.timezone;
  const type = "FACTORY";

  const newFactory = { name, timezone: tz, type };
  const result = await collection.insertOne(newFactory);
  res.send(result).status(201);
});

/**
 * Handles DELETE requests to remove a factory by name.
 */
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