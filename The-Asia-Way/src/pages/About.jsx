import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Flame, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const useBreakpoint = () => {
    const [w, setW] = useState(window.innerWidth);
    useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
    return { isMobile: w < 640 };
};

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay } });

const s = {
    page: {
        background: "#FFFAF5",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
    },

    hero: {
        position: "relative",
        height: "65vh",
        minHeight: 400,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -64,
        paddingTop: 64,
    },
    heroImg: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    heroOverlay: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(to bottom, rgba(28,10,0,0.45) 0%, rgba(28,10,0,0.78) 100%)",
    },
    heroContent: {
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "0 20px",
    },
    heroBadge: {
        display: "inline-block",
        background: "rgba(194,65,12,0.2)",
        border: "1px solid rgba(194,65,12,0.5)",
        borderRadius: "100px",
        padding: "5px 18px",
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#FB923C",
        marginBottom: 18,
    },
    heroTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 6vw, 4rem)",
        fontWeight: 700,
        color: "#FFFAF5",
        lineHeight: 1.1,
        marginBottom: 14,
    },
    heroSub: {
        color: "rgba(255,250,245,0.65)",
        fontSize: "clamp(13px, 2vw, 16px)",
        fontWeight: 300,
        maxWidth: 480,
        margin: "0 auto",
        lineHeight: 1.65,
    },

    storySection: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "72px 20px",
    },
    storyGrid: (isMobile) => ({
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 36 : 64,
        alignItems: "center",
    }),
    storyImgWrap: {
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        aspectRatio: "4/5",
        maxHeight: 500,
    },
    storyImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    storyImgAccent: {
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "rgba(28,10,0,0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid #3D1F00",
        borderRadius: 12,
        padding: "12px 18px",
    },
    storyAccentNum: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#FB923C",
        lineHeight: 1,
    },
    storyAccentLabel: {
        fontSize: "10px",
        color: "#A8896C",
        letterSpacing: "1px",
        textTransform: "uppercase",
        marginTop: 2,
    },
    storyEyebrow: {
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#C2410C",
        fontWeight: 500,
        marginBottom: 14,
    },
    storyTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        fontWeight: 700,
        color: "#1C0A00",
        lineHeight: 1.2,
        marginBottom: 20,
    },
    storyDivider: {
        width: 48,
        height: 2,
        background: "#C2410C",
        borderRadius: 2,
        marginBottom: 24,
    },
    storyPara: {
        fontSize: "clamp(13px, 1.5vw, 15px)",
        color: "#7C6652",
        lineHeight: 1.8,
        marginBottom: 16,
    },

    values: {
        background: "#FEF3E2",
        borderTop: "1px solid #E8D5B7",
        borderBottom: "1px solid #E8D5B7",
        padding: "72px 20px",
    },
    valuesInner: {
        maxWidth: 1100,
        margin: "0 auto",
    },
    valuesHeader: {
        textAlign: "center",
        marginBottom: 48,
    },
    valuesEyebrow: {
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#C2410C",
        fontWeight: 500,
        marginBottom: 10,
    },
    valuesTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.4rem, 3vw, 2rem)",
        fontWeight: 700,
        color: "#1C0A00",
    },
    valuesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
    },
    valueCard: {
        background: "#FFFFFF",
        border: "1px solid #E8D5B7",
        borderRadius: 16,
        padding: "28px 24px",
        boxShadow: "0 2px 12px rgba(28,10,0,0.04)",
    },
    valueIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "#FEF3E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    valueTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#1C0A00",
        marginBottom: 8,
    },
    valueDesc: {
        fontSize: "13px",
        color: "#7C6652",
        lineHeight: 1.7,
    },

    cta: {
        padding: "72px 20px",
        textAlign: "center",
        background: "#FFFAF5",
    },
    ctaInner: {
        maxWidth: 560,
        margin: "0 auto",
    },
    ctaTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: 700,
        color: "#1C0A00",
        marginBottom: 14,
    },
    ctaSub: {
        fontSize: "clamp(13px, 1.5vw, 15px)",
        color: "#7C6652",
        lineHeight: 1.7,
        marginBottom: 32,
    },
    ctaButtons: (isMobile) => ({
        display: "flex",
        gap: 12,
        justifyContent: "center",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
    }),
    btnFilled: {
        padding: "13px 28px",
        background: "#C2410C",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 10,
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        textDecoration: "none",
        cursor: "pointer",
        width: "100%",
        maxWidth: 220,
        textAlign: "center",
    },
    btnOutline: {
        padding: "13px 28px",
        background: "transparent",
        color: "#C2410C",
        border: "1px solid #C2410C",
        borderRadius: 10,
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        textDecoration: "none",
        cursor: "pointer",
        width: "100%",
        maxWidth: 220,
        textAlign: "center",
    },
};


