import React, { useState } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../store/cart.store";
import { useMenuStore, CATEGORIES } from "../store/menu.store";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

const styles = {
    page: {
        background: "#FFFAF5",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
    },

    hero: {
        background: "linear-gradient(135deg, #1C0A00 0%, #3D1500 55%, #7C2D00 100%)",
        padding: "72px 0 56px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        marginTop: -64,
        paddingTop: 128,
    },

    heroBadge: {
        display: "inline-block",
        background: "rgba(251,146,60,0.18)",
        border: "1px solid rgba(251,146,60,0.45)",
        borderRadius: "100px",
        padding: "6px 20px",
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#FB923C",
        marginBottom: "20px",
    },

    heroTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
        fontWeight: 700,
        color: "#FFFAF5",
        lineHeight: 1.1,
        marginBottom: "14px",
    },

    heroSub: {
        color: "rgba(255,250,245,0.6)",
        fontSize: "15px",
        fontWeight: 300,
        maxWidth: 440,
        margin: "0 auto",
        lineHeight: 1.6,
    },

    stickyNav: {
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,250,245,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E8D5B7",
        padding: "0 24px",
    },

    navInner: {
        display: "flex",
        gap: "4px",
        overflowX: "auto",
        scrollbarWidth: "none",
        padding: "12px 0",
        maxWidth: 1100,
        margin: "0 auto",
    },

    navBtn: (active) => ({
        whiteSpace: "nowrap",
        padding: "8px 20px",
        borderRadius: "100px",
        border: active ? "none" : "1px solid #E8D5B7",
        background: active ? "#C2410C" : "transparent",
        color: active ? "#FFFFFF" : "#7C6652",
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        cursor: "pointer",
        transition: "all 0.22s",
        fontFamily: "'DM Sans', sans-serif",
    }),

    content: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 24px",
    },

    sectionLabel: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.7rem",
        fontWeight: 600,
        color: "#1C0A00",
        marginBottom: "6px",
    },

    sectionDivider: {
        width: 48,
        height: 2,
        background: "#C2410C",
        borderRadius: 2,
        marginBottom: "28px",
    },

    card: {
        background: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E8D5B7",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s, transform 0.25s",
        cursor: "default",
    },

    cardImg: {
        width: "100%",
        height: 190,
        objectFit: "cover",
        background: "#FEF3E2",
    },

    cardImgPlaceholder: {
        width: "100%",
        height: 190,
        background: "linear-gradient(135deg, #FEF3E2, #FDE8CC)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2.2rem",
    },

    cardBody: {
        padding: "18px 20px 20px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },

    cardTag: (type) => ({
        display: "inline-block",
        fontSize: "10px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        fontWeight: 500,
        padding: "3px 10px",
        borderRadius: "100px",
        background: type === "INSTANT" ? "#DCFCE7" : "#FEF3E2",
        color: type === "INSTANT" ? "#166534" : "#92400E",
        marginBottom: "10px",
        width: "fit-content",
    }),

    cardName: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#1C0A00",
        marginBottom: "6px",
        lineHeight: 1.3,
    },

    cardDesc: {
        fontSize: "13px",
        color: "#7C6652",
        lineHeight: 1.55,
        flex: 1,
        marginBottom: "16px",
    },

    cardFooter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "auto",
    },

    cardPrice: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "#92400E",
    },

    orderBtn: {
        background: "#C2410C",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "100px",
        padding: "8px 20px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.3px",
        transition: "all 0.2s",
    },

    cartFab: {
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 200,
        background: "#C2410C",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "100px",
        padding: "14px 26px",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(194,65,12,0.35)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        letterSpacing: "0.2px",
    },

    cartBadge: {
        background: "#FFFFFF",
        color: "#C2410C",
        borderRadius: "100px",
        padding: "2px 9px",
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: "1.5",
    },

    cartTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.4rem",
        fontWeight: 600,
        color: "#1C0A00",
    },

    cartItem: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 0",
        borderBottom: "1px solid #F0E4D0",
    },

    cartItemName: {
        fontWeight: 500,
        fontSize: "14px",
        color: "#1C0A00",
        marginBottom: 2,
    },

    cartItemMeta: {
        fontSize: "12px",
        color: "#A8896C",
    },

    cartItemPrice: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: "1rem",
        color: "#92400E",
        marginLeft: "auto",
        marginRight: 10,
    },

    removeBtn: {
        background: "none",
        border: "1px solid #E8D5B7",
        borderRadius: "100px",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#A8896C",
        fontSize: 16,
        lineHeight: 1,
        flexShrink: 0,
    },

    totalRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 0 0",
    },
    totalLabel: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.2rem",
        fontWeight: 600,
        color: "#1C0A00",
    },

    totalAmt: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "#92400E",
    },

    confirmBtn: {
        width: "100%",
        background: "#C2410C",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 12,
        padding: "14px",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        marginTop: 16,
        letterSpacing: "0.3px",
    },

    clearBtn: {
        width: "100%",
        background: "transparent",
        color: "#A8896C",
        border: "1px solid #E8D5B7",
        borderRadius: 12,
        padding: "10px",
        fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        marginTop: 8,
    },

    tableTag: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#FEF3E2",
        border: "1px solid #E8D5B7",
        borderRadius: 8,
        padding: "6px 14px",
        fontSize: "13px",
        color: "#92400E",
        fontWeight: 500,
        marginTop: 12,
    },
};

