import React from "react";
import { Element } from "react-scroll";
import { Icon } from "@iconify/react";
import { filteredProjects } from "../../data";
import { Button, Flex, Grid, Spin, Typography, theme } from "antd";
import { Title } from "./globalStyledComponents";
import StyledCard from "./StyledCard";
import { useGitHubRepos } from "../../hooks/useGitHubData";
import TransitionLink from "./TransitionLink";

const { useBreakpoint } = Grid;

export default function Projects() {
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const { data = [], isLoading, error } = useGitHubRepos();

  const mainProjects = React.useMemo(() => {
    if (filteredProjects.length === 0) {
      return data.slice(0, 3);
    }
    const featured = data.filter((project) =>
      filteredProjects.includes(project.name)
    );
    return featured.length !== 0 ? featured : data.slice(0, 3);
  }, [data]);

  return (
    <Element name={"Projects"} id="projects">
      <section className="section">
        <div
          style={{
            width: "100%",
            padding: "0 2rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Title>Projects</Title>

            {data.length > 3 && (
              <TransitionLink to="/All-Projects" style={{ marginBottom: "2.5rem" }}>
                <Button
                  type="link"
                  style={{
                    color: token.colorPrimary,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  View all <Icon icon="icomoon-free:github" />
                </Button>
              </TransitionLink>
            )}
          </Flex>

          {isLoading && (
            <Flex justify="center" style={{ padding: "2rem 0" }}>
              <Spin size="large" />
            </Flex>
          )}

          {error && (
            <Typography.Title
              level={3}
              style={{ textAlign: "center", color: token.colorText }}
            >
              {error.message}
            </Typography.Title>
          )}

          {!error && data.length === 0 && (
            <Typography.Title
              level={3}
              style={{ textAlign: "center", color: token.colorText }}
            >
              Oops, you do not have any GitHub projects yet...
            </Typography.Title>
          )}

          {mainProjects.length !== 0 && (
            <Flex
              wrap="wrap"
              justify="center"
              gap={20}
              style={{ width: "100%" }}
            >
              {mainProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    width: screens.lg ? "31%" : screens.md ? "47%" : "100%",
                    minWidth: 280,
                  }}
                >
                  <StyledCard
                    image={project.image}
                    name={project.name}
                    description={project.description}
                    url={project.html_url}
                    demo={project.homepage}
                  />
                </div>
              ))}
            </Flex>
          )}
        </div>
      </section>
    </Element>
  );
}
