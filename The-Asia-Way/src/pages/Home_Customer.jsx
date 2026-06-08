import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart.store";
import { UtensilsCrossed, BellRing, CreditCard } from "lucide-react";

const ADS = [
    { img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80", label: "Slow-simmered broths", sub: "12 hours of patience in every bowl" },
    { img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80", label: "Hand-pulled noodles", sub: "Made fresh every morning" },
    { img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80", label: "Dumplings, folded by hand", sub: "A labour of love — worth every bite" },
];

const s = {
    page: {
        background: "#FFFAF5",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 24px 60px",
        marginTop: -64,
        paddingTop: 128,
    },

    tableChip: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#FEF3E2",
        border: "1px solid #E8D5B7",
        borderRadius: "100px",
        padding: "6px 18px",
        fontSize: "12px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#92400E",
        fontWeight: 500,
        marginBottom: 20,
    },

    tableDot: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#C2410C",
    },

    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 5vw, 3rem)",
        fontWeight: 700,
        color: "#1C0A00",
        textAlign: "center",
        marginBottom: 6,
        lineHeight: 1.15,
    },

    titleAccent: {
        color: "#C2410C",
    },

    subtitle: {
        fontSize: "14px",
        color: "#A8896C",
        marginBottom: 40,
        textAlign: "center",
    },

    carouselWrap: {
        width: "min(360px, 90vw)",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #E8D5B7",
        marginBottom: 48,
        position: "relative",
        boxShadow: "0 8px 32px rgba(28,10,0,0.10)",
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
        background:
            "linear-gradient(to top, rgba(28,10,0,0.88) 0%, transparent 100%)",
        padding: "32px 20px 20px",
        pointerEvents: "none",
    },

    slideLabel: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#FFFAF5",
        marginBottom: 4,
    },

    slideSub: {
        fontSize: "12px",
        color: "#E8D5B7",
    },

    actions: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "min(360px, 90vw)",
    },

    btnFilled: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "15px",
        background: "#C2410C",
        color: "#FFFFFF",
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
        color: "#C2410C",
        border: "1px solid #C2410C",
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
        color: "#A8896C",
        border: "1px solid #E8D5B7",
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

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const table = params.get("table");
        if (table) setTable(table);
    }, []);

    return (
        <div style={s.page}>
            <div style={s.tableChip}><span style={s.tableDot} />Table {customerTable || "—"}</div>
            <h1 style={s.title}>Welcome to <span style={s.titleAccent}>Asian Way</span></h1>
            <p style={s.subtitle}>Scan · Order · Enjoy. Your meal starts here.</p>

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

            <div style={s.actions}>
                <button style={s.btnFilled} onClick={() => navigate("/menu")} onMouseEnter={e => e.currentTarget.style.background = "#9A3412"} onMouseLeave={e => e.currentTarget.style.background = "#C2410C"}>
                    <UtensilsCrossed size={18} /> View Menu
                </button>
                <button style={s.btnOutline} onClick={() => navigate("/call")} onMouseEnter={e => e.currentTarget.style.background = "#FEF3E2"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <BellRing size={18} /> Call Waiter
                </button>
                <button style={s.btnGhost} onClick={() => navigate("/checkout")} onMouseEnter={e => { e.currentTarget.style.color = "#1C0A00"; e.currentTarget.style.borderColor = "#A8896C"; }} onMouseLeave={e => { e.currentTarget.style.color = "#A8896C"; e.currentTarget.style.borderColor = "#E8D5B7"; }}>
                    <CreditCard size={18} /> Checkout
                </button>
            </div>
        </div>
    );
};
export default Home_Customer;