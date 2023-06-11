import { NextApiRequest, NextApiResponse } from "next";
import updateWiki from "../../services/github";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await updateWiki(req.body);
      res.status(200).json({ message: "Wiki updated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the wiki" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
