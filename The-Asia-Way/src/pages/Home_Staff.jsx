import React, { useState } from "react";
import { useCart } from "../store/cart.store";
import { ORDER_ITEM_STATUS, ORDER_STATUS_COLORS, TABLE_STATUS, TABLE_STATUS_COLORS } from "../store/status";

const STATUS_STYLE = {
    secondary: { background: "#F5F0E8", color: "#7C6652" },
    warning: { background: "#FEF9C3", color: "#854D0E" },
    success: { background: "#DCFCE7", color: "#166534" },
    info: { background: "#E0F2FE", color: "#0369A1" },
    danger: { background: "#FEE2E2", color: "#991B1B" },
    primary: { background: "#EDE9FE", color: "#5B21B6" },
};

const TABLE_BORDER = { success: "#16A34A", warning: "#D97706", danger: "#DC2626", secondary: "#D1C4B0" };
const TABLE_BG = { success: "#F0FDF4", warning: "#FFFBEB", danger: "#FEF2F2", secondary: "#FAFAF8" };

const s = {
    page: {
        background: "#FFFAF5",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        padding: "88px 20px 60px",
        marginTop: -64,
        paddingTop: 64,
    },

    inner: {
        maxWidth: 1200,
        margin: "0 auto",
    },

    pageTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        fontWeight: 700,
        color: "#1C0A00",
        marginBottom: 4,
    },

    pageSub: {
        fontSize: "13px",
        color: "#A8896C",
        marginBottom: 40,
    },

    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#1C0A00",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
    },

    sectionDot: (color) => ({
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
    }),

    sectionDivider: {
        height: 1,
        background: "#E8D5B7",
        margin: "32px 0",
    },

    empty: {
        textAlign: "center",
        padding: "60px 20px",
        color: "#A8896C",
    },

    emptyIcon: {
        fontSize: "2.5rem",
        marginBottom: 12,
    },

    emptyText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        color: "#7C6652",
    },

    tableWrap: {
        overflowX: "auto",
        borderRadius: 12,
        border: "1px solid #E8D5B7",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
    },

    th: {
        background: "#FEF3E2",
        color: "#7C6652",
        padding: "12px 16px",
        textAlign: "left",
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontWeight: 500,
        borderBottom: "1px solid #E8D5B7",
        whiteSpace: "nowrap",
    },

    td: {
        padding: "13px 16px",
        color: "#3D2000",
        borderBottom: "1px solid #F5ECD8",
        verticalAlign: "middle",
    },

    tdLight: {
        padding: "13px 16px",
        color: "#3D2000",
        borderBottom: "1px solid #F5ECD8",
        verticalAlign: "middle",
        background: "#FFFAF5",
    },

    badge: (variant) => ({
        ...(STATUS_STYLE[variant] || STATUS_STYLE.secondary),
        padding: "3px 10px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.5px",
        display: "inline-block",
    }),

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

    actionRow: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
    },

    tablesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 12,
    },

    tableCard: (variant) => ({
        background: TABLE_BG[variant] || "#FFFFFF",
        border: `1px solid ${TABLE_BORDER[variant] || "#E8D5B7"}`,
        borderRadius: 12,
        padding: "16px 12px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.18s",
        position: "relative",
        boxShadow: "0 1px 4px rgba(28,10,0,0.05)",
    }),

    tableNum: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.3rem",
        fontWeight: 700,
        color: "#1C0A00",
        lineHeight: 1,
        marginBottom: 6,
    },

    tableStatus: (variant) => ({
        fontSize: "11px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        color: TABLE_BORDER[variant] || "#A8896C",
        fontWeight: 500,
    }),

    orderDot: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#C2410C",
        boxShadow: "0 0 6px #C2410C",
    },

    modalBackdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(28,10,0,0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    modal: {
        background: "#FFFFFF",
        border: "1px solid #E8D5B7",
        borderRadius: 16,
        padding: "28px 28px 24px",
        width: "100%",
        maxWidth: 360,
        boxShadow: "0 8px 32px rgba(28,10,0,0.12)",
    },

    modalTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.2rem",
        fontWeight: 600,
        color: "#1C0A00",
        marginBottom: 20,
    },

    modalBtns: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
    },

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
        border: "1px solid #E8D5B7",
        borderRadius: 8,
        color: "#A8896C",
        fontSize: "13px",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
    },
};


