import { Element } from "react-scroll";
import { moreInfo } from "../../data";
import { Flex, Grid, Typography, theme } from "antd";
import { Title } from "./globalStyledComponents";
import { useGitHubUser } from "../../hooks/useGitHubData";

const { useBreakpoint } = Grid;
const { Paragraph } = Typography;

export default function AboutMe() {
  const { data: user } = useGitHubUser();
  const screens = useBreakpoint();
  const isDesktop = screens.md;
  const { token } = theme.useToken();

  return (
    <Element name={"About"} id="about">
      <section className="section">
        <div
          style={{
            width: "100%",
            padding: "0 2rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Title>About Me</Title>

          <Flex
            vertical={!isDesktop}
            align={isDesktop ? "center" : "center"}
            justify="center"
            gap={48}
            style={{ width: "100%" }}
          >
            <Flex
              vertical
              gap={16}
              style={{
                flex: 1,
                textAlign: isDesktop ? "left" : "center",
                maxWidth: 600,
              }}
            >
              <Paragraph
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  color: token.colorTextSecondary,
                }}
              >
                {user?.bio}
              </Paragraph>
              {moreInfo && (
                <Paragraph
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: 1.7,
                    color: token.colorTextSecondary,
                  }}
                >
                  {moreInfo}
                </Paragraph>
              )}
            </Flex>

            {isDesktop && user?.avatar_url && (
              <Flex justify="center">
                <img
                  src={user.avatar_url}
                  alt="GitHub Avatar"
                  loading="lazy"
                  style={{
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    border: `3px solid ${token.colorBorderSecondary}`,
                  }}
                />
              </Flex>
            )}
          </Flex>
        </div>
      </section>
    </Element>
  );
}
