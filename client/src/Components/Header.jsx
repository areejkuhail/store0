import { FaUser, FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ backgroundColor: "#8ece30" }} className="py-3 shadow-sm sticky-top">
      <div className="container d-flex align-items-center justify-content-between my-2">

        <Link to="/" className="text-white text-decoration-none d-flex align-items-center">
          <span className="fw-bold fs-3">Store</span>
          <div className="ms-2 fs-2">🛍️</div>
        </Link>

        <div className="flex-grow-1 mx-5 position-relative d-none d-md-block">
          <input type="text" className="form-control rounded-pill py-2 px-4 border-0"
            placeholder="ما الذي تبحث عنه؟" style={{ textAlign: "right" }} />
          <FaSearch className="position-absolute text-muted" style={{ right: "20px", top: "12px" }} />
        </div>

        <div className="d-flex gap-3 text-white fs-4 align-items-center">
          {user?.isAdmin && (
            <Link to="/admin" title="لوحة التحكم" className="text-decoration-none">⚙️</Link>
          )}

          {/* المفضلة */}
          <Link to="/wishlist" className="text-white position-relative">
            <FaHeart style={{ cursor: "pointer" }} />
            {totalWishlist > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '10px' }}>
                {totalWishlist}
              </span>
            )}
          </Link>

          {/* السلة */}
          <Link to="/cart" className="text-white position-relative">
            <FaShoppingCart style={{ cursor: "pointer" }} />
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '10px' }}>
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="small fw-bold d-none d-md-inline">{user.name}</span>
              <button onClick={handleLogout}
                className="btn btn-sm btn-light rounded-pill px-3"
                style={{ fontSize: '12px' }}>
                خروج
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white">
              <FaUser style={{ cursor: "pointer" }} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;