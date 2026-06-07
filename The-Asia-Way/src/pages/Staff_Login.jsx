// src/pages/Staff_Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Eye, EyeOff } from "lucide-react";

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
        maxWidth: 420,
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
        marginBottom: 6,
    },
    subtitle: {
        fontSize: "13px",
        color: "#666",
        textAlign: "center",
        marginBottom: 32,
    },
    label: {
        fontSize: "12px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#888",
        fontWeight: 500,
        marginBottom: 8,
        display: "block",
    },
    inputWrap: {
        position: "relative",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        background: "#111",
        border: "1px solid #2A2A2A",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: "14px",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.18s",
    },
    eyeBtn: {
        position: "absolute",
        right: 14,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        color: "#666",
        cursor: "pointer",
        padding: 0,
        display: "flex",
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
        marginTop: 8,
        transition: "background 0.18s",
        letterSpacing: "0.3px",
    },
    divider: {
        height: 1,
        background: "#1E1E1E",
        margin: "24px 0",
    },
    backLink: {
        display: "block",
        textAlign: "center",
        fontSize: "13px",
        color: "#666",
        textDecoration: "none",
        cursor: "pointer",
        transition: "color 0.18s",
    },
};

const Staff_Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [focused, setFocused] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // No backend auth yet!!!
        console.log("Staff Login:", { username, password });
        navigate("/staff/home");
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
                    <UserCheck size={24} color="#F87171" />
                </div>

                {/* Heading */}
                <div style={s.title}>Staff Login</div>
                <div style={s.subtitle}>Welcome back — sign in to your staff portal</div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={s.inputWrap}>
                        <label style={s.label}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setFocused("username")}
                            onBlur={() => setFocused(null)}
                            style={inputStyle("username")}
                            required
                        />
                    </div>

                    <div style={s.inputWrap}>
                        <label style={s.label}>Password</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocused("password")}
                                onBlur={() => setFocused(null)}
                                style={{ ...inputStyle("password"), paddingRight: 44 }}
                                required
                            />
                            <button
                                type="button"
                                style={s.eyeBtn}
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={s.submitBtn}
                        onMouseEnter={e => e.currentTarget.style.background = "#A00000"}
                        onMouseLeave={e => e.currentTarget.style.background = "#C00000"}
                    >
                        Login →
                    </button>
                </form>

                <div style={s.divider} />

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

export default Staff_Login;