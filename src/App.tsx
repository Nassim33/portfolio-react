import React, { ViewTransition } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, Flex, Spin, theme } from "antd";
import { Element } from "react-scroll";
import { antTheme } from "./theme";
import { useUiStore } from "./stores/useUiStore";
import "./global.css";
import NavBar from "./ui/components/NavBar";
import ScrollToTop from "./ui/components/ScrollToTop";
import Home from "./ui/pages/Home";
import NotFound from "./ui/pages/NotFound";

const AllProjects = React.lazy(() => import("./ui/pages/AllProjects"));

function PageBackground() {
  const { token } = theme.useToken();
  const isDark = useUiStore((s) => s.theme === "dark");

  React.useEffect(() => {
    document.body.style.backgroundColor = token.colorBgLayout;
    document.body.style.colorScheme = isDark ? "dark" : "light";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.colorScheme = "";
    };
  }, [token.colorBgLayout, isDark]);

  return null;
}

export default function App() {
  const storeTheme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const [theme, setThemeState] = React.useState(storeTheme);

  React.useEffect(() => {
    React.startTransition(() => setThemeState(storeTheme));
  }, [storeTheme]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!useUiStore.getState().themeUserSet) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", onSystemChange);
    return () => mediaQuery.removeEventListener("change", onSystemChange);
  }, [setTheme]);

  return (
    <ConfigProvider theme={antTheme[theme]}>
      <PageBackground />
      <HashRouter>
        <ViewTransition default="vt-app">
          <Element name={"Home"} id="home">
            <NavBar />
          </Element>
          <ScrollToTop />
          <React.Suspense
            fallback={
              <Flex justify="center" align="center" style={{ padding: "2rem 0" }}>
                <Spin size="large" />
              </Flex>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/All-Projects" element={<AllProjects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </ViewTransition>
      </HashRouter>
    </ConfigProvider>
  );
}