const values = [
    { icon: Sprout, title: "Fresh, Every Day", desc: "We source our produce daily from local growers. Dough is made each morning, broth simmered overnight — nothing sits on a shelf." },
    { icon: Flame, title: "Authentically Asian", desc: "Our recipes haven't been reinvented for western palates. They come from grandmothers, street stalls, and generations of knowing exactly what makes a dish sing." },
    { icon: Heart, title: "Made With Care", desc: "Every dumpling is hand-folded. Every noodle is pulled by hand. We do it the slow way because the slow way tastes better." },
];

export default function About() {
    const { isMobile } = useBreakpoint();
    return (
        <div style={s.page}>
            <section style={s.hero}>
                <motion.img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80" alt="Asian Way" style={s.heroImg} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.6 }} />
                <div style={s.heroOverlay} />
                <div style={s.heroContent}>
                    <motion.div style={s.heroBadge} {...fadeUp(0)}>Our Story</motion.div>
                    <motion.h1 style={s.heroTitle} {...fadeUp(0.15)}>Cooking the<br />Asian Way</motion.h1>
                    <motion.p style={s.heroSub} {...fadeUp(0.3)}>Hand-pulled noodles, slow broths, real flavours from the east — served the way they were always meant to be.</motion.p>
                </div>
            </section>

            <section style={s.storySection}>
                <div style={s.storyGrid(isMobile)}>
                    <motion.div style={s.storyImgWrap} initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <img src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=900&q=80" alt="Pho" style={s.storyImg} />
                        <div style={s.storyImgAccent}>
                            <div style={s.storyAccentNum}>12h</div>
                            <div style={s.storyAccentLabel}>Broth, simmered daily</div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <div style={s.storyEyebrow}>Where it began</div>
                        <h2 style={s.storyTitle}>A bowl is a love letter.</h2>
                        <div style={s.storyDivider} />
                        <p style={s.storyPara}>Asian Way started with a single recipe — a broth our grandmother simmered for twelve hours, every Sunday, for a family that always showed up hungry. That bowl taught us something: food made with patience tastes different. It tastes like someone cared.</p>
                        <p style={s.storyPara}>Today, that same patience runs through everything we do. We pull our noodles by hand. We fold every dumpling ourselves. Nothing is shortcut, nothing is pre-packaged — because a bowl of noodles should feel like coming home.</p>
                        <p style={s.storyPara}>We're not trying to reinvent Asian cuisine. We're trying to honour it — one bowl at a time.</p>
                    </motion.div>
                </div>
            </section>

            <section style={s.values}>
                <div style={s.valuesInner}>
                    <div style={s.valuesHeader}>
                        <div style={s.valuesEyebrow}>What drives us</div>
                        <h2 style={s.valuesTitle}>What we believe</h2>
                    </div>
                    <div style={s.valuesGrid}>
                        {values.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div key={title} style={s.valueCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                                <div style={s.valueIconWrap}><Icon size={20} color="#C2410C" /></div>
                                <div style={s.valueTitle}>{title}</div>
                                <div style={s.valueDesc}>{desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={s.cta}>
                <motion.div style={s.ctaInner} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <h2 style={s.ctaTitle}>Come hungry.</h2>
                    <p style={s.ctaSub}>Reserve a table for a night out, or order online and bring the flavours home. Either way, your bowl is waiting.</p>
                    <div style={s.ctaButtons(isMobile)}>
                        <Link to="/menu" style={s.btnFilled}>View Menu</Link>
                        <Link to="/contact" style={s.btnOutline}>Reserve a Table</Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}