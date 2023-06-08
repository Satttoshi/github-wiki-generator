import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type Data = {
    message: string;
};

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

async function generateGPT35TurboMessage(messages: any){
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    const completion_text = completion.data.choices[0].message.content;
    console.log(completion_text);

    return "test String return of function";
}





export default async function handler(request: NextApiRequest, response: NextApiResponse<Data>) {
    if (request.method === 'POST') {
        const userPrompt: string = request.body.input;

        if (!userPrompt) {
            return response.status(400).json({ error: 'Missing prompt in request body.' });
        }

        try {
            const message = await generateGPT35TurboMessage(userPrompt);
            console.log(message);
            response.status(200).json({ message });
        } catch (error) {
            response.status(500).json({ error: 'Error generating message.' });
        }
    } else {
        response.status(405).json({ error: 'Method not allowed. Please use POST method.' });
    }
}
