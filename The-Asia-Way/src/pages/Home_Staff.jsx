// src/pages/Home_Staff.jsx
import React, { useState } from "react";
import { useCart } from "../store/cart.store";
import {
    ORDER_ITEM_STATUS,
    ORDER_STATUS_COLORS,
    TABLE_STATUS,
    TABLE_STATUS_COLORS,
} from "../store/status";

/* ── Status pill colors mapped from Bootstrap names to our palette ── */
const STATUS_STYLE = {
    secondary: { background: "#2A2A2A", color: "#888" },
    warning: { background: "rgba(202,138,4,0.15)", color: "#FBBF24" },
    success: { background: "rgba(22,163,74,0.15)", color: "#4ADE80" },
    info: { background: "rgba(14,165,233,0.15)", color: "#38BDF8" },
    danger: { background: "rgba(192,0,0,0.15)", color: "#F87171" },
    primary: { background: "rgba(99,102,241,0.15)", color: "#A5B4FC" },
};

const TABLE_COLOR = {
    success: "#166534",
    warning: "#854D0E",
    danger: "#7F1D1D",
    secondary: "#374151",
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
    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#FAFAFA",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    sectionDot: (color) => ({
        width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0,
    }),
    sectionDivider: { height: 1, background: "#1E1E1E", margin: "32px 0" },

    /* Empty state */
    empty: {
        textAlign: "center",
        padding: "60px 20px",
        color: "#444",
    },
    emptyIcon: { fontSize: "2.5rem", marginBottom: 12 },
    emptyText: { fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#666" },

    /* Table (data grid) */
    tableWrap: { overflowX: "auto", borderRadius: 12, border: "1px solid #1E1E1E" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
    th: {
        background: "#111",
        color: "#666",
        padding: "12px 16px",
        textAlign: "left",
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontWeight: 500,
        borderBottom: "1px solid #1E1E1E",
        whiteSpace: "nowrap",
    },
    td: {
        padding: "13px 16px",
        color: "#CCC",
        borderBottom: "1px solid #151515",
        verticalAlign: "middle",
    },
    tdDark: {
        padding: "13px 16px",
        color: "#CCC",
        borderBottom: "1px solid #151515",
        verticalAlign: "middle",
        background: "#111",
    },

    /* Status badge */
    badge: (variant) => ({
        ...STATUS_STYLE[variant] || STATUS_STYLE.secondary,
        padding: "3px 10px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.5px",
        display: "inline-block",
    }),

    /* Action buttons */
    actionBtn: (variant) => ({
        padding: "5px 12px",
        borderRadius: 6,
        border: "none",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        ...(STATUS_STYLE[variant] || STATUS_STYLE.secondary),
        transition: "opacity 0.15s",
    }),
    actionRow: { display: "flex", gap: 6, flexWrap: "wrap" },

    /* Tables grid */
    tablesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 12,
    },
    tableCard: (variant, hasOrders) => ({
        background: TABLE_COLOR[variant] ? `${TABLE_COLOR[variant]}33` : "#1A1A1A",
        border: `1px solid ${TABLE_COLOR[variant] || "#2A2A2A"}`,
        borderRadius: 12,
        padding: "16px 12px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.18s",
        position: "relative",
    }),
    tableNum: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.3rem",
        fontWeight: 700,
        color: "#FAFAFA",
        lineHeight: 1,
        marginBottom: 6,
    },
    tableStatus: (variant) => ({
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: STATUS_STYLE[variant]?.color || "#888",
        fontWeight: 500,
    }),
    orderDot: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#C00000",
        boxShadow: "0 0 6px #C00000",
    },

    /* Modal */
    modalBackdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    modal: {
        background: "#1A1A1A",
        border: "1px solid #2A0000",
        borderRadius: 16,
        padding: "28px 28px 24px",
        width: "100%",
        maxWidth: 360,
    },
    modalTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.2rem",
        fontWeight: 600,
        color: "#FAFAFA",
        marginBottom: 20,
    },
    modalBtns: { display: "flex", gap: 10, flexWrap: "wrap" },
    modalBtn: (variant) => ({
        flex: 1,
        padding: "10px 8px",
        borderRadius: 8,
        border: "none",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        ...(STATUS_STYLE[variant] || STATUS_STYLE.secondary),
    }),
    modalClose: {
        display: "block",
        width: "100%",
        marginTop: 12,
        padding: "9px",
        background: "transparent",
        border: "1px solid #2A2A2A",
        borderRadius: 8,
        color: "#666",
        fontSize: "13px",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
    },
};

/* ── Order rows helper ── */
const ItemRow = ({ order, idx, item, onUpdate, isKitchen }) => {
    const variant = ORDER_STATUS_COLORS[item.status] || "secondary";
    return (
        <tr>
            <td style={s.td}>#{idx + 1}</td>
            <td style={s.tdDark}>{order.customer?.table || "N/A"}</td>
            <td style={s.td}>{item.item.name}</td>
            <td style={s.td}>{item.quantity}</td>
            <td style={s.td}>
                <span style={s.badge(variant)}>{item.status}</span>
            </td>
            <td style={s.td}>
                <div style={s.actionRow}>
                    <button style={s.actionBtn("secondary")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.PENDING)}>Pending</button>
                    {isKitchen && (
                        <>
                            <button style={s.actionBtn("warning")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.PREPARING)}>Preparing</button>
                            <button style={s.actionBtn("success")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.DONE)}>Done</button>
                        </>
                    )}
                    <button style={s.actionBtn("info")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.SERVED)}>Served</button>
                </div>
            </td>
        </tr>
    );
};

