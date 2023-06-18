import type { NextApiRequest, NextApiResponse } from "next";
import josh01 from "../../services/openai/prompt-styles/josh01";
import doemser01 from "../../services/openai/prompt-styles/doemser01";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    let completion;

    switch (request.body.promptStyle) {
      case "josh01":
        completion = await josh01(request.body);
        break;
      case "doemser01":
        completion = await doemser01(request.body);
        break;
      default:
        response.status(400).json({ error: "Invalid prompt style" });
    }

    console.log(completion);
    response.status(200).json({ result: completion });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      response.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      response.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
