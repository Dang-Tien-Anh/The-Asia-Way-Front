import React, { useState } from "react";
import { Container, Table, Button, Badge, Modal, Row, Col } from "react-bootstrap";
import { useCart } from "../store/cart.store";
import {
    ORDER_ITEM_STATUS,
    ORDER_STATUS_COLORS,
    TABLE_STATUS,
    TABLE_STATUS_COLORS,
} from "../store/status";

const Home_Staff = () => {
    const { orders, updateOrderStatus } = useCart();

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    // Change table number here!!!
    const [tableStatuses, setTableStatuses] = useState(
        Array.from({ length: 20 }, (_, i) => ({
            number: i + 1,
            status: TABLE_STATUS.EMPTY,
        }))
    );

    const handleTableClick = (tableNumber) => {
        setSelectedTable(tableNumber);
        setShowModal(true);
    };

    const changeTableStatus = (status) => {
        setTableStatuses((prev) =>
            prev.map((t) =>
                t.number === selectedTable ? { ...t, status } : t
            )
        );
    };

    // ✅ Update per item, not whole order
    const updateItemStatus = (orderId, itemId, newStatus) => {
        updateOrderStatus(orderId, newStatus, itemId);
    };

    return (
        <Container className="py-5 mt-5">
            <h1 className="fw-bold display-5 mb-4 text-center">Staff Orders</h1>

            {orders.length === 0 ? (
                <p className="text-muted text-center">No orders yet.</p>
            ) : (
                <>
                    {/* ✅ Kitchen Orders */}
                    <h2 className="fw-bold mt-4 mb-3 text-center">Kitchen Orders</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Table</th>
                                <th>Kitchen Item</th>
                                <th>Qty</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => {
                                const kitchenItems = order.items.filter((it) => it.type === "KITCHEN");
                                if (kitchenItems.length === 0) return null;
                                return kitchenItems.map((it) => (
                                    <tr key={`${order.id}-${it.item.id}`}>
                                        <td>Order {idx + 1}</td>
                                        <td>{order.customer?.table || "N/A"}</td>
                                        <td>{it.item.name}</td>
                                        <td>{it.quantity}</td>
                                        <td>
                                            <Badge bg={ORDER_STATUS_COLORS[it.status]}>
                                                {it.status}
                                            </Badge>
                                        </td>
                                        <td className="d-flex flex-wrap gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    updateItemStatus(order.id, it.item.id, ORDER_ITEM_STATUS.PENDING)
                                                }
                                            >
                                                Pending
                                            </Button>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() =>
                                                    updateItemStatus(order.id, it.item.id, ORDER_ITEM_STATUS.PREPARING)
                                                }
                                            >
                                                Preparing
                                            </Button>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() =>
                                                    updateItemStatus(order.id, it.item.id, ORDER_ITEM_STATUS.DONE)
                                                }
                                            >
                                                Done
                                            </Button>
                                            <Button
                                                variant="info"
                                                size="sm"
                                                onClick={() =>
                                                    updateItemStatus(order.id, it.item.id, ORDER_ITEM_STATUS.SERVED)
                                                }
                                            >
                                                Served
                                            </Button>
                                        </td>
                                    </tr>
                                ));
                            })}
                        </tbody>
                    </Table>

                    {/* ✅ Instant Orders */}
                    <h2 className="fw-bold mt-4 mb-3 text-center">Instant Orders</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Table</th>
                                <th>Instant Item</th>
                                <th>Qty</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => {
                                const instantItems = order.items.filter((it) => it.type === "INSTANT");
                                if (instantItems.length === 0) return null;
                                return instantItems.map((it) => (
                                    <tr key={`${order.id}-${it.item.id}`}>
                                        <td>Order {idx + 1}</td>
                                        <td>{order.customer?.table || "N/A"}</td>
                                        <td>{it.item.name}</td>
                                        <td>{it.quantity}</td>
                                        <td>
                                            <Badge bg={ORDER_STATUS_COLORS[it.status]}>
                                                {it.status}
                                            </Badge>
                                        </td>
                                        <td className="d-flex flex-wrap gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    updateItemStatus(order.id, it.item.id, ORDER_ITEM_STATUS.PENDING)
                                                }
                                            >
                                                Pending
                                            </Button>
                                            {/* ✅ Instant skips Preparing/Done */}
                                            <Button
                                                variant="info"
                                                size="sm"
                                                onClick={() =>
                                                    updateItemStatus(order.id, it.item.id, ORDER_ITEM_STATUS.SERVED)
                                                }
                                            >
                                                Served
                                            </Button>
                                        </td>
                                    </tr>
                                ));
                            })}
                        </tbody>
                    </Table>
                </>
            )}

            {/* The grid? like 4 table per line thing */}
            <h2 className="fw-bold mt-5 mb-3 text-center">Tables</h2>
            <Row className="g-3">
                {tableStatuses.map((table) => {
                    // ✅ Check if this table has active orders
                    const hasOrders = orders.some(
                        (order) =>
                            order.customer?.table === table.number &&
                            order.items.some((it) => it.status !== ORDER_ITEM_STATUS.SERVED)
                    );

                    // ✅ If orders exist, override status to OCCUPIED
                    const displayStatus = hasOrders ? TABLE_STATUS.OCCUPIED : table.status;

                    return (
                        <Col md={3} key={table.number}>
                            <Button
                                variant={TABLE_STATUS_COLORS[displayStatus]}
                                className="w-100 p-4"
                                onClick={() => handleTableClick(table.number)}
                            >
                                Table {table.number}
                                <br />
                                {displayStatus}
                            </Button>
                        </Col>
                    );
                })}
            </Row>

            {/* Its centered! */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Table {selectedTable} Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap gap-2">
                        <Button
                            variant={TABLE_STATUS_COLORS[TABLE_STATUS.EMPTY]}
                            onClick={() => changeTableStatus(TABLE_STATUS.EMPTY)}
                        >
                            Empty
                        </Button>
                        <Button
                            variant={TABLE_STATUS_COLORS[TABLE_STATUS.RESERVED]}
                            onClick={() => changeTableStatus(TABLE_STATUS.RESERVED)}
                        >
                            Reserved
                        </Button>
                        <Button
                            variant={TABLE_STATUS_COLORS[TABLE_STATUS.OCCUPIED]}
                            onClick={() => changeTableStatus(TABLE_STATUS.OCCUPIED)}
                        >
                            Occupied
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Home_Staff;