const categoryEmoji = { Appetizers: "🥟", "Main Course": "🍽️", Dessert: "🍮", Drinks: "🍵" };



const MenuCard = ({ item, onOrder }) => {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);
    const [imgErr, setImgErr] = useState(false);

    const handleOrder = () => {
        if (!item.available) return;
        onOrder(item); setAdded(true); setTimeout(() => setAdded(false), 1400);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.32 }}
            style={{
                ...styles.card,
                boxShadow: hovered && item.available ? "0 12px 36px rgba(28,10,0,0.10)" : "0 2px 8px rgba(28,10,0,0.04)",
                transform: hovered && item.available ? "translateY(-4px)" : "translateY(0)",
                opacity: item.available ? 1 : 0.7,
            }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

            {/* Image with unavailable overlay */}
            <div style={{ position: "relative" }}>
                {imgErr
                    ? <div style={styles.cardImgPlaceholder}>{categoryEmoji[item.category] || "🍴"}</div>
                    : <img src={item.image} alt={item.name} style={{ ...styles.cardImg, filter: item.available ? "none" : "grayscale(60%)" }} onError={() => setImgErr(true)} />}
                {!item.available && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(255,250,245,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ background: "#7C6652", color: "#FFFAF5", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px" }}>
                            Unavailable
                        </span>
                    </div>
                )}
            </div>

            <div style={styles.cardBody}>
                <span style={styles.cardTag(item.type)}>{item.type === "INSTANT" ? "Ready instantly" : "Kitchen order"}</span>
                <div style={styles.cardName}>{item.name}</div>
                <div style={styles.cardDesc}>{item.description}</div>
                <div style={styles.cardFooter}>
                    <span style={styles.cardPrice}>${item.price}</span>
                    <motion.button
                        style={{ ...styles.orderBtn, background: !item.available ? "#D1C4B0" : added ? "#166534" : "#C2410C", cursor: item.available ? "pointer" : "not-allowed" }}
                        whileTap={item.available ? { scale: 0.95 } : {}}
                        onClick={handleOrder}
                    >
                        {!item.available ? "Unavailable" : added ? "✓ Added" : "+ Order"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState("Appetizers");
    const [showCart, setShowCart] = useState(false);
    const { cart, addItem, removeItem, clearCart, totalPrice, placeOrder, customerTable, orders } = useCart();
    const getByCategory = useMenuStore((s) => s.getByCategory);

    // Only show orders for this table
    const myOrders = orders.filter(o => String(o.customer?.table) === String(customerTable));

    const STATUS_STYLE = {
        PENDING: { bg: "#FEF3E2", color: "#92400E", label: "Pending" },
        PREPARING: { bg: "#FEF9C3", color: "#854D0E", label: "Preparing" },
        DONE: { bg: "#DCFCE7", color: "#166534", label: "Ready!" },
        SERVED: { bg: "#E0F2FE", color: "#0369A1", label: "Served" },
    };

    const handleCheckout = () => {
        if (!customerTable) { alert("No table number found. Please go back to Home first."); return; }
        placeOrder(); setShowCart(false); alert("Order confirmed! 🎉");
    };

    return (
        <div style={styles.page}>
            <div style={styles.hero}>
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={styles.heroBadge}>Fine Dining Experience</div>
                    <div style={styles.heroTitle}>Our Menu</div>
                    <p style={styles.heroSub}>Discover authentic flavours crafted with care — from hearty mains to delicate desserts.</p>
                </div>
                <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(251,146,60,0.12)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", width: 540, height: 540, borderRadius: "50%", border: "1px solid rgba(251,146,60,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
            </div>

            <div style={styles.stickyNav}>
                <div style={styles.navInner}>
                    {CATEGORIES.map((cat) => (
                        <button key={cat} style={styles.navBtn(selectedCategory === cat)} onClick={() => setSelectedCategory(cat)}>
                            {categoryEmoji[cat]} {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.sectionLabel}>{categoryEmoji[selectedCategory]} {selectedCategory}</div>
                <div style={styles.sectionDivider} />
                <AnimatePresence mode="wait">
                    <motion.div key={selectedCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Row className="g-4">
                            {getByCategory(selectedCategory).map((item, i) => (
                                <Col md={6} lg={4} key={item.id}>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.3 }} style={{ height: "100%" }}>
                                        <MenuCard item={{ ...item, category: selectedCategory }} onOrder={addItem} />
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                <motion.button initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={styles.cartFab} onClick={() => setShowCart(true)}>
                    🛒 View Cart {cart.length > 0 && <span style={styles.cartBadge}>{cart.length}</span>}
                </motion.button>
            </AnimatePresence>

            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end" style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 400, background: "#FFFAF5" }}>
                <Offcanvas.Header closeButton style={{ borderBottom: "1px solid #E8D5B7", paddingBottom: 16 }}>
                    <span style={styles.cartTitle}>Your Order</span>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ padding: "20px 24px" }}>

                    {/* ── Live order tracker ── */}
                    {myOrders.length > 0 && (
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#A8896C", fontWeight: 500, marginBottom: 14 }}>Your Orders</div>
                            {myOrders.map((order, oi) => (
                                <div key={order.id} style={{ background: "#FFFFFF", border: "1px solid #E8D5B7", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
                                    <div style={{ fontSize: "11px", color: "#A8896C", marginBottom: 10 }}>
                                        Order #{oi + 1} · {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                    {order.items.map(it => {
                                        const st = STATUS_STYLE[it.status] || STATUS_STYLE.PENDING;
                                        return (
                                            <div key={it.item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #F5ECD8" }}>
                                                <div>
                                                    <div style={{ fontSize: "13px", fontWeight: 500, color: "#1C0A00" }}>{it.item.name}</div>
                                                    <div style={{ fontSize: "11px", color: "#A8896C" }}>×{it.quantity} · ${it.item.price * it.quantity}</div>
                                                </div>
                                                <span style={{ background: st.bg, color: st.color, fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.5px" }}>
                                                    {st.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10, fontSize: "13px", fontWeight: 600, color: "#92400E" }}>
                                        Total: ${order.total.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                            <div style={{ height: 1, background: "#E8D5B7", margin: "20px 0" }} />
                        </div>
                    )}

                    {/* ── Pending cart ── */}
                    {cart.length === 0 && myOrders.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "#A8896C" }}>
                            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🛒</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#1C0A00", marginBottom: 6 }}>Your cart is empty</div>
                            <div style={{ fontSize: "13px" }}>Add some dishes to get started!</div>
                        </div>
                    ) : cart.length > 0 ? (
                        <>
                            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#A8896C", fontWeight: 500, marginBottom: 14 }}>New Items</div>
                            {cart.map((item) => (
                                <div key={item.id} style={styles.cartItem}>
                                    <div style={{ flex: 1 }}>
                                        <div style={styles.cartItemName}>{item.name}</div>
                                        <div style={styles.cartItemMeta}>Qty: {item.quantity}</div>
                                    </div>
                                    <span style={styles.cartItemPrice}>${item.price * item.quantity}</span>
                                    <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>×</button>
                                </div>
                            ))}
                            <div style={styles.totalRow}>
                                <span style={styles.totalLabel}>Total</span>
                                <span style={styles.totalAmt}>${totalPrice}</span>
                            </div>
                            {customerTable && <div style={styles.tableTag}>🪑 Table {customerTable}</div>}
                            <button style={styles.confirmBtn} onClick={handleCheckout}
                                onMouseEnter={e => e.currentTarget.style.background = "#9A3412"}
                                onMouseLeave={e => e.currentTarget.style.background = "#C2410C"}>
                                Confirm Order →
                            </button>
                            <button style={styles.clearBtn} onClick={clearCart}>Clear cart</button>
                        </>
                    ) : null}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};
export default Menu;