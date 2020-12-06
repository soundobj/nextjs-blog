import { NextApiRequest, NextApiResponse } from "next";

import { getNoteLocation, getErrors } from "./lib/notes";
import { connectToDatabase } from "../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (!isConnected) {
    res.status(500).json(getErrors(["could not connect to the db"]));
    return;
  }
  var db = client.db("notes");

  switch (req.method) {
    case "GET": {
      const notes = await db.collection("notes").find({}).toArray();
      res.status(200).json({
        data: notes,
      });
      break;
    }
    case "POST": {
      const note = { name: req.body.name, content: req.body.content };
      try {
        const newNote = await db.collection("notes").insertOne(note);
        const location = getNoteLocation(
          req?.headers?.host,
          newNote?.ops[0]?._id
        );
        res.setHeader("Location", location);
        res.status(201).json({
          data: newNote.ops[0],
          links: [
            {
              location,
            },
          ],
        });
      } catch (e) {
        res.status(500).json(getErrors([e]));
      }
      break;
    }
    default: {
      res
        .status(500)
        .json(
          getErrors(["Wrong request verb, use GET, POST, PUT, PATCH or DELETE"])
        );
    }
  }
};
