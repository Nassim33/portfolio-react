import { Icon } from "@iconify/react";
import { githubUsername, linkedinUrl } from "../../data";
import { useGitHubUser } from "../../hooks/useGitHubData";
import { Flex } from "antd";

export default function SocialLinks() {
  const { data: user } = useGitHubUser();
  const htmlUrl = user?.html_url ?? `https://github.com/${githubUsername}`;
  const blog = user?.blog;

  return (
    <Flex gap={16} align="center">
      <a
        href={htmlUrl}
        aria-label="Check out my GitHub profile."
        className="link-icons"
      >
        <Icon icon="icomoon-free:github" />
      </a>
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          aria-label="Check out my LinkedIn profile."
          className="link-icons"
        >
          <Icon icon="mdi:linkedin" />
        </a>
      )}
      {blog ? (
        <a href={blog} aria-label="Visit my personal blog." className="link-icons">
          <Icon icon="ph:link-bold" />
        </a>
      ) : null}
    </Flex>
  );
}
