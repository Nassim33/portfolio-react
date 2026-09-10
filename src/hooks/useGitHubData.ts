import { useQuery } from "@tanstack/react-query";
import { githubUsername } from "../data";
import { fetchGitHubRepos, fetchGitHubUser, withProjectImages } from "../lib/github";
import type { GitHubRepo, GitHubUser } from "../schemas";

export function useGitHubUser() {
  return useQuery<GitHubUser>({
    queryKey: ["github", "user", githubUsername],
    queryFn: fetchGitHubUser,
  });
}

export function useGitHubRepos() {
  return useQuery<GitHubRepo[]>({
    queryKey: ["github", "repos", githubUsername],
    queryFn: fetchGitHubRepos,
    select: withProjectImages,
  });
}