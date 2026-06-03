// src/pages/Menu.jsx
import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button, Offcanvas, Table } from "react-bootstrap";
import { useCart } from "../store/cart.store";

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState("Appetizers");
    const [showCart, setShowCart] = useState(false);

    const { cart, addItem, removeItem, clearCart, totalPrice, placeOrder, customerTable } = useCart();

    // ✅ Menu items with schema: name, type, price, description, image, categoryId
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

    const handleOrder = (item) => {
        addItem(item, 1);
    };

    const handleCheckout = () => {
        if (!customerTable) {
            alert("No table number found. Please go back to Home first.");
            return;
        }
        placeOrder();
        setShowCart(false);
        alert("Order confirmed!");
    };

    return (
        <Container className="py-5">
            <h1 className="fw-bold display-5 text-center mb-4">Our Menu</h1>
            <p className="text-dark text-center mb-5">
                Explore our categories and discover authentic flavors.
            </p>

            <Row>
                {/* sidebar for categories!!! */}
                <Col md={3} className="mb-4">
                    <h4 className="fw-bold mb-3">Categories</h4>
                    <ListGroup>
                        {Object.keys(menuItems).map((category) => (
                            <ListGroup.Item
                                key={category}
                                action
                                active={selectedCategory === category}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Check the cart */}
                    <div className="mt-4 d-grid">
                        <Button variant="primary" onClick={() => setShowCart(true)}>
                            Check Cart ({cart.length})
                        </Button>
                    </div>
                </Col>

                {/* Menu items */}
                <Col md={9}>
                    <Row className="g-4">
                        {menuItems[selectedCategory].map((item) => (
                            <Col md={6} key={item.id}>
                                <Card className="h-100 shadow-sm">
                                    {item.image && <Card.Img variant="top" src={`/images/${item.image}`} alt={item.name} />}
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{item.name}</Card.Title>
                                        <Card.Text className="text-dark">{item.description}</Card.Text>
                                        {/* ✅ Show price directly (convert cents to dollars if needed) */}
                                        <h6 className="fw-bold text-danger mb-2">${item.price}</h6>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleOrder(item)}
                                        >
                                            Order
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Cart offcanvas */}
            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.length === 0 ? (
                        <p className="text-muted">Your cart is empty.</p>
                    ) : (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.price * item.quantity}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>p
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <h5>Total: ${totalPrice}</h5>
                                <div className="d-flex gap-2">
                                    <Button variant="secondary" onClick={clearCart}>
                                        Clear
                                    </Button>
                                    <Button variant="success" onClick={handleCheckout}>
                                        Confirm Order
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="fw-bold">Table: {customerTable || "N/A"}</span>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default Menu;
