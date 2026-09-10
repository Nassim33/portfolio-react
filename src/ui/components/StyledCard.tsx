import { Icon } from "@iconify/react";
import { gh } from "../assets";
import { Card, Flex, Typography, theme } from "antd";

const { Text, Link: AntLink } = Typography;

interface StyledCardProps {
  image?: string;
  name: string;
  description?: string | null;
  url: string;
  demo?: string | null;
}

export default function StyledCard({
  image,
  name,
  description,
  url,
  demo,
}: StyledCardProps) {
  const { token } = theme.useToken();

  return (
    <Card
      hoverable
      style={{
        height: "var(--card-height)",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
      styles={{
        body: {
          flex: 1,
          overflow: "auto",
          textAlign: "center",
        },
      }}
      cover={
        <img
          src={image ? image : gh}
          alt={name}
          style={{
            height: "50%",
            objectFit: "contain",
            padding: "0.75rem",
          }}
        />
      }
    >
      <Flex vertical align="center" gap={12} style={{ height: "100%" }}>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            color: token.colorText,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
          }}
        >
          {name}
        </Typography.Title>
        <Text style={{ color: token.colorTextSecondary, fontSize: "0.9rem" }}>
          {description}
        </Text>
      </Flex>

      <div
        style={{
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          padding: "0.75rem",
          textAlign: "center",
        }}
      >
        {demo && demo !== "" && (
          <AntLink
            href={demo}
            target="_blank"
            style={{ fontSize: "0.95rem", marginRight: "1rem" }}
          >
            Live Demo <Icon icon="icon-park-outline:code-computer" />
          </AntLink>
        )}
        <AntLink
          href={url}
          target="_blank"
          style={{ fontSize: "0.95rem" }}
        >
          GitHub <Icon icon="icomoon-free:github" />
        </AntLink>
      </div>
    </Card>
  );
}
