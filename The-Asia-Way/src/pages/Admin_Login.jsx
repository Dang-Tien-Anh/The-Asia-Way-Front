// src/pages/Admin_Login.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Staff_Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Admin Login:", { username, password });
        navigate("/staff/home");
    };

    return (
        <Container className="py-5 mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="fw-bold display-5 text-center mb-4">Admin Login</h1>
                    <Form
                        onSubmit={handleSubmit}
                        className="p-4 border rounded shadow-sm bg-light"
                    >
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" variant="danger" size="lg">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Staff_Login;
