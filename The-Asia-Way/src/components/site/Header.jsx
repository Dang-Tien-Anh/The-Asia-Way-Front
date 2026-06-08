import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/store/cart.store";
import { Menu, X } from "lucide-react";

const s = {
  header: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    background: "rgba(255,250,245,0.96)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid #E8D5B7",
    fontFamily: "'DM Sans', sans-serif",
  },
  inner: {
    maxWidth: 1100, margin: "0 auto", padding: "0 24px",
    display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
  },
  logoLink: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none" },
  logoEmoji: { fontSize: "1.5rem" },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.05rem", fontWeight: 700,
    color: "#1C0A00", textTransform: "uppercase", letterSpacing: "1px",
  },
  logoAccent: { color: "#C2410C" },
  navLinks: { display: "flex", alignItems: "center", gap: 4, listStyle: "none", margin: 0, padding: 0 },
  navLink: (active) => ({
    display: "block", padding: "6px 14px", fontSize: "14px",
    color: active ? "#C2410C" : "#7C6652",
    textDecoration: "none", borderRadius: 8,
    background: active ? "#FEF3E2" : "transparent",
    transition: "all 0.18s", fontWeight: active ? 500 : 400,
  }),
  actions: { display: "flex", alignItems: "center", gap: 8 },
  btnOutline: {
    padding: "7px 16px", fontSize: "13px", fontWeight: 500, borderRadius: 8,
    border: "1px solid #C2410C", background: "transparent", color: "#C2410C",
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
    transition: "all 0.18s", whiteSpace: "nowrap",
  },
  btnFilled: {
    padding: "7px 16px", fontSize: "13px", fontWeight: 500, borderRadius: 8,
    border: "none", background: "#C2410C", color: "#FFFFFF",
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
    transition: "all 0.18s", whiteSpace: "nowrap",
  },
  btnGhost: {
    padding: "7px 14px", fontSize: "13px", fontWeight: 400, borderRadius: 8,
    border: "1px solid #E8D5B7", background: "transparent", color: "#A8896C",
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
    transition: "all 0.18s", whiteSpace: "nowrap",
  },
  divider: { width: 1, height: 20, background: "#E8D5B7", margin: "0 4px" },
  hamburger: {
    background: "transparent", border: "1px solid #E8D5B7", borderRadius: 8,
    color: "#A8896C", display: "flex", alignItems: "center", justifyContent: "center",
    width: 38, height: 38, cursor: "pointer",
  },
  mobileMenu: (open) => ({
    background: "#FFFAF5", borderTop: "1px solid #E8D5B7",
    overflow: "hidden", maxHeight: open ? 400 : 0, transition: "max-height 0.3s ease",
  }),
  mobileInner: {
    maxWidth: 1100, margin: "0 auto", padding: "16px 24px 24px",
    display: "flex", flexDirection: "column", gap: 4,
  },
  mobileLink: (active) => ({
    display: "block", padding: "10px 14px", fontSize: "15px",
    color: active ? "#C2410C" : "#7C6652", textDecoration: "none", borderRadius: 8,
    background: active ? "#FEF3E2" : "transparent", fontWeight: active ? 500 : 400,
    borderLeft: active ? "2px solid #C2410C" : "2px solid transparent", transition: "all 0.18s",
  }),
  mobileDivider: { height: 1, background: "#E8D5B7", margin: "8px 0" },
  mobileActions: { display: "flex", flexDirection: "column", gap: 8, marginTop: 4 },
  mobileBtn: (variant) => ({
    padding: "11px 16px", fontSize: "14px", fontWeight: 500, borderRadius: 8,
    border: variant === "filled" ? "none" : variant === "outline" ? "1px solid #C2410C" : "1px solid #E8D5B7",
    background: variant === "filled" ? "#C2410C" : "transparent",
    color: variant === "filled" ? "#FFFFFF" : variant === "outline" ? "#C2410C" : "#A8896C",
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
    textAlign: "center", display: "block",
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
        <Link to="/" style={s.logoLink}>
          <span style={s.logoEmoji}>🥢</span>
          <span style={s.logoText}>Asian <span style={s.logoAccent}>Way</span></span>
        </Link>

        <ul style={{ ...s.navLinks }} className="d-none d-md-flex">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} style={s.navLink(location.pathname === to)}
                onMouseEnter={e => { if (location.pathname !== to) e.currentTarget.style.color = "#C2410C"; }}
                onMouseLeave={e => { if (location.pathname !== to) e.currentTarget.style.color = "#7C6652"; }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={s.actions} className="d-none d-md-flex">
          <Link to="/reservation" style={s.btnOutline}
            onMouseEnter={e => e.currentTarget.style.background = "#FEF3E2"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            Reservations
          </Link>
          <Link to="/menu" style={s.btnFilled}
            onMouseEnter={e => e.currentTarget.style.background = "#9A3412"}
            onMouseLeave={e => e.currentTarget.style.background = "#C2410C"}>
            Order Online
          </Link>
          <div style={s.divider} />
          <Link to="/staff/login" style={s.btnGhost}
            onMouseEnter={e => { e.currentTarget.style.color = "#1C0A00"; e.currentTarget.style.borderColor = "#A8896C"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#A8896C"; e.currentTarget.style.borderColor = "#E8D5B7"; }}>
            Staff
          </Link>
          <Link to="/admin/login" style={s.btnGhost}
            onMouseEnter={e => { e.currentTarget.style.color = "#1C0A00"; e.currentTarget.style.borderColor = "#A8896C"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#A8896C"; e.currentTarget.style.borderColor = "#E8D5B7"; }}>
            Admin
          </Link>
        </div>

        <button style={s.hamburger} className="d-md-none" onClick={() => setOpen(!open)}>
          {open ? <X size={18} color="#C2410C" /> : <Menu size={18} color="#A8896C" />}
        </button>
      </div>

      <div style={s.mobileMenu(open)} className="d-md-none">
        <div style={s.mobileInner}>
          {navItems.map(({ to, label }) => (
            <Link key={to} to={to} style={s.mobileLink(location.pathname === to)} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <div style={s.mobileDivider} />
          <div style={s.mobileActions}>
            <Link to="/reservation" style={s.mobileBtn("outline")} onClick={() => setOpen(false)}>Reservations</Link>
            <Link to="/menu" style={s.mobileBtn("filled")} onClick={() => setOpen(false)}>Order Online</Link>
            <Link to="/staff/login" style={s.mobileBtn("ghost")} onClick={() => setOpen(false)}>Staff Login</Link>
            <Link to="/admin/login" style={s.mobileBtn("ghost")} onClick={() => setOpen(false)}>Admin Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}