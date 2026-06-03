// src/pages/Reservation.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // No reservation save yet!
        console.log("Reservation:", { date, time });
        // Move to Menu page after finish
        navigate("/menu");
    };

    return (
        <Container className="py-5 mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="fw-bold display-5 text-center mb-4">Make a Reservation</h1>
                    <p className="text-muted text-center mb-4">
                        Choose your date and time, then browse the menu so we can prepare your dishes.
                    </p>

                    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" variant="danger" size="lg">
                                Continue to Menu
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Reservation;
