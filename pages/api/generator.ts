// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

type Data = {
  name: string
}

const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
);

async function GPT35Turbo(prompt: any) {
    const gptResponse = await openai.createChatCompletion(
        {
            model: "gpt-3.5-turbo",
            messages: prompt,
            max_tokens: 4086,
        }
    );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    const prompt = [
        {
            role: "system",
            content: "lol",
        },
        {
            role: "user",
            content: "haha",
        }
    ];

    return res.status(200).json( req.body )
  }

}
