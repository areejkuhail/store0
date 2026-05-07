import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage    from "./Pages/HomePage";
import LoginPage   from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Dashboard   from "./Components/Dashboard";
import CartPage from "./Pages/CartPage";
import WishlistPage from "./Pages/WishlistPage";

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