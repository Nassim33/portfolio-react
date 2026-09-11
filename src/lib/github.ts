import { githubUsername, projectCardImages } from "../data";
import { githubReposSchema, githubUserSchema } from "../schemas";
import type { GitHubRepo, GitHubUser } from "../schemas";

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `GitHub API error ${response.status}, check username in data.tsx (currently ${githubUsername})`
    );
  }
  try {
    return await response.json();
  } catch {
    throw new Error(`GitHub API returned an invalid JSON response for ${url}`);
  }
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const userUrl = `https://api.github.com/users/${githubUsername}`;
  const data = await fetchJson(userUrl);
  return githubUserSchema.parse(data);
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const reposUrl = `https://api.github.com/users/${githubUsername}/repos?per_page=100`;
  const data = await fetchJson(reposUrl);
  return githubReposSchema.parse(data);
}

const projectImagesByName = new Map(
  projectCardImages.map((project) => [project.name.toLowerCase(), project.image])
);

export function withProjectImages(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.map((repo) => {
    const image = projectImagesByName.get(repo.name.toLowerCase());
    return image ? { ...repo, image } : repo;
  });
}