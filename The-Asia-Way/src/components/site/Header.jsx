import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/store/cart.store";
import { Menu, X } from "lucide-react";

const s = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(13,13,13,0.95)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid #2A0000",
    fontFamily: "'DM Sans', sans-serif",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  logoEmoji: { fontSize: "1.5rem" },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#FAFAFA",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  logoAccent: { color: "#F87171" },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: (active) => ({
    display: "block",
    padding: "6px 14px",
    fontSize: "14px",
    color: active ? "#FAFAFA" : "#888",
    textDecoration: "none",
    borderRadius: 8,
    background: active ? "rgba(192,0,0,0.15)" : "transparent",
    transition: "all 0.18s",
    fontWeight: active ? 500 : 400,
  }),
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  btnOutlineRed: {
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: 8,
    border: "1px solid #C00000",
    background: "transparent",
    color: "#F87171",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    transition: "all 0.18s",
    whiteSpace: "nowrap",
  },
  btnRed: {
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: 8,
    border: "none",
    background: "#C00000",
    color: "#FAFAFA",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    transition: "all 0.18s",
    whiteSpace: "nowrap",
  },
  btnGhost: {
    padding: "7px 14px",
    fontSize: "13px",
    fontWeight: 400,
    borderRadius: 8,
    border: "1px solid #2A2A2A",
    background: "transparent",
    color: "#666",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    transition: "all 0.18s",
    whiteSpace: "nowrap",
  },
  divider: {
    width: 1,
    height: 20,
    background: "#2A2A2A",
    margin: "0 4px",
  },
  hamburger: {
    background: "transparent",
    border: "1px solid #2A0000",
    borderRadius: 8,
    color: "#888",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    cursor: "pointer",
  },
  mobileMenu: (open) => ({
    background: "#0D0D0D",
    borderTop: "1px solid #2A0000",
    overflow: "hidden",
    maxHeight: open ? 400 : 0,
    transition: "max-height 0.3s ease",
  }),
  mobileInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "16px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mobileLink: (active) => ({
    display: "block",
    padding: "10px 14px",
    fontSize: "15px",
    color: active ? "#F87171" : "#888",
    textDecoration: "none",
    borderRadius: 8,
    background: active ? "rgba(192,0,0,0.1)" : "transparent",
    fontWeight: active ? 500 : 400,
    borderLeft: active ? "2px solid #C00000" : "2px solid transparent",
    transition: "all 0.18s",
  }),
  mobileDivider: {
    height: 1,
    background: "#1E1E1E",
    margin: "8px 0",
  },
  mobileActions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 4,
  },
  mobileBtn: (variant) => ({
    padding: "11px 16px",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: 8,
    border: variant === "red" ? "none" : variant === "outline" ? "1px solid #C00000" : "1px solid #2A2A2A",
    background: variant === "red" ? "#C00000" : "transparent",
    color: variant === "red" ? "#FAFAFA" : variant === "outline" ? "#F87171" : "#666",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
  }),
};

const navItems = [
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header style={s.header}>
      <div style={s.inner}>

        {/* Logo */}
        <Link to="/" style={s.logoLink}>
          <span style={s.logoEmoji}>🥢</span>
          <span style={s.logoText}>
            Asian <span style={s.logoAccent}>Way</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul style={{ ...s.navLinks, display: "flex" }} className="d-none d-md-flex">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                style={s.navLink(location.pathname === to)}
                onMouseEnter={e => { if (location.pathname !== to) e.currentTarget.style.color = "#FAFAFA"; }}
                onMouseLeave={e => { if (location.pathname !== to) e.currentTarget.style.color = "#888"; }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div style={s.actions} className="d-none d-md-flex">
          <Link
            to="/reservation"
            style={s.btnOutlineRed}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,0,0,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Reservations
          </Link>
          <Link
            to="/menu"
            style={s.btnRed}
            onMouseEnter={e => { e.currentTarget.style.background = "#A00000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#C00000"; }}
          >
            Order Online
          </Link>
          <div style={s.divider} />
          <Link
            to="/staff/login"
            style={s.btnGhost}
            onMouseEnter={e => { e.currentTarget.style.color = "#FAFAFA"; e.currentTarget.style.borderColor = "#444"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#2A2A2A"; }}
          >
            Staff
          </Link>
          <Link
            to="/admin/login"
            style={s.btnGhost}
            onMouseEnter={e => { e.currentTarget.style.color = "#FAFAFA"; e.currentTarget.style.borderColor = "#444"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#2A2A2A"; }}
          >
            Admin
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          style={s.hamburger}
          className="d-md-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} color="#F87171" /> : <Menu size={18} color="#888" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={s.mobileMenu(open)} className="d-md-none">
        <div style={s.mobileInner}>
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={s.mobileLink(location.pathname === to)}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div style={s.mobileDivider} />
          <div style={s.mobileActions}>
            <Link to="/reservation" style={s.mobileBtn("outline")} onClick={() => setOpen(false)}>
              Reservations
            </Link>
            <Link to="/menu" style={s.mobileBtn("red")} onClick={() => setOpen(false)}>
              Order Online
            </Link>
            <Link to="/staff/login" style={s.mobileBtn("ghost")} onClick={() => setOpen(false)}>
              Staff Login
            </Link>
            <Link to="/admin/login" style={s.mobileBtn("ghost")} onClick={() => setOpen(false)}>
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}