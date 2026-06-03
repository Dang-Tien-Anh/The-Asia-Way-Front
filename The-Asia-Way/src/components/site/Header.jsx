import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart.store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((s, it) => s + it.quantity, 0);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top border-bottom border-secondary">
        <div className="container-fluid">

          <Link to="/" className="navbar-brand d-flex align-items-center">
            <span className="fs-3 me-2">🥢</span>
            <span className="fw-bold text-uppercase">
              Asian <span className="text-danger">Way</span>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/menu" className="nav-link">Menu</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <Link to="/reservation" className="btn btn-outline-danger btn-sm">
                Reservations
              </Link>
              <Link to="/menu" className="btn btn-danger btn-sm">
                Order Online
              </Link>
              <Link to="/staff/login" className="btn btn-outline-light btn-sm">
                Staff Login
              </Link>
              <Link to="/admin/login" className="btn btn-outline-light btn-sm">
                Admin Login
              </Link>

              {/* <Link to="/cart" className="btn btn-outline-light position-relative ms-2">
                <ShoppingBag className="me-1" />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link> */}
              {/* plz remove later, keep for refrence only */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
