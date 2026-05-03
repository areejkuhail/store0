import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div dir="rtl" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Header />
      <div className="container py-5">
        <h3 className="fw-bold mb-4">❤️ المفضلة</h3>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1 mb-3">❤️</div>
            <h5 className="text-muted">المفضلة فاضية!</h5>
            <Link to="/" className="btn rounded-pill mt-3 text-white px-4"
              style={{ backgroundColor: '#8ece30', border: 'none' }}>
              تسوق الآن
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistItems.map(item => (
              <div className="col-md-4" key={item._id}>
                <div className="card border-0 shadow-sm rounded-4 p-3 text-center">
                  <div className="bg-light rounded-4 mb-3 d-flex align-items-center justify-content-center"
                    style={{ height: "200px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid h-75"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-muted small">{item.category}</p>
                  <h5 className="fw-bold mb-3" style={{ color: "#78b933" }}>
                    ${item.price.toLocaleString()}
                  </h5>
                  <div className="d-flex gap-2">
                    <button
                      className="btn w-100 text-white rounded-pill py-2 d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#8ece30', border: 'none' }}
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingCart /> أضف للسلة
                    </button>
                    <button
                      className="btn btn-outline-danger rounded-pill px-3"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;