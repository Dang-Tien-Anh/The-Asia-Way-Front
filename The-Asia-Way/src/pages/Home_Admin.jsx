// src/pages/Home_Admin.jsx
import React, { useState } from "react";
import { useCart } from "../store/cart.store";
import { TrendingUp, Users, ChefHat, Coffee, Sparkles, Plus, Trash2, DollarSign, ShoppingBag, ClipboardList } from "lucide-react";

/* ── Initial staff data ── */
const INITIAL_STAFF = [
    { id: 1, name: "Nguyen Van A", role: "Chef", shift: "Morning" },
    { id: 2, name: "Tran Thi B", role: "Chef", shift: "Evening" },
    { id: 3, name: "Le Van C", role: "Waiter", shift: "Morning" },
    { id: 4, name: "Pham Thi D", role: "Waiter", shift: "Evening" },
    { id: 5, name: "Hoang Van E", role: "Cleaner", shift: "Morning" },
];

const ROLES = ["Chef", "Waiter", "Cleaner"];
const SHIFTS = ["Morning", "Evening", "Night"];

const ROLE_ICON = {
    Chef: ChefHat,
    Waiter: Coffee,
    Cleaner: Sparkles,
};

const ROLE_COLOR = {
    Chef: { bg: "rgba(251,191,36,0.1)", border: "#78350F", text: "#FBBF24" },
    Waiter: { bg: "rgba(56,189,248,0.1)", border: "#0C4A6E", text: "#38BDF8" },
    Cleaner: { bg: "rgba(167,139,250,0.1)", border: "#3B0764", text: "#A78BFA" },
};

