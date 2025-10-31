import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_CONNECTION_STRING || ""

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, // Enforce strict mode for the API. Throws errors for features not in the specified API version.
    deprecationErrors: true, // Throw errors for deprecated or soon-to-be-deprecated features.
  },
});

try {
  await client.connect();
  console.log("Connected to MongoDB");
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged deployment.");
}
catch (e) {
  console.error(e);
}

const db = client.db("ramsDatabase");
export default db;