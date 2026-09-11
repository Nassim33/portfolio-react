import React, { ViewTransition, useDeferredValue, startTransition } from "react";
import { Icon } from "@iconify/react";
import { Flex, Grid, Input, Pagination, Space, Spin, Typography, theme } from "antd";
import { BackToTop, Title } from "../components/globalStyledComponents";
import StyledCard from "../components/StyledCard";
import Footer from "../components/Footer";
import { useGitHubRepos, useGitHubUser } from "../../hooks/useGitHubData";
import { getPageCount, getPageSlice } from "./projectPagination";

const { useBreakpoint } = Grid;
const { Search } = Input;

export default function AllProjects() {
  const { data = [], isLoading, error } = useGitHubRepos();
  const { data: user } = useGitHubUser();
  const name = user?.name ?? "Portfolio";
  const screens = useBreakpoint();
  const { token } = theme.useToken();
  const [searchInput, setSearchInput] = React.useState("");
  const [activePage, setActivePage] = React.useState(1);
  const deferredSearch = useDeferredValue(searchInput);

  React.useEffect(() => {
    document.title = `${name} | All Projects`;
  }, [name]);

  const filteredData = React.useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (query === "") return data;
    return data.filter((repo) => repo.name.toLowerCase().includes(query));
  }, [data, deferredSearch]);

  const pageCount = React.useMemo(
    () => getPageCount(filteredData.length),
    [filteredData.length]
  );

  const goToPage = (page: number) => startTransition(() => setActivePage(page));

  const paginatedProjects = React.useMemo(
    () => getPageSlice(filteredData, activePage),
    [filteredData, activePage]
  );

  const renderBody = () => {
    if (isLoading) {
      return (
        <Flex justify="center" style={{ padding: "2rem 0" }}>
          <Spin size="large" />
        </Flex>
      );
    }
    if (error) {
      return (
        <Typography.Title
          level={3}
          style={{ textAlign: "center", margin: "2rem 0", color: token.colorText }}
        >
          {error.message}
        </Typography.Title>
      );
    }
    return (
      <Flex vertical align="center" style={{ width: "100%" }}>
        <Search
          placeholder="Project name"
          onChange={(e) => {
            setSearchInput(e.target.value);
            setActivePage(1);
          }}
          style={{ maxWidth: 600, width: "100%", marginBottom: "1.5rem" }}
          size="large"
        />

        {filteredData.length === 0 && (
          <Typography.Title
            level={3}
            style={{ textAlign: "center", margin: "2rem 0", color: token.colorText }}
          >
            No projects match your search.
          </Typography.Title>
        )}

        <Flex
          wrap="wrap"
          justify="center"
          gap={16}
          style={{ width: "100%", minHeight: "var(--card-height)" }}
        >
          {paginatedProjects.map((project) => (
            <ViewTransition
              key={project.id}
              name={`project-${project.id}`}
              default="vt-card"
            >
              <Space
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
              </Space>
            </ViewTransition>
          ))}
        </Flex>

        {filteredData.length !== 0 && (
          <Flex justify="center" style={{ marginTop: "1rem" }}>
            <Pagination
              current={activePage}
              total={filteredData.length}
              pageSize={6}
              onChange={(page) => goToPage(page)}
              showSizeChanger={false}
              size={pageCount <= 2 ? "large" : "small"}
            />
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <>
      <main>
        <section
          style={{
            minHeight: "calc(100vh - var(--min-footer-height) - var(--nav-height))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Flex
            vertical
            align="center"
            style={{ width: "100%", padding: "0 1.5rem" }}
          >
            <Title>
              All <Icon icon="mdi:github" /> Projects
            </Title>
            {renderBody()}
          </Flex>
        </section>
      </main>
      <BackToTop home="Home" />
      <Footer />
    </>
  );
}
