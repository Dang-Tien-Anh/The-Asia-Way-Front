import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Eye, EyeOff } from "lucide-react";

const s = {
    page: {
        background: "#FFFAF5",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        marginTop: -64,
        paddingTop: 64,
    },

    card: {
        background: "#FFFFFF",
        border: "1px solid #E8D5B7",
        borderRadius: 20,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 4px 24px rgba(28,10,0,0.07)",
    },

    iconWrap: {
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "#FEF3E2",
        border: "1px solid #E8D5B7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
    },

    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.7rem",
        fontWeight: 700,
        color: "#1C0A00",
        textAlign: "center",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: "13px",
        color: "#A8896C",
        textAlign: "center",
        marginBottom: 32,
    },

    label: {
        fontSize: "12px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#7C6652",
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
        background: "#FFFAF5",
        border: "1px solid #E8D5B7",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: "14px",
        color: "#1C0A00",
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
        color: "#A8896C",
        cursor: "pointer",
        padding: 0,
        display: "flex",
    },

    submitBtn: {
        width: "100%",
        padding: "13px",
        background: "#C2410C",
        color: "#FFFFFF",
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
        background: "#F0E4D0",
        margin: "24px 0",
    },

    backLink: {
        display: "block",
        textAlign: "center",
        fontSize: "13px",
        color: "#A8896C",
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

    const handleSubmit = (e) => { e.preventDefault(); console.log("Staff Login:", { username, password }); navigate("/staff/home"); };
    const inputStyle = (field) => ({ ...s.input, borderColor: focused === field ? "#C2410C" : "#E8D5B7" });

    return (
        <div style={s.page}>
            <div style={s.card}>
                <div style={s.iconWrap}><UserCheck size={24} color="#C2410C" /></div>
                <div style={s.title}>Staff Login</div>
                <div style={s.subtitle}>Welcome back — sign in to your staff portal</div>
                <form onSubmit={handleSubmit}>
                    <div style={s.inputWrap}>
                        <label style={s.label}>Username</label>
                        <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} onFocus={() => setFocused("username")} onBlur={() => setFocused(null)} style={inputStyle("username")} required />
                    </div>
                    <div style={s.inputWrap}>
                        <label style={s.label}>Password</label>
                        <div style={{ position: "relative" }}>
                            <input type={showPass ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} style={{ ...inputStyle("password"), paddingRight: 44 }} required />
                            <button type="button" style={s.eyeBtn} onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                        </div>
                    </div>
                    <button type="submit" style={s.submitBtn} onMouseEnter={e => e.currentTarget.style.background = "#9A3412"} onMouseLeave={e => e.currentTarget.style.background = "#C2410C"}>Login →</button>
                </form>
                <div style={s.divider} />
                <span style={s.backLink} onClick={() => navigate("/")} onMouseEnter={e => e.currentTarget.style.color = "#C2410C"} onMouseLeave={e => e.currentTarget.style.color = "#A8896C"}>← Back to home</span>
            </div>
        </div>
    );
};
export default Staff_Login;