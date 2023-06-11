import type { NextApiRequest, NextApiResponse } from "next";
import openaiApiRequest from "../../services/openai";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const completion = await openaiApiRequest(request.body);
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
