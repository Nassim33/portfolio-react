import { Link } from "react-scroll";
import { Icon } from "@iconify/react";
import { Dark, heroTagline, Light } from "../../data";
import { Flex, Grid, theme } from "antd";
import SocialLinks from "./SocialLinks";
import { useGitHubUser } from "../../hooks/useGitHubData";
import { useUiStore } from "../../stores/useUiStore";

const { useBreakpoint } = Grid;

export default function Hero() {
  const { data: user } = useGitHubUser();
  const isDark = useUiStore((s) => s.theme === "dark");
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  const bgImage = isDark ? Dark : Light;

  return (
    <header
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        maxWidth: 1920,
        margin: "0 auto",
        minHeight: "calc(100vh - var(--nav-height))",
        color: token.colorText,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: isDesktop
            ? `url(${bgImage}) center center / cover no-repeat fixed`
            : `linear-gradient(135deg, ${token.colorPrimary}, ${token.colorBgLayout})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          background: isDark
            ? "rgba(0, 0, 0, 0.35)"
            : "rgba(255, 255, 255, 0.25)",
        }}
      />

      <Flex
        vertical
        align="center"
        justify="center"
        gap={24}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "2rem",
        }}
      >
        <Flex
          vertical
          align="center"
          gap={20}
          style={{ maxWidth: 800 }}
        >
          <h1
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
              color: token.colorText,
              textAlign: "center",
            }}
          >
            {user?.name}
          </h1>

          {heroTagline && (
            <Flex vertical align="center" gap={8} style={{ maxWidth: 640 }}>
              <p
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: "clamp(1.3rem, 2.4vw, 1.65rem)",
                  fontWeight: 700,
                  color: isDark ? "#5EEAD4" : "#000000",
                  textAlign: "center",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {heroTagline.split(" | ")[0]}
              </p>
              {heroTagline
                .split(" | ")
                .slice(1)
                .map((line) => (
                  <p
                    key={line}
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                      fontWeight: 500,
                      color: isDark
                        ? "rgba(255, 255, 255, 0.85)"
                        : "rgba(28, 25, 23, 0.7)",
                      textAlign: "center",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {line}
                  </p>
                ))}
            </Flex>
          )}

          {user?.bio && (
            <p
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                fontWeight: 400,
                color: isDark
                  ? "rgba(255, 255, 255, 0.85)"
                  : "rgba(28, 25, 23, 0.65)",
                textAlign: "center",
                maxWidth: 520,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {user.bio}
            </p>
          )}

          <Flex align="center" justify="center" style={{ marginTop: "0.5rem" }}>
            <SocialLinks />
          </Flex>
        </Flex>

        <Link
          to="About"
          className="link-icons"
          style={{ marginTop: "1.5rem" }}
        >
          <Icon
            icon="fa6-solid:circle-chevron-down"
            style={{ color: token.colorText }}
          />
        </Link>
      </Flex>
    </header>
  );
}
