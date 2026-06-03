import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart.store";

import AD1 from "../assets/ad1.jpg";
import AD2 from "../assets/ad2.jpg";
import AD3 from "../assets/ad3.jpg";

const Home_Customer = () => {
    const navigate = useNavigate();
    const { customerTable, setTable } = useCart();

    // just for now (table number thing)
    const [tableNumber, setTableNumber] = useState(customerTable || "");

    useEffect(() => {
        if (tableNumber) {
            setTable(tableNumber);
        }
    }, [tableNumber, setTable]);

    return (
        <div className="container text-center py-5 mt-5">
            <h1 className="fw-bold mb-4">Welcome to Asian Way</h1>

            {/* ✅ Editable table number */}
            <h4 className="text-muted mb-3">
                Your table is{" "}
                <span className="fw-bold">{customerTable || "Not set"}</span>
            </h4>
            <div className="d-flex justify-content-center gap-2 mb-4">
                <input
                    type="text"
                    className="form-control w-auto"
                    placeholder="Enter table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                />
                <button
                    className="btn btn-success"
                    onClick={() => setTable(tableNumber)}
                >
                    Save
                </button>
            </div>

            {/* Ads slideshow */}
            <div
                style={{
                    width: "320px",
                    height: "320px",
                    margin: "0 auto",
                    overflow: "hidden",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                className="mb-5"
            >
                <Carousel fade controls indicators interval={2500}>
                    <Carousel.Item>
                        <img
                            src={AD1}
                            alt="Ad 1"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src={AD2}
                            alt="Ad 2"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src={AD3}
                            alt="Ad 3"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <button
                    className="btn btn-danger btn-lg px-4"
                    onClick={() => navigate("/menu")}
                >
                    View Menu
                </button>
                <button
                    className="btn btn-warning btn-lg px-4"
                    onClick={() => navigate("/call")}
                >
                    Call Waiter
                </button>
                <button
                    className="btn btn-success btn-lg px-4"
                    onClick={() => navigate("/checkout")}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Home_Customer;
