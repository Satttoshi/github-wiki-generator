import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function openaiApiRequest (prompt: string) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant'
            },
            {
                role: 'user',
                content: prompt
            }
        ]
    });
    // @ts-ignore
    return completion.data.choices[0].message.content;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (!configuration.apiKey) {
        response.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    try {
        console.log(request.body.message);
        const completion = await openaiApiRequest(request.body.message);
        console.log(completion);
        response.status(200).json({ result: completion });

    } catch(error: any) {

        if (error.response) {
            console.error(error.response.status, error.response.data);
            response.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            response.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

