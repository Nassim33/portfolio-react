import React from "react";
import { Element } from "react-scroll";
import { skillData, resume } from "../../data";
import { Button, Flex, Grid, Typography, theme } from "antd";
import { Title } from "./globalStyledComponents";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const SkillItem = ({
  skill,
  name,
}: {
  skill: React.ReactNode;
  name: string;
}) => {
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      align="center"
      gap={8}
      style={{
        padding: "1.25rem 0.75rem",
        borderRadius: 8,
        transition: "background 0.2s ease",
        color: token.colorText,
      }}
    >
      {skill}
      <Text
        style={{
          fontSize: "0.85rem",
          color: token.colorTextSecondary,
          fontWeight: 500,
        }}
      >
        {name}
      </Text>
    </Flex>
  );
};

export default function Skills() {
  const screens = useBreakpoint();
  const { token } = theme.useToken();

  const getSpan = () => {
    if (screens.lg) return 100 / 4;
    if (screens.md) return 100 / 3;
    return 100 / 3;
  };

  return (
    <Element name={"Skills"} id="skills">
      <section className="section">
        <div
          style={{
            width: "100%",
            padding: "0 2rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Title>Skills</Title>

          <Flex
            wrap="wrap"
            justify="center"
            style={{ width: "100%" }}
          >
            {skillData.map((s) => (
              <div key={s.id} style={{ width: `${getSpan()}%`, minWidth: 100 }}>
                <SkillItem skill={s.skill} name={s.name} />
              </div>
            ))}
          </Flex>

          {resume && (
            <Flex justify="center" style={{ marginTop: "2rem" }}>
              <a href={resume}>
                <Button
                  size="large"
                  style={{
                    borderColor: token.colorPrimary,
                    color: token.colorPrimary,
                  }}
                >
                  R&eacute;sum&eacute;
                </Button>
              </a>
            </Flex>
          )}
        </div>
      </section>
    </Element>
  );
}
