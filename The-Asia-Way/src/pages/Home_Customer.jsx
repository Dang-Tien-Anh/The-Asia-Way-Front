import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart.store";
import { UtensilsCrossed, BellRing, CreditCard } from "lucide-react";

// Free Unsplash food images
const ADS = [
    {
        img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
        label: "Slow-simmered broths",
        sub: "12 hours of patience in every bowl",
    },
    {
        img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
        label: "Hand-pulled noodles",
        sub: "Made fresh every morning",
    },
    {
        img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
        label: "Dumplings, folded by hand",
        sub: "A labour of love — worth every bite",
    },
];

const s = {
    page: {
        background: "#0D0D0D",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 24px 60px",
        marginTop: -64,
        paddingTop: 128,
    },
    tableChip: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(192,0,0,0.12)",
        border: "1px solid #3D0000",
        borderRadius: "100px",
        padding: "6px 18px",
        fontSize: "12px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#F87171",
        fontWeight: 500,
        marginBottom: 20,
    },
    tableDot: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#C00000",
        boxShadow: "0 0 6px #C00000",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 5vw, 3rem)",
        fontWeight: 700,
        color: "#FAFAFA",
        textAlign: "center",
        marginBottom: 6,
        lineHeight: 1.15,
    },
    titleAccent: { color: "#F87171" },
    subtitle: {
        fontSize: "14px",
        color: "#666",
        marginBottom: 40,
        textAlign: "center",
    },
    carouselWrap: {
        width: "min(360px, 90vw)",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #2A0000",
        marginBottom: 48,
        position: "relative",
    },
    slideImg: {
        width: "100%",
        height: 340,
        objectFit: "cover",
        display: "block",
    },
    slideOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, transparent 100%)",
        padding: "32px 20px 20px",
        pointerEvents: "none",
    },
    slideLabel: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#FAFAFA",
        marginBottom: 4,
    },
    slideSub: {
        fontSize: "12px",
        color: "#888",
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "min(360px, 90vw)",
    },
    btnRed: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "15px",
        background: "#C00000",
        color: "#FAFAFA",
        border: "none",
        borderRadius: 12,
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "background 0.18s",
        width: "100%",
    },
    btnOutline: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "15px",
        background: "transparent",
        color: "#F87171",
        border: "1px solid #C00000",
        borderRadius: 12,
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "all 0.18s",
        width: "100%",
    },
    btnGhost: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "15px",
        background: "transparent",
        color: "#888",
        border: "1px solid #2A2A2A",
        borderRadius: 12,
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "all 0.18s",
        width: "100%",
    },
};

const Home_Customer = () => {
    const navigate = useNavigate();
    const { customerTable, setTable } = useCart();

    // Auto-read table number from QR code URL e.g. /?table=20A
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const table = params.get("table");
        if (table) setTable(table);
    }, []);

    return (
        <div style={s.page}>

            {/* Table badge */}
            <div style={s.tableChip}>
                <span style={s.tableDot} />
                Table {customerTable || "—"}
            </div>

            {/* Heading */}
            <h1 style={s.title}>
                Welcome to <span style={s.titleAccent}>Asian Way</span>
            </h1>
            <p style={s.subtitle}>Scan · Order · Enjoy. Your meal starts here.</p>

            {/* Carousel */}
            <div style={s.carouselWrap}>
                <Carousel fade controls={false} indicators={false} interval={3000}>
                    {ADS.map((ad, i) => (
                        <Carousel.Item key={i}>
                            <div style={{ position: "relative" }}>
                                <img src={ad.img} alt={ad.label} style={s.slideImg} />
                                <div style={s.slideOverlay}>
                                    <div style={s.slideLabel}>{ad.label}</div>
                                    <div style={s.slideSub}>{ad.sub}</div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* Action buttons */}
            <div style={s.actions}>
                <button
                    style={s.btnRed}
                    onClick={() => navigate("/menu")}
                    onMouseEnter={e => e.currentTarget.style.background = "#A00000"}
                    onMouseLeave={e => e.currentTarget.style.background = "#C00000"}
                >
                    <UtensilsCrossed size={18} /> View Menu
                </button>
                <button
                    style={s.btnOutline}
                    onClick={() => navigate("/call")}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(192,0,0,0.10)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                    <BellRing size={18} /> Call Waiter
                </button>
                <button
                    style={s.btnGhost}
                    onClick={() => navigate("/checkout")}
                    onMouseEnter={e => { e.currentTarget.style.color = "#FAFAFA"; e.currentTarget.style.borderColor = "#444"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#2A2A2A"; }}
                >
                    <CreditCard size={18} /> Checkout
                </button>
            </div>

        </div>
    );
};

export default Home_Customer;