/* ── Main ── */
const Home_Staff = () => {
    const { orders, updateOrderStatus } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableStatuses, setTableStatuses] = useState(
        Array.from({ length: 20 }, (_, i) => ({ number: i + 1, status: TABLE_STATUS.EMPTY }))
    );

    const updateItemStatus = (orderId, itemId, newStatus) => {
        updateOrderStatus(orderId, newStatus, itemId);
    };

    const changeTableStatus = (status) => {
        setTableStatuses((prev) =>
            prev.map((t) => (t.number === selectedTable ? { ...t, status } : t))
        );
        setShowModal(false);
    };

    const kitchenRows = orders.flatMap((order, idx) =>
        order.items.filter((it) => it.type === "KITCHEN").map((it) => ({ order, idx, it }))
    );
    const instantRows = orders.flatMap((order, idx) =>
        order.items.filter((it) => it.type === "INSTANT").map((it) => ({ order, idx, it }))
    );

    return (
        <div style={s.page}>
            <div style={s.inner}>

                {/* Page heading */}
                <div style={s.pageTitle}>Staff Dashboard</div>
                <div style={s.pageSub}>Manage orders and table statuses in real time</div>

                {orders.length === 0 ? (
                    <div style={s.empty}>
                        <div style={s.emptyIcon}>🍽️</div>
                        <div style={s.emptyText}>No orders yet — they'll appear here when customers order.</div>
                    </div>
                ) : (
                    <>
                        {/* Kitchen Orders */}
                        {kitchenRows.length > 0 && (
                            <>
                                <div style={s.sectionTitle}>
                                    <span style={s.sectionDot("#FBBF24")} /> Kitchen Orders
                                </div>
                                <div style={s.tableWrap}>
                                    <table style={s.table}>
                                        <thead>
                                            <tr>
                                                {["Order", "Table", "Item", "Qty", "Status", "Actions"].map(h => (
                                                    <th key={h} style={s.th}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {kitchenRows.map(({ order, idx, it }) => (
                                                <ItemRow key={`${order.id}-${it.item.id}`} order={order} idx={idx} item={it} onUpdate={updateItemStatus} isKitchen={true} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={s.sectionDivider} />
                            </>
                        )}

                        {/* Instant Orders */}
                        {instantRows.length > 0 && (
                            <>
                                <div style={s.sectionTitle}>
                                    <span style={s.sectionDot("#38BDF8")} /> Instant Orders
                                </div>
                                <div style={s.tableWrap}>
                                    <table style={s.table}>
                                        <thead>
                                            <tr>
                                                {["Order", "Table", "Item", "Qty", "Status", "Actions"].map(h => (
                                                    <th key={h} style={s.th}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {instantRows.map(({ order, idx, it }) => (
                                                <ItemRow key={`${order.id}-${it.item.id}`} order={order} idx={idx} item={it} onUpdate={updateItemStatus} isKitchen={false} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div style={s.sectionDivider} />
                            </>
                        )}
                    </>
                )}

                {/* Tables grid */}
                <div style={s.sectionTitle}>
                    <span style={s.sectionDot("#C00000")} /> Tables
                </div>
                <div style={s.tablesGrid}>
                    {tableStatuses.map((table) => {
                        const hasOrders = orders.some(
                            (order) =>
                                String(order.customer?.table) === String(table.number) &&
                                order.items.some((it) => it.status !== ORDER_ITEM_STATUS.SERVED)
                        );
                        const displayStatus = hasOrders ? TABLE_STATUS.OCCUPIED : table.status;
                        const variant = TABLE_STATUS_COLORS[displayStatus] || "secondary";

                        return (
                            <div
                                key={table.number}
                                style={s.tableCard(variant, hasOrders)}
                                onClick={() => { setSelectedTable(table.number); setShowModal(true); }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >
                                {hasOrders && <span style={s.orderDot} />}
                                <div style={s.tableNum}>{table.number}</div>
                                <div style={s.tableStatus(variant)}>{displayStatus}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={s.modalBackdrop} onClick={() => setShowModal(false)}>
                    <div style={s.modal} onClick={e => e.stopPropagation()}>
                        <div style={s.modalTitle}>Table {selectedTable}</div>
                        <div style={s.modalBtns}>
                            <button style={s.modalBtn(TABLE_STATUS_COLORS[TABLE_STATUS.EMPTY])} onClick={() => changeTableStatus(TABLE_STATUS.EMPTY)}>Empty</button>
                            <button style={s.modalBtn(TABLE_STATUS_COLORS[TABLE_STATUS.RESERVED])} onClick={() => changeTableStatus(TABLE_STATUS.RESERVED)}>Reserved</button>
                            <button style={s.modalBtn(TABLE_STATUS_COLORS[TABLE_STATUS.OCCUPIED])} onClick={() => changeTableStatus(TABLE_STATUS.OCCUPIED)}>Occupied</button>
                        </div>
                        <button style={s.modalClose} onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home_Staff;