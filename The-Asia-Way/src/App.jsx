import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/site/Header";
import Footer from "./components/site/Footer";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Staff_Login from "./pages/Staff_Login";
import Home_Customer from "./pages/Home_Customer";
import Home_Staff from "./pages/Home_Staff";


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        {/* Routing area */}
        <main className="flex-grow-1 mt-5">
          <Routes>
            <Route path="/" element={<Home_Customer />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/staff/login" element={<Staff_Login />} />
            <Route path="/staff/home" element={<Home_Staff />} />
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
