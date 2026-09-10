import { Flex, theme } from "antd";
import { useUiStore } from "../../stores/useUiStore";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const { token } = theme.useToken();
  const isDark = useUiStore((s) => s.theme === "dark");

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "var(--min-footer-height)",
        background: isDark ? "#121214" : token.colorBgContainer,
        borderTop: `1px solid ${isDark ? "#27272A" : token.colorBorderSecondary}`,
        padding: "0.5rem",
      }}
    >
      <SocialLinks />
    </Flex>
  );
}
