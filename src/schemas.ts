import { z } from "zod";

export const themeSchema = z.enum(["light", "dark"]);
export type Theme = z.infer<typeof themeSchema>;

export const githubUserSchema = z.object({
  name: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
  html_url: z.string().nullable().optional(),
});

export type GitHubUser = z.infer<typeof githubUserSchema>;

export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  html_url: z.string(),
  homepage: z.string().nullable().optional(),
});

export type GitHubRepo = z.infer<typeof githubRepoSchema> & { image?: string };

export const githubReposSchema = z.array(githubRepoSchema);

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;