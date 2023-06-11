// @ts-ignore
import simpleGit, { SimpleGit } from "simple-git";
import fs from "fs/promises";
import path from "path";
import config from "./config.json";

const { owner, repo, ssh } = config;

const { GH_ACCESS_TOKEN } = process.env;

interface WikiParams {
  wikiPage: string;
  wikiContent: string;
}

export default async function updateWiki(params: WikiParams): Promise<void> {
  try {
    const git: SimpleGit = simpleGit();

    // Clone the wiki
    const wikiUrl: string = ssh
      ? `git@github.com:${owner}/${repo}.wiki.git`
      : `https://${GH_ACCESS_TOKEN}@github.com/${owner}/${repo}.wiki.git`;

    await git.clone(wikiUrl, `./wikis/${repo}`);

    // Create or edit the wiki page
    await fs.writeFile(
      path.join(`./wikis/${repo}`, `${params.wikiPage}.md`),
      params.wikiContent
    );

    // Commit and push the changes
    await git.cwd(`./wikis/${repo}`);
    await git.add("./*");
    await git.commit("Updated the wiki");
    await git.push("origin", "master");

    console.log(`Wiki page "${params.wikiPage}" has been updated.`);

    // Clear the repository immediately after pushing
    await fs.rm(`./wikis/${repo}`, { recursive: true, force: true });
    console.log(`Cleared the './wikis/${repo}' directory.`);
  } catch (error) {
    console.error(error);
  }
}
