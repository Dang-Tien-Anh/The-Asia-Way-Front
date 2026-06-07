// src/pages/Reservation.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const s = {
    page: {
        background: "#0D0D0D",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        marginTop: -64,      // ← add this
        paddingTop: 64,
    },
    card: {
        background: "#1A1A1A",
        border: "1px solid #2A0000",
        borderRadius: 20,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 460,
    },
    iconWrap: {
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "rgba(192,0,0,0.12)",
        border: "1px solid #3D0000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.7rem",
        fontWeight: 700,
        color: "#FAFAFA",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: "13px",
        color: "#666",
        textAlign: "center",
        lineHeight: 1.65,
        marginBottom: 32,
    },
    row: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginBottom: 24,
    },
    fieldWrap: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "12px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#888",
        fontWeight: 500,
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        gap: 6,
    },
    input: {
        width: "100%",
        background: "#111",
        border: "1px solid #2A2A2A",
        borderRadius: 10,
        padding: "12px 14px",
        fontSize: "14px",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.18s",
        colorScheme: "dark",
    },
    divider: {
        height: 1,
        background: "#1E1E1E",
        margin: "8px 0 24px",
    },
    note: {
        fontSize: "12px",
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 1.6,
    },
    submitBtn: {
        width: "100%",
        padding: "13px",
        background: "#C00000",
        color: "#FAFAFA",
        border: "none",
        borderRadius: 10,
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "background 0.18s",
        letterSpacing: "0.3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    backLink: {
        display: "block",
        textAlign: "center",
        fontSize: "13px",
        color: "#666",
        cursor: "pointer",
        marginTop: 20,
        transition: "color 0.18s",
    },
};

const Reservation = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [focused, setFocused] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // No reservation save yet!
        console.log("Reservation:", { date, time });
        navigate("/menu");
    };

    const inputStyle = (field) => ({
        ...s.input,
        borderColor: focused === field ? "#C00000" : "#2A2A2A",
    });

    return (
        <div style={s.page}>
            <div style={s.card}>

                {/* Icon */}
                <div style={s.iconWrap}>
                    <CalendarDays size={24} color="#F87171" />
                </div>

                {/* Heading */}
                <div style={s.title}>Make a Reservation</div>
                <div style={s.subtitle}>
                    Choose your date and time, then browse the menu so we can prepare your dishes ahead of time.
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={s.row}>
                        <div style={s.fieldWrap}>
                            <label style={s.label}>
                                <CalendarDays size={12} color="#F87171" /> Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onFocus={() => setFocused("date")}
                                onBlur={() => setFocused(null)}
                                style={inputStyle("date")}
                                required
                            />
                        </div>
                        <div style={s.fieldWrap}>
                            <label style={s.label}>
                                <Clock size={12} color="#F87171" /> Time
                            </label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                onFocus={() => setFocused("time")}
                                onBlur={() => setFocused(null)}
                                style={inputStyle("time")}
                                required
                            />
                        </div>
                    </div>

                    <div style={s.divider} />

                    <div style={s.note}>
                        After confirming, you'll be taken to our menu to pre-select your dishes.
                    </div>

                    <button
                        type="submit"
                        style={s.submitBtn}
                        onMouseEnter={e => e.currentTarget.style.background = "#A00000"}
                        onMouseLeave={e => e.currentTarget.style.background = "#C00000"}
                    >
                        Continue to Menu <ArrowRight size={16} />
                    </button>
                </form>

                <span
                    style={s.backLink}
                    onClick={() => navigate("/")}
                    onMouseEnter={e => e.currentTarget.style.color = "#F87171"}
                    onMouseLeave={e => e.currentTarget.style.color = "#666"}
                >
                    ← Back to home
                </span>

            </div>
        </div>
    );
};

export default Reservation;