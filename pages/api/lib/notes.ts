import { NextApiRequest, NextApiResponse } from "next";

export const getNoteLocation = (host: string, id: string) =>
  `${host}/notes/${id}`;

export const getErrors = (reasons: string[]) => ({
  errors: reasons.map((reason) => ({
    reason,
  })),
});

export const getRequestId = (req: NextApiRequest) => req?.query?.id

