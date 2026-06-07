// src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../store/cart.store";

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

/* ─── Inline styles (no extra CSS file needed) ──────────────────────────────── */
const styles = {
    page: {
        background: "#0D0D0D",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
    },
    hero: {
        background: "linear-gradient(135deg, #0D0D0D 0%, #1A0000 55%, #3D0000 100%)",
        padding: "72px 0 56px",
        paddingTop: 128,   // 64 (header) + original padding
        marginTop: -64,    // pull up behind header
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
    },
    heroBadge: {
        display: "inline-block",
        background: "rgba(220,38,38,0.15)",
        border: "1px solid rgba(220,38,38,0.45)",
        borderRadius: "100px",
        padding: "6px 20px",
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: "#F87171",
        marginBottom: "20px",
    },
    heroTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
        fontWeight: 700,
        color: "#FAFAFA",
        lineHeight: 1.1,
        marginBottom: "14px",
    },
    heroSub: {
        color: "rgba(250,250,250,0.5)",
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
        background: "rgba(13,13,13,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #2A0000",
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
        border: active ? "none" : "1px solid #3D0000",
        background: active ? "#C00000" : "transparent",
        color: active ? "#FAFAFA" : "#888",
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        cursor: "pointer",
        transition: "all 0.22s",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: active ? "0.4px" : 0,
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
        color: "#FAFAFA",
        marginBottom: "6px",
    },
    sectionDivider: {
        width: 48,
        height: 2,
        background: "#C00000",
        borderRadius: 2,
        marginBottom: "28px",
    },
    card: {
        background: "#1A1A1A",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #2A0000",
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
        background: "#2A0000",
    },
    cardImgPlaceholder: {
        width: "100%",
        height: 190,
        background: "linear-gradient(135deg, #2A0000, #1A1A1A)",
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
        background: type === "INSTANT" ? "rgba(220,38,38,0.12)" : "rgba(255,255,255,0.07)",
        color: type === "INSTANT" ? "#F87171" : "#AAA",
        marginBottom: "10px",
        width: "fit-content",
    }),
    cardName: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#FAFAFA",
        marginBottom: "6px",
        lineHeight: 1.3,
    },
    cardDesc: {
        fontSize: "13px",
        color: "#888",
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
        color: "#F87171",
    },
    orderBtn: {
        background: "#C00000",
        color: "#FAFAFA",
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
        background: "#C00000",
        color: "#FAFAFA",
        border: "none",
        borderRadius: "100px",
        padding: "14px 26px",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(192,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        letterSpacing: "0.2px",
    },
    cartBadge: {
        background: "#FAFAFA",
        color: "#C00000",
        borderRadius: "100px",
        padding: "2px 9px",
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: "1.5",
    },
    /* Off-canvas cart */
    cartTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.4rem",
        fontWeight: 600,
        color: "#FAFAFA",
    },
    cartItem: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 0",
        borderBottom: "1px solid #2A2A2A",
    },
    cartItemName: {
        fontWeight: 500,
        fontSize: "14px",
        color: "#FAFAFA",
        marginBottom: 2,
    },
    cartItemMeta: {
        fontSize: "12px",
        color: "#888",
    },
    cartItemPrice: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: "1rem",
        color: "#F87171",
        marginLeft: "auto",
        marginRight: 10,
    },
    removeBtn: {
        background: "none",
        border: "1px solid #3D0000",
        borderRadius: "100px",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#888",
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
        color: "#FAFAFA",
    },
    totalAmt: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "#F87171",
    },
    confirmBtn: {
        width: "100%",
        background: "#C00000",
        color: "#FAFAFA",
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
        color: "#888",
        border: "1px solid #3D0000",
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
        background: "rgba(192,0,0,0.12)",
        border: "1px solid #3D0000",
        borderRadius: 8,
        padding: "6px 14px",
        fontSize: "13px",
        color: "#F87171",
        fontWeight: 500,
        marginTop: 12,
    },
};

/* ─── Category emoji map ──────────────────────────────────────────────────── */
const categoryEmoji = {
    Appetizers: "🥟",
    "Main Course": "🍽️",
    Dessert: "🍮",
    Drinks: "🍵",
};

