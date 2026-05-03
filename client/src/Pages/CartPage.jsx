import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  return (
    <div dir="rtl" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Header />
      <div className="container py-5">
        <h3 className="fw-bold mb-4">🛒 سلة التسوق</h3>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1 mb-3">🛒</div>
            <h5 className="text-muted">السلة فاضية!</h5>
            <Link to="/" className="btn rounded-pill mt-3 text-white px-4"
              style={{ backgroundColor: '#8ece30', border: 'none' }}>
              تسوق الآن
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {/* قائمة المنتجات */}
            <div className="col-md-8">
              {cartItems.map(item => (
                <div key={item._id} className="card border-0 shadow-sm rounded-4 p-3 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '90px', height: '90px', objectFit: 'contain' }}
                      className="rounded-3 bg-light p-2"
                    />
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <p className="text-muted small mb-2">{item.category}</p>
                      <h6 className="fw-bold" style={{ color: '#8ece30' }}>
                        ${(item.price * item.qty).toLocaleString()}
                      </h6>
                    </div>
                    {/* التحكم بالكمية */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                        onClick={() => updateQty(item._id, item.qty - 1)}
                      >−</button>
                      <span className="fw-bold">{item.qty}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0 }}
                        onClick={() => updateQty(item._id, item.qty + 1)}
                      >+</button>
                    </div>
                    {/* حذف */}
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      onClick={() => removeFromCart(item._id)}
                    >حذف</button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-outline-secondary rounded-pill px-4 mt-2"
                onClick={clearCart}
              >
                🗑️ تفريغ السلة
              </button>
            </div>

            {/* ملخص الطلب */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">ملخص الطلب</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">عدد المنتجات</span>
                  <span className="fw-bold">{cartItems.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">الشحن</span>
                  <span className="text-success fw-bold">مجاني</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">المجموع</span>
                  <span className="fw-bold fs-5" style={{ color: '#8ece30' }}>
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  className="btn w-100 text-white fw-bold py-2 rounded-pill"
                  style={{ backgroundColor: '#8ece30', border: 'none' }}
                >
                  إتمام الطلب ✓
                </button>
                <Link to="/" className="btn w-100 btn-outline-secondary rounded-pill mt-2 py-2">
                  متابعة التسوق
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;