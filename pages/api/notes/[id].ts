import { NextApiRequest, NextApiResponse } from "next";
import { ObjectID } from "mongodb";
import { isArray, isEmpty, head } from "lodash";

import { getNoteLocation, getErrors, getRequestId } from "../lib/notes";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (!isConnected) {
    res.status(500).json(getErrors(["could not connect to the db"]));
    return;
  }
  var db = client.db("notes");

  //@ts-ignore
  const id: string = getRequestId(req);

  switch (req.method) {
    case "GET": {
      try {
        const note = await db
          .collection("notes")
          .find({ _id: new ObjectID(id) })
          .toArray();
        if (isEmpty(note)) {
          res.status(401).json({});
          return;
        }
        res.status(200).json({
          data: head(note),
        });
      } catch (e) {
        res.status(500).json(getErrors([e.message]));
      }
      break;
    }
    case "PUT": {
      const note = { name: req.body.name, content: req.body.content };
      // try {
      //   const newNote = await db.collection("notes").insertOne(note);
      //   const location = getNoteLocation(
      //     req?.headers?.host,
      //     newNote?.ops[0]?._id
      //   );
      //   res.setHeader("Location", location);
      //   res.status(201).json({
      //     data: newNote.ops[0],
      //     links: [
      //       {
      //         location,
      //       },
      //     ],
      //   });
      // } catch (e) {
      //   res.status(500).json(getErrors([e]));
      // }
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
