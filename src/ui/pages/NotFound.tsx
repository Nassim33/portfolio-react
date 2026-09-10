import React from "react";
import { logo } from "../assets";
import { Flex, Typography, theme } from "antd";
import { useGitHubUser } from "../../hooks/useGitHubData";

export default function NotFound() {
  const { data: user } = useGitHubUser();
  const name = user?.name ?? "Portfolio";
  const { token } = theme.useToken();

  React.useEffect(() => {
    document.title = `${name} | Portfolio`;
  }, [name]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - var(--nav-height))",
      }}
    >
      <Flex align="center" justify="center" gap={8}>
        <span style={{ fontSize: "5rem", color: token.colorText }}>4</span>
        <img
          src={logo}
          alt="React Logo"
          style={{
            width: "10rem",
            animation: "spin-slow 20s linear infinite",
          }}
        />
        <span style={{ fontSize: "5rem", color: token.colorText }}>4</span>
      </Flex>
      <Typography.Paragraph
        style={{
          fontSize: "2rem",
          textAlign: "center",
          color: token.colorText,
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        Sorry, page not found...
      </Typography.Paragraph>
    </main>
  );
}
