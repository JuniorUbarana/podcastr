import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

type ErrorResponseType = {
  error: string;
};

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  description: string;
  file: object;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type SuccessResponseType = {
  episode: Episode;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === "POST") {
    const { _id, title, members, published_at, thumbnail, description, file } =
      req.body;
    if (
      !_id ||
      !title ||
      !members ||
      !published_at ||
      !thumbnail ||
      !description ||
      !file
    ) {
      res.status(400).json({ error: "Missing data" });
      return;
    }

    const { db } = await connect();

    const response = await db.collection("episodes").insertOne({
      _id, title, members, published_at, thumbnail, description, file
    });
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: "Wrong method selected" });
  }
};