/* ─── Menu data ───────────────────────────────────────────────────────────── */
const menuItems = {
    Appetizers: [
        { id: 1, name: "Spring Rolls", type: "KITCHEN", price: 5, description: "Crispy rolls with veggies.", image: "spring-rolls.jpg", categoryId: 1 },
        { id: 2, name: "Garlic Bread", type: "KITCHEN", price: 4, description: "Toasted bread with garlic butter.", image: "garlic-bread.jpg", categoryId: 1 },
        { id: 3, name: "Edamame", type: "INSTANT", price: 3, description: "Steamed soybeans with sea salt.", image: "edamame.jpg", categoryId: 1 },
        { id: 4, name: "Chicken Satay", type: "KITCHEN", price: 6, description: "Grilled skewers with peanut sauce.", image: "satay.jpg", categoryId: 1 },
    ],
    "Main Course": [
        { id: 5, name: "Grilled Chicken", type: "KITCHEN", price: 12, description: "Served with herbs and lemon.", image: "grilled-chicken.jpg", categoryId: 2 },
        { id: 6, name: "Beef Steak", type: "KITCHEN", price: 18, description: "Juicy steak with pepper sauce.", image: "beef-steak.jpg", categoryId: 2 },
        { id: 7, name: "Pho Noodle Soup", type: "KITCHEN", price: 10, description: "Vietnamese beef broth with rice noodles.", image: "pho.jpg", categoryId: 2 },
        { id: 8, name: "Pad Thai", type: "KITCHEN", price: 11, description: "Thai stir-fried noodles with shrimp.", image: "pad-thai.jpg", categoryId: 2 },
        { id: 9, name: "Kung Pao Chicken", type: "KITCHEN", price: 13, description: "Spicy Sichuan stir-fry with peanuts.", image: "kung-pao.jpg", categoryId: 2 },
    ],
    Dessert: [
        { id: 10, name: "Chocolate Cake", type: "INSTANT", price: 6, description: "Rich and moist with ganache.", image: "chocolate-cake.jpg", categoryId: 3 },
        { id: 11, name: "Ice Cream Sundae", type: "INSTANT", price: 5, description: "Vanilla ice cream with toppings.", image: "ice-cream.jpg", categoryId: 3 },
        { id: 12, name: "Mango Sticky Rice", type: "INSTANT", price: 7, description: "Sweet Thai dessert with coconut milk.", image: "mango-sticky-rice.jpg", categoryId: 3 },
        { id: 13, name: "Matcha Cheesecake", type: "INSTANT", price: 8, description: "Japanese green tea infused cheesecake.", image: "matcha-cheesecake.jpg", categoryId: 3 },
    ],
    Drinks: [
        { id: 14, name: "C2", type: "INSTANT", price: 12, description: "Cold drink", image: "C2.png", categoryId: 4 },
        { id: 15, name: "Fresh Lemonade", type: "INSTANT", price: 3, description: "Cool and refreshing citrus drink.", image: "lemonade.jpg", categoryId: 4 },
        { id: 16, name: "Iced Coffee", type: "INSTANT", price: 4, description: "Strong coffee served cold.", image: "iced-coffee.jpg", categoryId: 4 },
        { id: 17, name: "Bubble Tea", type: "INSTANT", price: 5, description: "Milk tea with chewy tapioca pearls.", image: "bubble-tea.jpg", categoryId: 4 },
        { id: 18, name: "Green Tea", type: "INSTANT", price: 2, description: "Hot or iced, earthy and soothing.", image: "green-tea.jpg", categoryId: 4 },
        { id: 19, name: "Craft Beer", type: "INSTANT", price: 6, description: "Locally brewed, crisp and refreshing.", image: "beer.jpg", categoryId: 4 },
    ],
};