const ItemRow = ({ order, idx, item, onUpdate, isKitchen }) => {
    const variant = ORDER_STATUS_COLORS[item.status] || "secondary";
    return (
        <tr>
            <td style={s.td}>#{idx + 1}</td>
            <td style={s.tdLight}>{order.customer?.table || "N/A"}</td>
            <td style={s.td}>{item.item.name}</td>
            <td style={s.td}>{item.quantity}</td>
            <td style={s.td}><span style={s.badge(variant)}>{item.status}</span></td>
            <td style={s.td}>
                <div style={s.actionRow}>
                    <button style={s.actionBtn("secondary")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.PENDING)}>Pending</button>
                    {isKitchen && (<>
                        <button style={s.actionBtn("warning")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.PREPARING)}>Preparing</button>
                        <button style={s.actionBtn("success")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.DONE)}>Done</button>
                    </>)}
                    <button style={s.actionBtn("info")} onClick={() => onUpdate(order.id, item.item.id, ORDER_ITEM_STATUS.SERVED)}>Served</button>
                </div>
            </td>
        </tr>
    );
};

const Home_Staff = () => {
    const { orders, updateOrderStatus } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableStatuses, setTableStatuses] = useState(
        Array.from({ length: 20 }, (_, i) => ({ number: i + 1, status: TABLE_STATUS.EMPTY }))
    );

    const updateItemStatus = (orderId, itemId, newStatus) => updateOrderStatus(orderId, newStatus, itemId);
    const changeTableStatus = (status) => { setTableStatuses(prev => prev.map(t => t.number === selectedTable ? { ...t, status } : t)); setShowModal(false); };

    const kitchenRows = orders.flatMap((order, idx) => order.items.filter(it => it.type === "KITCHEN").map(it => ({ order, idx, it })));
    const instantRows = orders.flatMap((order, idx) => order.items.filter(it => it.type === "INSTANT").map(it => ({ order, idx, it })));

    return (
        <div style={s.page}>
            <div style={s.inner}>
                <div style={s.pageTitle}>Staff Dashboard</div>
                <div style={s.pageSub}>Manage orders and table statuses in real time</div>

                {orders.length === 0 ? (
                    <div style={s.empty}><div style={s.emptyIcon}>🍽️</div><div style={s.emptyText}>No orders yet — they'll appear here when customers order.</div></div>
                ) : (
                    <>
                        {kitchenRows.length > 0 && (<>
                            <div style={s.sectionTitle}><span style={s.sectionDot("#D97706")} /> Kitchen Orders</div>
                            <div style={s.tableWrap}>
                                <table style={s.table}>
                                    <thead><tr>{["Order", "Table", "Item", "Qty", "Status", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                                    <tbody>{kitchenRows.map(({ order, idx, it }) => <ItemRow key={`${order.id}-${it.item.id}`} order={order} idx={idx} item={it} onUpdate={updateItemStatus} isKitchen={true} />)}</tbody>
                                </table>
                            </div>
                            <div style={s.sectionDivider} />
                        </>)}
                        {instantRows.length > 0 && (<>
                            <div style={s.sectionTitle}><span style={s.sectionDot("#0369A1")} /> Instant Orders</div>
                            <div style={s.tableWrap}>
                                <table style={s.table}>
                                    <thead><tr>{["Order", "Table", "Item", "Qty", "Status", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                                    <tbody>{instantRows.map(({ order, idx, it }) => <ItemRow key={`${order.id}-${it.item.id}`} order={order} idx={idx} item={it} onUpdate={updateItemStatus} isKitchen={false} />)}</tbody>
                                </table>
                            </div>
                            <div style={s.sectionDivider} />
                        </>)}
                    </>
                )}

                <div style={s.sectionTitle}><span style={s.sectionDot("#C2410C")} /> Tables</div>
                <div style={s.tablesGrid}>
                    {tableStatuses.map((table) => {
                        const hasOrders = orders.some(o => String(o.customer?.table) === String(table.number) && o.items.some(it => it.status !== ORDER_ITEM_STATUS.SERVED));
                        const displayStatus = hasOrders ? TABLE_STATUS.OCCUPIED : table.status;
                        const variant = TABLE_STATUS_COLORS[displayStatus] || "secondary";
                        return (
                            <div key={table.number} style={s.tableCard(variant)} onClick={() => { setSelectedTable(table.number); setShowModal(true); }} onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                                {hasOrders && <span style={s.orderDot} />}
                                <div style={s.tableNum}>{table.number}</div>
                                <div style={s.tableStatus(variant)}>{displayStatus}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

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