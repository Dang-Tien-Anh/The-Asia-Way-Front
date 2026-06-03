// // src/pages/Cart.jsx
// import React from "react";
// import { Container, Table, Button } from "react-bootstrap";
// import { useCart } from "../store/cart.store";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//     const { cart, removeItem, clearCart, totalPrice, placeOrder, customerTable } = useCart();
//     const navigate = useNavigate();

//     const handleCheckout = () => {
//         if (!customerTable) {
//             alert("No table number found. Please go back to Home first.");
//             return;
//         }
//         placeOrder(); // ✅ table is already attached in store
//         navigate("/staff/home"); // ✅ send staff to dashboard
//     };

//     return (
//         <Container className="py-5 mt-5">
//             <h1 className="fw-bold display-5 mb-4 text-center">Your Cart</h1>

//             {cart.length === 0 ? (
//                 <p className="text-muted text-center">Your cart is empty.</p>
//             ) : (
//                 <>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>Item</th>
//                                 <th>Description</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cart.map((item) => (
//                                 <tr key={item.id}>
//                                     <td>{item.name}</td>
//                                     <td>{item.desc}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>${item.price * item.quantity}</td>
//                                     <td>
//                                         <Button
//                                             variant="danger"
//                                             size="sm"
//                                             onClick={() => removeItem(item.id)}
//                                         >
//                                             Remove
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>

//                     <div className="d-flex justify-content-between align-items-center mt-3">
//                         <h4>Total: ${totalPrice}</h4>
//                         <div className="d-flex gap-2 align-items-center">
//                             <span className="fw-bold">Table: {customerTable || "N/A"}</span>
//                             <Button variant="secondary" onClick={clearCart}>
//                                 Clear Cart
//                             </Button>
//                             <Button variant="success" onClick={handleCheckout}>
//                                 Confirm Order
//                             </Button>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </Container>
//     );
// };

// export default Cart;

// please remove later, keep for refrence
