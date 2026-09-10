import {
  contactFormSchema,
  githubReposSchema,
  githubUserSchema,
  themeSchema,
} from "./schemas";

describe("themeSchema", () => {
  it("accepts light and dark", () => {
    expect(themeSchema.parse("light")).toBe("light");
    expect(themeSchema.parse("dark")).toBe("dark");
  });

  it("rejects unknown values", () => {
    expect(themeSchema.safeParse("sepia").success).toBe(false);
  });
});

describe("githubUserSchema", () => {
  it("parses a limited payload and strips unknown keys", () => {
    const result = githubUserSchema.parse({
      login: "octocat",
      id: 1,
      name: "The Octocat",
      avatar_url: "https://github.com/images/octocat.png",
      bio: "Cat",
      html_url: "https://github.com/octocat",
    });
    expect(result).toEqual({
      name: "The Octocat",
      avatar_url: "https://github.com/images/octocat.png",
      bio: "Cat",
      html_url: "https://github.com/octocat",
    });
  });

  it("accepts null/undefined optional fields", () => {
    const result = githubUserSchema.parse({ name: null });
    expect(result.name).toBeNull();
  });

  it("rejects a non-object payload", () => {
    expect(githubUserSchema.safeParse([1, 2, 3]).success).toBe(false);
  });
});

describe("githubReposSchema", () => {
  it("parses a repo and strips unknown keys", () => {
    const result = githubReposSchema.parse([
      {
        id: 1296269,
        name: "hello-world",
        description: null,
        html_url: "https://github.com/octocat/Hello-World",
        homepage: "https://example.com",
        stargazers_count: 5,
        fork: false,
      },
    ]);
    expect(result[0]).toEqual({
      id: 1296269,
      name: "hello-world",
      description: null,
      html_url: "https://github.com/octocat/Hello-World",
      homepage: "https://example.com",
    });
  });

  it("accepts missing description/homepage", () => {
    const result = githubReposSchema.parse([
      { id: 1, name: "a", html_url: "https://github.com/a" },
    ]);
    expect(result[0].description).toBeUndefined();
    expect(result[0].homepage).toBeUndefined();
  });

  it("rejects malformed repos", () => {
    expect(
      githubReposSchema.safeParse([{ id: "not-a-number" }]).success
    ).toBe(false);
  });
});

describe("contactFormSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactFormSchema.parse({
      name: "Sam",
      email: "sam@example.com",
      message: "Hello",
    });
    expect(result.message).toBe("Hello");
  });

  it("rejects missing name", () => {
    const result = contactFormSchema.safeParse({
      name: "",
      email: "sam@example.com",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Sam",
      email: "not-an-email",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty message", () => {
    const result = contactFormSchema.safeParse({
      name: "Sam",
      email: "sam@example.com",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});