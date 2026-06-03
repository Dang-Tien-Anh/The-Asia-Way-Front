import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white pt-5 pb-3 border-top border-secondary">
            <div className="container">
                <div className="row">

                    <div className="col-md-3 mb-4">
                        <Link to="/" className="d-flex align-items-center mb-3 text-white text-decoration-none">
                            <span className="fs-3 me-2">🥢</span>
                            <span className="fw-bold text-uppercase">Asian <span className="text-danger">Way</span></span>
                        </Link>
                        <p className="text-muted small">
                            Please put description later maybe
                        </p>
                        <div className="d-flex gap-2">
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle"><FaInstagram /></a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle"><FaFacebook /></a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle"><FaTwitter /></a>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h5 className="text-danger text-uppercase mb-3">Explore</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/menu" className="text-muted text-decoration-none">Menu</Link></li>
                            <li><Link to="/about" className="text-muted text-decoration-none">About</Link></li>
                            <li><Link to="/contact" className="text-muted text-decoration-none">Reservations</Link></li>
                            <li><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5 className="text-danger text-uppercase mb-3">Contact</h5>
                        <p className="text-muted"><MapPin className="me-2" /> 123 Lantern Street, District 1, HCMC</p>
                        <p className="text-muted"><Phone className="me-2" /> +84 (0) 90 123 4567</p>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h5 className="text-danger text-uppercase mb-3">Service time</h5>
                        <p className="text-muted mb-1">Mon - Fri: <span className="text-white">11:00 - 22:30</span></p>
                        <p className="text-muted mb-3">Sat - Sun: <span className="text-white">10:00 - 23:30</span></p>
                        <form className="d-flex">
                            <input type="email" className="form-control me-2" placeholder="Your email" />
                            <button className="btn btn-danger">Send</button>
                        </form>
                    </div>
                </div>

                <div className="border-top border-secondary mt-4 pt-3 d-flex justify-content-between text-muted small">
                    <p className="mb-0">© {currentYear} THE ASIAN WAY STUDIO.</p>
                    <div>
                        <a href="#" className="text-muted me-3">Privacy</a>
                        <a href="#" className="text-muted">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
