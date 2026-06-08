import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const s = {
    footer: {
        background: "#1C0A00",
        borderTop: "1px solid #3D1F00",
        fontFamily: "'DM Sans', sans-serif",
        padding: "56px 0 0",
    },

    container: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px 32px",
        marginBottom: 48,
    },

    logoRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        marginBottom: 14,
    },

    logoText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#FFFAF5",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },

    logoAccent: {
        color: "#FB923C",
    },

    desc: {
        fontSize: "13px",
        color: "#A8896C",
        lineHeight: 1.65,
        marginBottom: 18,
    },

    socialRow: {
        display: "flex",
        gap: 8,
    },

    socialBtn: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "1px solid #3D1F00",
        background: "transparent",
        color: "#A8896C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 14,
        transition: "all 0.2s",
        textDecoration: "none",
    },

    colHeading: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "#FB923C",
        textTransform: "uppercase",
        letterSpacing: "2px",
        marginBottom: 18,
    },

    navLink: {
        display: "block",
        color: "#A8896C",
        textDecoration: "none",
        fontSize: "14px",
        marginBottom: 10,
        transition: "color 0.18s",
    },

    contactRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        color: "#A8896C",
        fontSize: "14px",
        marginBottom: 12,
        lineHeight: 1.5,
    },

    contactIcon: {
        color: "#C2410C",
        flexShrink: 0,
        marginTop: 2,
    },

    hoursRow: {
        fontSize: "14px",
        color: "#A8896C",
        marginBottom: 8,
        display: "flex",
        justifyContent: "space-between",
    },

    hoursValue: {
        color: "#FFFAF5",
        fontWeight: 500,
    },

    emailRow: {
        display: "flex",
        marginTop: 16,
        gap: 8,
    },

    emailInput: {
        flex: 1,
        background: "#2A0F00",
        border: "1px solid #3D1F00",
        borderRadius: 8,
        padding: "9px 14px",
        fontSize: "13px",
        color: "#FFFAF5",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
    },

    emailBtn: {
        background: "#C2410C",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 8,
        padding: "9px 18px",
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        whiteSpace: "nowrap",
    },

    bottomBar: {
        borderTop: "1px solid #2A0F00",
    },

    divider: {
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        maxWidth: 1100,
        margin: "0 auto",
    },

    bottomText: {
        fontSize: "12px",
        color: "#5C3D1E",
        letterSpacing: "0.5px",
    },

    bottomLinks: {
        display: "flex",
        gap: 20,
    },

    bottomLink: {
        fontSize: "12px",
        color: "#5C3D1E",
        textDecoration: "none",
    },
};


export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={s.footer}>
            <div style={s.container}>
                <div style={s.grid}>
                    <div>
                        <Link to="/" style={s.logoRow}>
                            <span style={{ fontSize: "1.6rem" }}>🥢</span>
                            <span style={s.logoText}>Asian <span style={s.logoAccent}>Way</span></span>
                        </Link>
                        <p style={s.desc}>Please put description later maybe</p>
                        <div style={s.socialRow}>
                            {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" style={s.socialBtn}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#FB923C"; e.currentTarget.style.borderColor = "#C2410C"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "#A8896C"; e.currentTarget.style.borderColor = "#3D1F00"; }}>
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div style={s.colHeading}>Explore</div>
                        {[{ to: "/menu", label: "Menu" }, { to: "/about", label: "About" }, { to: "/contact", label: "Reservations" }, { to: "/contact", label: "Contact" }].map(({ to, label }) => (
                            <Link key={label} to={to} style={s.navLink}
                                onMouseEnter={e => e.currentTarget.style.color = "#FB923C"}
                                onMouseLeave={e => e.currentTarget.style.color = "#A8896C"}>
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div>
                        <div style={s.colHeading}>Contact</div>
                        <div style={s.contactRow}><MapPin size={15} style={s.contactIcon} />123 Lantern Street, District 1, HCMC</div>
                        <div style={s.contactRow}><Phone size={15} style={s.contactIcon} />+84 (0) 90 123 4567</div>
                    </div>
                    <div>
                        <div style={s.colHeading}>Service Hours</div>
                        <div style={s.hoursRow}><span>Mon – Fri</span><span style={s.hoursValue}>11:00 – 22:30</span></div>
                        <div style={s.hoursRow}><span>Sat – Sun</span><span style={s.hoursValue}>10:00 – 23:30</span></div>
                        <div style={s.emailRow}>
                            <input type="email" placeholder="Your email" style={s.emailInput}
                                onFocus={e => e.target.style.borderColor = "#C2410C"}
                                onBlur={e => e.target.style.borderColor = "#3D1F00"} />
                            <button style={s.emailBtn}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={s.bottomBar}>
                <div style={s.divider}>
                    <span style={s.bottomText}>© {currentYear} THE ASIAN WAY STUDIO.</span>
                    <div style={s.bottomLinks}>
                        {["Privacy", "Terms"].map(l => (
                            <a key={l} href="#" style={s.bottomLink}
                                onMouseEnter={e => e.currentTarget.style.color = "#FB923C"}
                                onMouseLeave={e => e.currentTarget.style.color = "#5C3D1E"}>{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}