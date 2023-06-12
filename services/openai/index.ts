import { Configuration, OpenAIApi } from "openai";

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface ApiRequest {
  topic: string;
  subTopic: string;
  buzzwords: string[];
  language: string;
}

export default async function openaiApiRequest({
  topic,
  subTopic,
  buzzwords,
  language = "english",
}: ApiRequest) {
  console.log(
    `Fetch starting with: \nTopic: ${topic} \nSub Topic: ${subTopic} and  \nBuzzwords: ${buzzwords}`
  );

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a Software Development Student writing a GitHub Markdown page. 
        The language for the article is ${language}. 
        Start with a level 2 heading (##). 
        Your task is to make sure that each section of the article is closely related to the topic (${topic}) and subtopic (${subTopic}). 
        All buzzwords must be relevant to the topic and thoroughly explained in relation to it.`,
      },
      {
        role: "user",
        content: `TASK: Write a detailed article on the overarching topic of ${topic}, focusing on the subtopic ${subTopic}. 
          If provided buzzwords (${buzzwords.join(
            ", "
          )}) are insufficient, generate additional buzzwords relevant to ${topic} and ${subTopic}.
          TEMPLATE: 
          Summary of ${subTopic}, 
          Table of Contents ( -[…](…) ), 
          Detailed section for each buzzword with definition, relevance to ${topic} and ${subTopic}, 
          examples using code blocks where possible, 
          and conclusion.
          OUTPUT: GitHub Markdown`,
      },
    ],
  });

  return (
    completion.data?.choices[0]?.message?.content || "No content available"
  );
}
