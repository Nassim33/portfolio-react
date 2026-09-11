import { Link as ScrollLink } from "react-scroll";
import { useLocation } from "react-router-dom";
import { Drawer, Switch, theme } from "antd";
import { MenuOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import defaultNavLogo from "./defaultNavLogo.svg";
import { useUiStore } from "../../stores/useUiStore";
import TransitionLink from "./TransitionLink";

const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    { id: "2R", name: "All Projects", route: "/All-Projects" },
  ],
  to: [
    { id: "1T", name: "Home", to: "Home" },
    { id: "2T", name: "About Me", to: "About" },
    { id: "3T", name: "Skills", to: "Skills" },
    { id: "4T", name: "Projects", to: "Projects" },
    { id: "5T", name: "Contact", to: "Contact" },
  ],
};

function ThemeToggle({ onClick }: { onClick?: () => void }) {
  const isDark = useUiStore((s) => s.theme === "dark");
  const toggleTheme = useUiStore((s) => s.toggleTheme);

  return (
    <Switch
      checked={isDark}
      onChange={() => {
        toggleTheme();
        onClick?.();
      }}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      aria-label={`Toggle theme, currently ${isDark ? "dark" : "light"}.`}
    />
  );
}

function SectionNavLinks({ mobile }: { mobile?: boolean }) {
  const { pathname } = useLocation();
  const closeExpanded = useUiStore((s) => s.closeExpanded);

  if (pathname !== "/") return null;

  const scrollClassName = `section-nav-link${mobile ? " mobile" : ""}`;

  return (
    <>
      {navLinks.to.map((el) => (
        <ScrollLink
          key={el.id}
          to={el.to}
          spy={true}
          activeClass="active"
          className={scrollClassName}
          onClick={closeExpanded}
          offset={-61}
        >
          <span className="nav-underline" />
          {el.name}
        </ScrollLink>
      ))}
    </>
  );
}

function RouteNavLinks({ mobile }: { mobile?: boolean }) {
  const { pathname } = useLocation();
  const closeExpanded = useUiStore((s) => s.closeExpanded);

  if (pathname === "/") return null;

  const routeClassName = `section-nav-link${mobile ? " mobile" : ""}`;

  return (
    <>
      {navLinks.routes.map((el) => (
        <TransitionLink
          key={el.id}
          to={el.route}
          className={routeClassName}
          onClick={closeExpanded}
        >
          <span
            className="nav-underline"
            style={{
              transform: pathname === el.route ? "scaleX(1)" : "scaleX(0)",
            }}
          />
          {el.name}
        </TransitionLink>
      ))}
    </>
  );
}

function MobileDrawer() {
  const isExpanded = useUiStore((s) => s.isExpanded);
  const closeExpanded = useUiStore((s) => s.closeExpanded);
  const isDark = useUiStore((s) => s.theme === "dark");
  const { token } = theme.useToken();

  return (
    <Drawer
      title="Menu"
      placement="right"
      closable={true}
      onClose={closeExpanded}
      open={isExpanded}
      width={280}
      styles={{
        header: {
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          padding: "1rem 1.5rem",
        },
        body: {
          padding: 0,
          background: token.colorBgContainer,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <nav
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
        aria-label="Mobile navigation"
      >
        <SectionNavLinks mobile />
        <RouteNavLinks mobile />
      </nav>

      <div
        style={{
          padding: "0.875rem 1.5rem",
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: token.colorText, fontSize: "0.9rem" }}>
          {isDark ? "Dark" : "Light"} mode
        </span>
        <ThemeToggle onClick={closeExpanded} />
      </div>
    </Drawer>
  );
}

export default function NavBar() {
  const closeExpanded = useUiStore((s) => s.closeExpanded);
  const toggleExpanded = useUiStore((s) => s.toggleExpanded);
  const { token } = theme.useToken();

  return (
    <>
      <div style={{ height: "var(--nav-height)" }} />
      <header
        id="nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          padding: "0 2rem",
          height: "var(--nav-height)",
          background: `color-mix(in srgb, ${token.colorBgContainer} 88%, transparent)`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <TransitionLink
          to="/"
          onClick={closeExpanded}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            alt="Logo"
            src={defaultNavLogo}
            width="35"
            height="35"
            style={{
              borderRadius: "50%",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(10deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          />
        </TransitionLink>

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <SectionNavLinks />
          <RouteNavLinks />
          <div className="nav-divider" />
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-nav-btn"
          onClick={toggleExpanded}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: token.colorText,
            fontSize: "1.375rem",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: 8,
            transition: "background 0.15s ease",
          }}
          aria-label="Toggle navigation"
        >
          <MenuOutlined />
        </button>
      </header>

      <MobileDrawer />

      <style>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nav-divider {
          width: 1px;
          height: 24px;
          background: ${token.colorBorderSecondary};
        }
        .section-nav-link {
          position: relative;
          color: ${token.colorText};
          padding: 0.5rem 0.375rem;
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .section-nav-link:hover {
          color: ${token.colorPrimary};
        }
        .section-nav-link .nav-underline {
          position: absolute;
          bottom: 0.25rem;
          left: 50%;
          width: 70%;
          height: 2px;
          border-radius: 1px;
          background: ${token.colorPrimary};
          transform: translateX(-50%) scaleX(0);
          transition: transform 0.25s ease;
        }
        .section-nav-link.active .nav-underline {
          transform: translateX(-50%) scaleX(1);
        }
        .section-nav-link.active {
          font-weight: 600;
        }

        .section-nav-link.mobile {
          display: block;
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
          border-left: 3px solid transparent;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .section-nav-link.mobile:hover {
          background: ${token.colorText}08;
        }
        .section-nav-link.mobile.active {
          background: ${token.colorPrimary}10;
          border-left-color: ${token.colorPrimary};
          color: ${token.colorPrimary};
        }
        .section-nav-link.mobile .nav-underline {
          display: none;
        }

        #nav .mobile-nav-btn:hover {
          background: ${token.colorText}08;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}