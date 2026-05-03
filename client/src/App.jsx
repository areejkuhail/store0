import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage    from "./pages/HomePage";
import LoginPage   from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard   from "./components/Dashboard";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <Router>
      <div dir="rtl">
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin"    element={<Dashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;