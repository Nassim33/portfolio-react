import React from "react";
import { Link } from "react-scroll";
import { Icon } from "@iconify/react";
import { Space, Typography, theme } from "antd";

export function Title({ children }: { children: React.ReactNode }) {
  const { token } = theme.useToken();

  return (
    <Space
      vertical
      size={0}
      style={{
        display: "flex",
        marginBottom: "2.5rem",
        width: "100%",
        maxWidth: 1200,
      }}
    >
      <Typography.Title
        level={2}
        style={{
          margin: 0,
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          color: token.colorText,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {children}
      </Typography.Title>
      <div
        style={{
          marginTop: "0.75rem",
          height: 3,
          width: "3rem",
          borderRadius: 2,
          background: token.colorPrimary,
        }}
      />
    </Space>
  );
}

export function BackToTop({ home }: { home: string }) {
  const { token } = theme.useToken();
  const [showUp, setShowUp] = React.useState(false);

  React.useEffect(() => {
    const updateScrollY = () => {
      const show = window.scrollY > 500;
      setShowUp((prev) => (prev === show ? prev : show));
    };

    updateScrollY();
    window.addEventListener("scroll", updateScrollY, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  return (
    <Space
      style={{
        position: "fixed",
        bottom: "calc(var(--min-footer-height) + 1.5rem)",
        right: "1.5rem",
        visibility: showUp ? "visible" : "hidden",
        zIndex: 50,
      }}
    >
      <Link to={home} className="link-icons">
        <Icon icon="fa6-solid:circle-chevron-up" style={{ color: token.colorText }}/>
      </Link>
    </Space>
  );
}
