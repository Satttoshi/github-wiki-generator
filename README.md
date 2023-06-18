# Github Wiki Generator

This tool leverages the power of **GPT-3.5 Turbo** from **OpenAI** to generate Wiki articles for your GitHub repositories. It takes a main topic and a subtopic to generate an in-depth article in GitHub Markdown format.

Check out the examples within the [Wiki](https://github.com/Satttoshi/github-wiki-generator/wiki) this Repository!


![image](https://github.com/Satttoshi/github-wiki-generator/assets/109807794/6143826a-d58f-421e-83a4-03148dfc22eb)

## Features

- Generate Wiki articles based on main topic and subtopic
- Edit and push directly into wiki
- ### <span style="color:red">Output is currently only in german language!</span>
- Utilizes OpenAI's GPT-3.5 Turbo model for content generation
- Requires OpenAI API Key ( paid for gpt-3.5-turbo )
- Currently works only in a local environment
- Easy to run with just a few steps

## Getting Started

### Add your OpenAI API key

Create an account at https://platform.openai.com/signup and obtain your API key.

Copy the `.env.local.example` file to `.env.local`:

```shell
cp .env.local.example .env.local
```

Open the `.env.local` file and add your OpenAI API key:

```shell
OPENAI_API_KEY=your_api_key_here
```

### Configure your GitHub repository

Open the services/github/config.json file. You will see the following:

```json
{
  "owner": "user-name",
  "repo": "repo-name",
  "ssh": true
}
```

Replace "user-name" with your GitHub username, "repo-name" with the name of your repository. The "ssh" field should be set to true if you're using SSH or false if you're using HTTPS for cloning the repository.

If you are using HTTPS you also need to configure the GITHUB_ACCESS_TOKEN

```shell
GH_ACCESS_TOKEN=your_access_token_here
```

### Do not forget to:

```bash
npm i
```

### Run the development server:

```bash
npm run dev
```

---

## Note

Currently, this tool can only be run locally. We're continuously working on improvements, so stay tuned for updates.

Enjoy creating awesome Wiki articles for your projects with GitHub Wiki Generator!