const s = {
    page: {
        background: "#0D0D0D",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        padding: "88px 20px 60px",
        marginTop: -64,      // ← add this
        paddingTop: 64,
    },
    inner: { maxWidth: 1200, margin: "0 auto" },
    pageTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        fontWeight: 700,
        color: "#FAFAFA",
        marginBottom: 4,
    },
    pageSub: { fontSize: "13px", color: "#666", marginBottom: 40 },
    divider: { height: 1, background: "#1E1E1E", margin: "36px 0" },

    /* ── Stat cards ── */
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginBottom: 36,
    },
    statCard: (color) => ({
        background: "#1A1A1A",
        border: `1px solid ${color}33`,
        borderRadius: 16,
        padding: "22px 20px",
    }),
    statIcon: (color) => ({
        width: 40,
        height: 40,
        borderRadius: 10,
        background: `${color}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    }),
    statLabel: {
        fontSize: "11px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "#666",
        fontWeight: 500,
        marginBottom: 6,
    },
    statValue: (color) => ({
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.8rem",
        fontWeight: 700,
        color,
        lineHeight: 1,
        marginBottom: 4,
    }),
    statSub: { fontSize: "12px", color: "#555" },

    /* ── Section header ── */
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.15rem",
        fontWeight: 600,
        color: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    sectionDot: (color) => ({
        width: 8, height: 8, borderRadius: "50%", background: color,
    }),

    /* ── Staff tabs ── */
    tabs: { display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" },
    tab: (active, color) => ({
        padding: "7px 18px",
        borderRadius: "100px",
        border: active ? "none" : "1px solid #2A2A2A",
        background: active ? color : "transparent",
        color: active ? "#0D0D0D" : "#666",
        fontSize: "13px",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.18s",
    }),

    /* ── Staff grid ── */
    staffGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 14,
        marginBottom: 20,
    },
    staffCard: (role) => ({
        background: ROLE_COLOR[role].bg,
        border: `1px solid ${ROLE_COLOR[role].border}`,
        borderRadius: 12,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    }),
    staffLeft: { display: "flex", alignItems: "center", gap: 12 },
    staffAvatar: (role) => ({
        width: 38,
        height: 38,
        borderRadius: 10,
        background: `${ROLE_COLOR[role].text}22`,
        border: `1px solid ${ROLE_COLOR[role].border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    }),
    staffName: { fontSize: "14px", fontWeight: 500, color: "#FAFAFA", marginBottom: 2 },
    staffShift: { fontSize: "11px", color: "#666" },
    removeBtn: {
        background: "rgba(192,0,0,0.1)",
        border: "1px solid #3D0000",
        borderRadius: 8,
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#F87171",
        flexShrink: 0,
        transition: "all 0.15s",
    },

    /* ── Add staff form ── */
    addForm: {
        background: "#1A1A1A",
        border: "1px solid #1E1E1E",
        borderRadius: 14,
        padding: "20px",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "flex-end",
    },
    formGroup: { display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 140 },
    formLabel: {
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: "#666",
        fontWeight: 500,
    },
    formInput: {
        background: "#111",
        border: "1px solid #2A2A2A",
        borderRadius: 8,
        padding: "9px 12px",
        fontSize: "13px",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
    },
    formSelect: {
        background: "#111",
        border: "1px solid #2A2A2A",
        borderRadius: 8,
        padding: "9px 12px",
        fontSize: "13px",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
        cursor: "pointer",
    },
    addBtn: {
        padding: "9px 18px",
        background: "#C00000",
        color: "#FAFAFA",
        border: "none",
        borderRadius: 8,
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        alignSelf: "flex-end",
        transition: "background 0.18s",
    },

    /* ── Orders table ── */
    tableWrap: { overflowX: "auto", borderRadius: 12, border: "1px solid #1E1E1E" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
    th: {
        background: "#111",
        color: "#666",
        padding: "11px 16px",
        textAlign: "left",
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontWeight: 500,
        borderBottom: "1px solid #1E1E1E",
        whiteSpace: "nowrap",
    },
    td: { padding: "12px 16px", color: "#CCC", borderBottom: "1px solid #151515", verticalAlign: "middle" },
    tdMuted: { padding: "12px 16px", color: "#555", borderBottom: "1px solid #151515", fontSize: "12px" },
    profitBadge: {
        display: "inline-block",
        background: "rgba(74,222,128,0.1)",
        border: "1px solid #166534",
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: "12px",
        fontWeight: 600,
        color: "#4ADE80",
    },
};

/* ── Role tab colors ── */
const TAB_COLOR = { All: "#FAFAFA", Chef: "#FBBF24", Waiter: "#38BDF8", Cleaner: "#A78BFA" };

const Home_Admin = () => {
    const { orders } = useCart();
    const [staff, setStaff] = useState(INITIAL_STAFF);
    const [activeTab, setActiveTab] = useState("All");
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("Chef");
    const [newShift, setNewShift] = useState("Morning");
    const [inputFocus, setInputFocus] = useState(false);

    /* ── Stats ── */
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    const totalOrders = orders.length;
    const totalItems = orders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.quantity, 0), 0);
    const avgOrder = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : "0.00";

    /* ── Staff ── */
    const filteredStaff = activeTab === "All" ? staff : staff.filter(m => m.role === activeTab);

    const addStaff = () => {
        if (!newName.trim()) return;
        setStaff(prev => [...prev, { id: Date.now(), name: newName.trim(), role: newRole, shift: newShift }]);
        setNewName("");
    };

    const removeStaff = (id) => setStaff(prev => prev.filter(m => m.id !== id));

    return (
        <div style={s.page}>
            <div style={s.inner}>

                {/* Heading */}
                <div style={s.pageTitle}>Admin Dashboard</div>
                <div style={s.pageSub}>Overview of revenue, staff, and order history</div>

                {/* ── Stat cards ── */}
                <div style={s.statsGrid}>
                    {[
                        { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, sub: "All time", icon: DollarSign, color: "#4ADE80" },
                        { label: "Total Orders", value: totalOrders, sub: "Placed so far", icon: ShoppingBag, color: "#F87171" },
                        { label: "Items Sold", value: totalItems, sub: "Across all orders", icon: ClipboardList, color: "#38BDF8" },
                        { label: "Avg Order", value: `$${avgOrder}`, sub: "Per order", icon: TrendingUp, color: "#FBBF24" },
                        { label: "Staff", value: staff.length, sub: `${staff.filter(s => s.role === "Chef").length} chefs · ${staff.filter(s => s.role === "Waiter").length} waiters · ${staff.filter(s => s.role === "Cleaner").length} cleaners`, icon: Users, color: "#A78BFA" },
                    ].map(({ label, value, sub, icon: Icon, color }) => (
                        <div key={label} style={s.statCard(color)}>
                            <div style={s.statIcon(color)}>
                                <Icon size={18} color={color} />
                            </div>
                            <div style={s.statLabel}>{label}</div>
                            <div style={s.statValue(color)}>{value}</div>
                            <div style={s.statSub}>{sub}</div>
                        </div>
                    ))}
                </div>

                <div style={s.divider} />

                {/* ── Staff section ── */}
                <div style={s.sectionHeader}>
                    <div style={s.sectionTitle}>
                        <span style={s.sectionDot("#A78BFA")} />
                        Staff Management
                    </div>
                </div>

                {/* Role tabs */}
                <div style={s.tabs}>
                    {["All", ...ROLES].map(tab => (
                        <button
                            key={tab}
                            style={s.tab(activeTab === tab, TAB_COLOR[tab])}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab} {tab === "All" ? `(${staff.length})` : `(${staff.filter(m => m.role === tab).length})`}
                        </button>
                    ))}
                </div>

                {/* Staff grid */}
                {filteredStaff.length === 0 ? (
                    <div style={{ color: "#555", fontSize: "13px", marginBottom: 20 }}>No staff in this category yet.</div>
                ) : (
                    <div style={s.staffGrid}>
                        {filteredStaff.map(member => {
                            const Icon = ROLE_ICON[member.role];
                            return (
                                <div key={member.id} style={s.staffCard(member.role)}>
                                    <div style={s.staffLeft}>
                                        <div style={s.staffAvatar(member.role)}>
                                            <Icon size={16} color={ROLE_COLOR[member.role].text} />
                                        </div>
                                        <div>
                                            <div style={s.staffName}>{member.name}</div>
                                            <div style={s.staffShift}>{member.role} · {member.shift} shift</div>
                                        </div>
                                    </div>
                                    <button
                                        style={s.removeBtn}
                                        onClick={() => removeStaff(member.id)}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(192,0,0,0.25)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "rgba(192,0,0,0.1)"}
                                        title="Remove staff"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Add staff form */}
                <div style={s.addForm}>
                    <div style={s.formGroup}>
                        <label style={s.formLabel}>Name</label>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && addStaff()}
                            style={{ ...s.formInput, borderColor: inputFocus ? "#C00000" : "#2A2A2A" }}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div style={s.formGroup}>
                        <label style={s.formLabel}>Role</label>
                        <select value={newRole} onChange={e => setNewRole(e.target.value)} style={s.formSelect}>
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div style={s.formGroup}>
                        <label style={s.formLabel}>Shift</label>
                        <select value={newShift} onChange={e => setNewShift(e.target.value)} style={s.formSelect}>
                            {SHIFTS.map(sh => <option key={sh} value={sh}>{sh}</option>)}
                        </select>
                    </div>
                    <button
                        style={s.addBtn}
                        onClick={addStaff}
                        onMouseEnter={e => e.currentTarget.style.background = "#A00000"}
                        onMouseLeave={e => e.currentTarget.style.background = "#C00000"}
                    >
                        <Plus size={15} /> Add Staff
                    </button>
                </div>

                <div style={s.divider} />

                {/* ── Order history ── */}
                <div style={s.sectionHeader}>
                    <div style={s.sectionTitle}>
                        <span style={s.sectionDot("#F87171")} />
                        Order History
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div style={{ color: "#555", fontSize: "13px" }}>No orders placed yet.</div>
                ) : (
                    <div style={s.tableWrap}>
                        <table style={s.table}>
                            <thead>
                                <tr>
                                    {["#", "Time", "Table", "Items", "Revenue"].map(h => (
                                        <th key={h} style={s.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, idx) => (
                                    <tr key={order.id}>
                                        <td style={s.tdMuted}>#{idx + 1}</td>
                                        <td style={s.td}>{new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                                        <td style={s.td}>{order.customer?.table || "N/A"}</td>
                                        <td style={s.td}>{order.items.map(i => `${i.item.name} ×${i.quantity}`).join(", ")}</td>
                                        <td style={s.td}><span style={s.profitBadge}>+${order.total.toFixed(2)}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Home_Admin;