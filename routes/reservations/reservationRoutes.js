import express from "express";
import db from "../../database/connect.js";

const router = express.Router();

/**
 * Handles GET requests to retrieve all reservations.
 */
router.get("/", async (req, res) => {
  const collection = await db
    .collection("records")
    .find({
      type: "RESERVATION",
    })
    .toArray();
  res.send(collection).status(200);
});

/**
 * Handles POST requests to create a new reservation.
 */
router.post("/", async (req, res) => {
  const collection = await db.collection("records");
  const reservation = req.body;

  const newReservation = {
    ...reservation,
    type: "RESERVATION",
    id: crypto.randomUUID(), // generate a unique reservation ID
  };

  const result = await collection.insertOne(newReservation);
  res.send(result).status(201);
});

/**
 * Handles DELETE requests to remove a reservation by id.
 */
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