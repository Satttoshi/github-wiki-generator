# Github Wiki Generator

This tool leverages the power of **GPT-3.5 Turbo** from **OpenAI** to generate Wiki articles for your GitHub repositories. It takes a main topic and a subtopic to generate an in-depth article in GitHub Markdown format.

## Features

- Generate Wiki articles based on main topic and subtopic
- ### <span style="color:red">Output is currently only in german language!</span>
- Utilizes OpenAI's GPT-3.5 Turbo model for content generation
- Requires a local environment file (.env.local) for API key storage
- Currently works only in a local environment
- Easy to run with just a few steps

## Installation and Usage

Before running the tool, make sure you have the OpenAI API key ready. It is needed for the application to fetch content from the GPT-3.5 Turbo model.

Follow the steps below to set up the tool:

1. Clone this repository to your local machine:

2. Inside the cloned repository, create a new file named `.env.local`. This file is crucial for the application to authenticate with OpenAI's API.

3. Open `.env.local` and add the following line: Replace `<yourapikey>` with your actual OpenAI API key.

```.env
OPENAI_API_KEY="InsertYourApiKeyHere"
```

4. After setting up the `.env.local` file, open the console and navigate to the root of the cloned repository.

5. To run the tool, type the following command in the console:

```bash
npm run dev
```

6. Go to your browser and visit [localhost:3000](localhost:3000)

The GitHub Wiki Generator tool is now ready for use!

## Note

Currently, this tool can only be run locally. We're continuously working on improvements, so stay tuned for updates.

Enjoy creating awesome Wiki articles for your projects with GitHub Wiki Generator!
