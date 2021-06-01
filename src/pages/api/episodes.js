import { episodes } from "../../../server.json";

export default function handler(req, res) {
  res.status(200).json(episodes);
}
