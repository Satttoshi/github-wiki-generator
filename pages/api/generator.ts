import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function openaiApiRequest (message: any){
    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: message,
    });

    const completionText = completion.data.choices[0].text;
    console.log(completionText);

    return completionText;
}


export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        const userPrompt: string = request.body.input;

        if (!userPrompt) {
            return response.status(400).json({ error: 'Missing prompt in request body.' });
        }

        try {
            const message = await openaiApiRequest(userPrompt);
            console.log(message);
            response.status(200).json({ message });
        } catch (error) {
            response.status(500).json({ error: 'Error generating message.' });
        }
    } else {
        response.status(405).json({ error: 'Method not allowed. Please use POST method.' });
    }
}
