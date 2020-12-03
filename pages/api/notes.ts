import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (req.method !== "GET") {
    res.status(500).json({ error: "wrong request method" });
    return;
  }
  if (!isConnected) {
    res.status(500).json({ error: "could not connect to the db" });
    return;
  }
  var db = client.db("notes");
  const notes = await db.collection("notes").find({}).toArray();
  res.status(200).json(notes);
};