/* ─── MenuItem Card ───────────────────────────────────────────────────────── */
const MenuCard = ({ item, onOrder }) => {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);
    const [imgErr, setImgErr] = useState(false);

    const handleOrder = () => {
        onOrder(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32 }}
            style={{
                ...styles.card,
                boxShadow: hovered ? "0 12px 36px rgba(192,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.3)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {imgErr ? (
                <div style={styles.cardImgPlaceholder}>{categoryEmoji[item.category] || "🍴"}</div>
            ) : (
                <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={styles.cardImg}
                    onError={() => setImgErr(true)}
                />
            )}
            <div style={styles.cardBody}>
                <span style={styles.cardTag(item.type)}>
                    {item.type === "INSTANT" ? "Ready instantly" : "Kitchen order"}
                </span>
                <div style={styles.cardName}>{item.name}</div>
                <div style={styles.cardDesc}>{item.description}</div>
                <div style={styles.cardFooter}>
                    <span style={styles.cardPrice}>${item.price}</span>
                    <motion.button
                        style={{
                            ...styles.orderBtn,
                            background: added ? "#166534" : "#C00000",
                            color: "#FAFAFA",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOrder}
                    >
                        {added ? "✓ Added" : "+ Order"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Main Menu Page ──────────────────────────────────────────────────────── */
const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState("Appetizers");
    const [showCart, setShowCart] = useState(false);
    const { cart, addItem, removeItem, clearCart, totalPrice, placeOrder, customerTable } = useCart();

    const handleCheckout = () => {
        if (!customerTable) {
            alert("No table number found. Please go back to Home first.");
            return;
        }
        placeOrder();
        setShowCart(false);
        alert("Order confirmed! 🎉");
    };

    return (
        <div style={styles.page}>

            {/* ── Hero ── */}
            <div style={styles.hero}>
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={styles.heroBadge}>Fine Dining Experience</div>
                    <div style={styles.heroTitle}>Our Menu</div>
                    <p style={styles.heroSub}>
                        Discover authentic flavours crafted with care — from hearty mains to delicate desserts.
                    </p>
                </div>
                {/* decorative rings */}
                <div style={{
                    position: "absolute", width: 340, height: 340, borderRadius: "50%",
                    border: "1px solid rgba(220,38,38,0.12)", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)", pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", width: 540, height: 540, borderRadius: "50%",
                    border: "1px solid rgba(220,38,38,0.06)", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)", pointerEvents: "none",
                }} />
            </div>

            {/* ── Sticky category nav ── */}
            <div style={styles.stickyNav}>
                <div style={styles.navInner}>
                    {Object.keys(menuItems).map((cat) => (
                        <button
                            key={cat}
                            style={styles.navBtn(selectedCategory === cat)}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {categoryEmoji[cat]} {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Items grid ── */}
            <div style={styles.content}>
                <div style={styles.sectionLabel}>
                    {categoryEmoji[selectedCategory]} {selectedCategory}
                </div>
                <div style={styles.sectionDivider} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Row className="g-4">
                            {menuItems[selectedCategory].map((item, i) => (
                                <Col md={6} lg={4} key={item.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06, duration: 0.3 }}
                                        style={{ height: "100%" }}
                                    >
                                        <MenuCard item={{ ...item, category: selectedCategory }} onOrder={addItem} />
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Floating cart button ── */}
            <AnimatePresence>
                {cart.length >= 0 && (
                    <motion.button
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={styles.cartFab}
                        onClick={() => setShowCart(true)}
                    >
                        🛒 View Cart
                        {cart.length > 0 && <span style={styles.cartBadge}>{cart.length}</span>}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Cart Offcanvas ── */}
            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end"
                style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 400, background: "#0D0D0D" }}>
                <Offcanvas.Header closeButton style={{ borderBottom: "1px solid #2A0000", paddingBottom: 16, background: "#0D0D0D" }}>
                    <span style={styles.cartTitle}>Your Order</span>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ padding: "20px 24px", background: "#0D0D0D" }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "#666" }}>
                            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🛒</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#FAFAFA", marginBottom: 6 }}>Your cart is empty</div>
                            <div style={{ fontSize: "13px" }}>Add some dishes to get started!</div>
                        </div>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div key={item.id} style={styles.cartItem}>
                                    <div style={{ flex: 1 }}>
                                        <div style={styles.cartItemName}>{item.name}</div>
                                        <div style={styles.cartItemMeta}>Qty: {item.quantity}</div>
                                    </div>
                                    <span style={styles.cartItemPrice}>${item.price * item.quantity}</span>
                                    <button style={styles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">×</button>
                                </div>
                            ))}

                            <div style={styles.totalRow}>
                                <span style={styles.totalLabel}>Total</span>
                                <span style={styles.totalAmt}>${totalPrice}</span>
                            </div>

                            {customerTable && (
                                <div style={styles.tableTag}>
                                    🪑 Table {customerTable}
                                </div>
                            )}

                            <button style={styles.confirmBtn} onClick={handleCheckout}>
                                Confirm Order →
                            </button>
                            <button style={styles.clearBtn} onClick={clearCart}>
                                Clear cart
                            </button>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Menu;