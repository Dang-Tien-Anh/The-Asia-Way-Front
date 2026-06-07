import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap";
if (!document.head.querySelector("link[href*='Playfair+Display']")) {
    document.head.appendChild(fontLink);
}

const s = {
    footer: {
        background: "#0D0D0D",
        borderTop: "1px solid #2A0000",
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
    logoEmoji: { fontSize: "1.6rem" },
    logoText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#FAFAFA",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
    logoAccent: { color: "#F87171" },
    desc: {
        fontSize: "13px",
        color: "#666",
        lineHeight: 1.65,
        marginBottom: 18,
    },
    socialRow: { display: "flex", gap: 8 },
    socialBtn: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "1px solid #3D0000",
        background: "transparent",
        color: "#888",
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
        color: "#F87171",
        textTransform: "uppercase",
        letterSpacing: "2px",
        marginBottom: 18,
    },
    navLink: {
        display: "block",
        color: "#666",
        textDecoration: "none",
        fontSize: "14px",
        marginBottom: 10,
        transition: "color 0.18s",
    },
    contactRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        color: "#666",
        fontSize: "14px",
        marginBottom: 12,
        lineHeight: 1.5,
    },
    contactIcon: { color: "#C00000", flexShrink: 0, marginTop: 2 },
    hoursRow: {
        fontSize: "14px",
        color: "#666",
        marginBottom: 8,
        display: "flex",
        justifyContent: "space-between",
    },
    hoursValue: { color: "#FAFAFA", fontWeight: 500 },
    emailRow: {
        display: "flex",
        marginTop: 16,
        gap: 8,
    },
    emailInput: {
        flex: 1,
        background: "#1A1A1A",
        border: "1px solid #2A0000",
        borderRadius: 8,
        padding: "9px 14px",
        fontSize: "13px",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
    },
    emailBtn: {
        background: "#C00000",
        color: "#FAFAFA",
        border: "none",
        borderRadius: 8,
        padding: "9px 18px",
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
    },
    divider: {
        borderTop: "1px solid #1E1E1E",
        margin: "0 0 0",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        maxWidth: 1100,
        margin: "0 auto",
    },
    bottomText: { fontSize: "12px", color: "#444", letterSpacing: "0.5px" },
    bottomLinks: { display: "flex", gap: 20 },
    bottomLink: { fontSize: "12px", color: "#444", textDecoration: "none" },
    bottomBar: {
        borderTop: "1px solid #1E1E1E",
        marginTop: 0,
    },
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={s.footer}>
            <div style={s.container}>
                <div style={s.grid}>

                    {/* Brand */}
                    <div>
                        <Link to="/" style={s.logoRow}>
                            <span style={s.logoEmoji}>🥢</span>
                            <span style={s.logoText}>
                                Asian <span style={s.logoAccent}>Way</span>
                            </span>
                        </Link>
                        <p style={s.desc}>
                            Please put description later maybe
                        </p>
                        <div style={s.socialRow}>
                            {[
                                { icon: <FaInstagram />, href: "#" },
                                { icon: <FaFacebook />, href: "#" },
                                { icon: <FaTwitter />, href: "#" },
                            ].map((s2, i) => (
                                <a key={i} href={s2.href} style={s.socialBtn}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#F87171"; e.currentTarget.style.borderColor = "#C00000"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#3D0000"; }}>
                                    {s2.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <div style={s.colHeading}>Explore</div>
                        {[
                            { to: "/menu", label: "Menu" },
                            { to: "/about", label: "About" },
                            { to: "/contact", label: "Reservations" },
                            { to: "/contact", label: "Contact" },
                        ].map(({ to, label }) => (
                            <Link key={label} to={to} style={s.navLink}
                                onMouseEnter={e => e.currentTarget.style.color = "#F87171"}
                                onMouseLeave={e => e.currentTarget.style.color = "#666"}>
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <div style={s.colHeading}>Contact</div>
                        <div style={s.contactRow}>
                            <MapPin size={15} style={s.contactIcon} />
                            123 Lantern Street, District 1, HCMC
                        </div>
                        <div style={s.contactRow}>
                            <Phone size={15} style={s.contactIcon} />
                            +84 (0) 90 123 4567
                        </div>
                    </div>

                    {/* Hours + Newsletter */}
                    <div>
                        <div style={s.colHeading}>Service Hours</div>
                        <div style={s.hoursRow}>
                            <span>Mon – Fri</span>
                            <span style={s.hoursValue}>11:00 – 22:30</span>
                        </div>
                        <div style={s.hoursRow}>
                            <span>Sat – Sun</span>
                            <span style={s.hoursValue}>10:00 – 23:30</span>
                        </div>
                        <div style={s.emailRow}>
                            <input
                                type="email"
                                placeholder="Your email"
                                style={s.emailInput}
                                onFocus={e => e.target.style.borderColor = "#C00000"}
                                onBlur={e => e.target.style.borderColor = "#2A0000"}
                            />
                            <button style={s.emailBtn}>Send</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div style={s.bottomBar}>
                <div style={s.divider}>
                    <span style={s.bottomText}>© {currentYear} THE ASIAN WAY STUDIO.</span>
                    <div style={s.bottomLinks}>
                        <a href="#" style={s.bottomLink}
                            onMouseEnter={e => e.currentTarget.style.color = "#F87171"}
                            onMouseLeave={e => e.currentTarget.style.color = "#444"}>Privacy</a>
                        <a href="#" style={s.bottomLink}
                            onMouseEnter={e => e.currentTarget.style.color = "#F87171"}
                            onMouseLeave={e => e.currentTarget.style.color = "#444"}>Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}