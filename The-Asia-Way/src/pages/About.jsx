import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Flame, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const useBreakpoint = () => {
    const [w, setW] = useState(window.innerWidth);
    useEffect(() => {
        const handler = () => setW(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return { isMobile: w < 640, isTablet: w < 1024 };
};

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay },
});

const s = {
    page: {
        background: "#0D0D0D",
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
        background: "linear-gradient(to bottom, rgba(13,13,0,0.55) 0%, rgba(13,13,13,0.85) 100%)",
    },
    heroContent: {
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "0 20px",
    },
    heroBadge: {
        display: "inline-block",
        background: "rgba(220,38,38,0.15)",
        border: "1px solid rgba(220,38,38,0.4)",
        borderRadius: "100px",
        padding: "5px 18px",
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#F87171",
        marginBottom: 18,
    },
    heroTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 6vw, 4rem)",
        fontWeight: 700,
        color: "#FAFAFA",
        lineHeight: 1.1,
        marginBottom: 14,
    },
    heroSub: {
        color: "rgba(250,250,250,0.55)",
        fontSize: "clamp(13px, 2vw, 16px)",
        fontWeight: 300,
        maxWidth: 480,
        margin: "0 auto",
        lineHeight: 1.65,
    },

    /* Story */
    storySection: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "60px 20px",
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
        background: "rgba(13,13,13,0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid #2A0000",
        borderRadius: 12,
        padding: "12px 18px",
    },
    storyAccentNum: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#F87171",
        lineHeight: 1,
    },
    storyAccentLabel: {
        fontSize: "10px",
        color: "#888",
        letterSpacing: "1px",
        textTransform: "uppercase",
        marginTop: 2,
    },
    storyEyebrow: {
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#F87171",
        fontWeight: 500,
        marginBottom: 14,
    },
    storyTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        fontWeight: 700,
        color: "#FAFAFA",
        lineHeight: 1.2,
        marginBottom: 20,
    },
    storyDivider: {
        width: 48,
        height: 2,
        background: "#C00000",
        borderRadius: 2,
        marginBottom: 24,
    },
    storyPara: {
        fontSize: "clamp(13px, 1.5vw, 15px)",
        color: "#888",
        lineHeight: 1.8,
        marginBottom: 16,
    },

    /* Values */
    values: {
        background: "#111",
        borderTop: "1px solid #1E1E1E",
        borderBottom: "1px solid #1E1E1E",
        padding: "60px 20px",
    },
    valuesInner: {
        maxWidth: 1100,
        margin: "0 auto",
    },
    valuesHeader: {
        textAlign: "center",
        marginBottom: 40,
    },
    valuesEyebrow: {
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#F87171",
        fontWeight: 500,
        marginBottom: 10,
    },
    valuesTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.4rem, 3vw, 2rem)",
        fontWeight: 700,
        color: "#FAFAFA",
    },
    valuesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
    },
    valueCard: {
        background: "#1A1A1A",
        border: "1px solid #2A0000",
        borderRadius: 16,
        padding: "28px 24px",
    },
    valueIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "rgba(192,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    valueTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#FAFAFA",
        marginBottom: 8,
    },
    valueDesc: {
        fontSize: "13px",
        color: "#888",
        lineHeight: 1.7,
    },

    /* CTA */
    cta: {
        padding: "60px 20px",
        textAlign: "center",
    },
    ctaInner: {
        maxWidth: 560,
        margin: "0 auto",
    },
    ctaTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: 700,
        color: "#FAFAFA",
        marginBottom: 14,
    },
    ctaSub: {
        fontSize: "clamp(13px, 1.5vw, 15px)",
        color: "#888",
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
    btnRed: {
        padding: "13px 28px",
        background: "#C00000",
        color: "#FAFAFA",
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
        color: "#F87171",
        border: "1px solid #C00000",
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
    {
        icon: Sprout,
        title: "Fresh, Every Day",
        desc: "We source our produce daily from local growers. Dough is made each morning, broth simmered overnight — nothing sits on a shelf.",
    },
    {
        icon: Flame,
        title: "Authentically Asian",
        desc: "Our recipes haven't been reinvented for western palates. They come from grandmothers, street stalls, and generations of knowing exactly what makes a dish sing.",
    },
    {
        icon: Heart,
        title: "Made With Care",
        desc: "Every dumpling is hand-folded. Every noodle is pulled by hand. We do it the slow way because the slow way tastes better.",
    },
];

export default function About() {
    const { isMobile } = useBreakpoint();

    return (
        <div style={s.page}>

            {/* Hero */}
            <section style={s.hero}>
                <motion.img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80"
                    alt="Asian Way restaurant"
                    style={s.heroImg}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6 }}
                />
                <div style={s.heroOverlay} />
                <div style={s.heroContent}>
                    <motion.div style={s.heroBadge} {...fadeUp(0)}>Our Story</motion.div>
                    <motion.h1 style={s.heroTitle} {...fadeUp(0.15)}>
                        Cooking the<br />Asian Way
                    </motion.h1>
                    <motion.p style={s.heroSub} {...fadeUp(0.3)}>
                        Hand-pulled noodles, slow broths, real flavours from the east — served the way they were always meant to be.
                    </motion.p>
                </div>
            </section>

            {/* Story */}
            <section style={s.storySection}>
                <div style={s.storyGrid(isMobile)}>
                    <motion.div
                        style={s.storyImgWrap}
                        initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=900&q=80"
                            alt="A steaming bowl of pho"
                            style={s.storyImg}
                        />
                        <div style={s.storyImgAccent}>
                            <div style={s.storyAccentNum}>12h</div>
                            <div style={s.storyAccentLabel}>Broth, simmered daily</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={s.storyEyebrow}>Where it began</div>
                        <h2 style={s.storyTitle}>A bowl is a love letter.</h2>
                        <div style={s.storyDivider} />
                        <p style={s.storyPara}>
                            Asian Way started with a single recipe — a broth our grandmother simmered for twelve hours, every Sunday, for a family that always showed up hungry. That bowl taught us something: food made with patience tastes different. It tastes like someone cared.
                        </p>
                        <p style={s.storyPara}>
                            Today, that same patience runs through everything we do. We pull our noodles by hand. We fold every dumpling ourselves. We source our chilies, soy, and aromatics from growers who share our obsession. Nothing is shortcut, nothing is pre-packaged — because a bowl of noodles should feel like coming home, not like a transaction.
                        </p>
                        <p style={s.storyPara}>
                            We're not trying to reinvent Asian cuisine. We're trying to honour it — one bowl at a time.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section style={s.values}>
                <div style={s.valuesInner}>
                    <div style={s.valuesHeader}>
                        <div style={s.valuesEyebrow}>What drives us</div>
                        <h2 style={s.valuesTitle}>What we believe</h2>
                    </div>
                    <div style={s.valuesGrid}>
                        {values.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                style={s.valueCard}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <div style={s.valueIconWrap}>
                                    <Icon size={20} color="#F87171" />
                                </div>
                                <div style={s.valueTitle}>{title}</div>
                                <div style={s.valueDesc}>{desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={s.cta}>
                <motion.div
                    style={s.ctaInner}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 style={s.ctaTitle}>Come hungry.</h2>
                    <p style={s.ctaSub}>
                        Reserve a table for a night out, or order online and bring the flavours home. Either way, your bowl is waiting.
                    </p>
                    <div style={s.ctaButtons(isMobile)}>
                        <Link to="/menu" style={s.btnRed}>View Menu</Link>
                        <Link to="/contact" style={s.btnOutline}>Reserve a Table</Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}