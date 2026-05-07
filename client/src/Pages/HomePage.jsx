import { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetch("https://store0.onrender.com/api/products")
      .then(res => res.json())
      .then(data => { setProducts(data.products); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, []);

  return (
    <div dir="rtl" style={{ backgroundColor: "#e8ebeeea" }}>
      <Header />

      {/* التصنيفات */}
      <nav className="bg-white py-3 border-bottom shadow-sm">
        <div className="container d-flex justify-content-center gap-5 fw-bold text-muted my-4">
          <span style={{ cursor: "pointer" }}>الأجهزة الخلوية</span>
          <span style={{ cursor: "pointer" }}>أجهزة المنزل الذكية</span>
          <span style={{ cursor: "pointer" }}>أجهزة لوحية و كمبيوتر</span>
          <span style={{ cursor: "pointer" }}>سماعات</span>
        </div>
      </nav>

      {/* البنرات */}
      <div className="container mt-4">
        <div className="row g-3 my-4">
          <div className="col-md-6">
            <div className="rounded-4 overflow-hidden shadow-sm h-100">
              <img src="/img1.png" className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} alt="بنر" />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column gap-3">
            <div className="rounded-4 overflow-hidden shadow-sm">
              <img src="/img3.png" className="img-fluid w-100" alt="بنر" />
            </div>
            <div className="rounded-4 overflow-hidden shadow-sm">
              <img src="/img2.png" className="img-fluid w-100" alt="بنر" />
            </div>
          </div>
        </div>
      </div>

    
      {/* مقترحة لك */}
      <div className="container mt-5">
        <h3 className="fw-bold mb-4">مقترحة لك</h3>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map(product => (
              <div className="col" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* أقسام الإكسسوارات */}
      <div className="container mt-5 mb-5">
        <div className="row g-3">
          {[
            { title: "اكسسوارات اللعب", icon: "🎮" },
            { title: "أجهزة التدليك والاسترخاء", icon: "💆" },
            { title: "اكسسوارات الكترونية", icon: "🖱️" },
          ].map((cat, i) => (
            <div className="col-md-4 text-center" key={i}>
              <div className="p-3 bg-white shadow-sm rounded-4 border d-flex align-items-center justify-content-around">
                <div>
                  <h6 className="fw-bold mb-0">{cat.title}</h6>
                  <small className="text-primary" style={{ cursor: "pointer" }}>عرض الجميع &gt;</small>
                </div>
                <div className="bg-light rounded p-2" style={{ width: "60px" }}>{cat.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flash Sale */}
      <div className="container mt-5">
        <div className="row g-4 align-items-center">
          <div className="col-md-8">
            <div className="row g-4">
              {products.slice(0, 2).map(product => (
                <div className="col-md-6" key={product._id}>
                  <div className="card h-100 border-0 shadow-sm p-3 text-center rounded-4 position-relative">
                    <span className="badge bg-danger position-absolute" style={{ top: "10px", left: "10px" }}>خصم</span>
                    <div className="bg-light rounded-4 mb-3 d-flex align-items-center justify-content-center" style={{ height: "180px" }}>
                      <img src={product.image} alt={product.name} className="img-fluid h-75" style={{ objectFit: "contain" }} />
                    </div>
                    <h6 className="fw-bold mb-1">{product.name}</h6>
                    <h5 className="fw-bold" style={{ color: "#78b933" }}>${product.price.toLocaleString()}</h5>
                    <button className="btn btn-success w-100 mt-2 rounded-pill" style={{ backgroundColor: "#78b933", border: "none" }}>
                      أضف إلى السلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-5 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-center align-items-center"
              style={{ border: "2px dashed #78b933", backgroundColor: "#fff" }}>
              <div className="bg-primary text-white px-3 py-1 rounded-pill mb-2">Flash Sale</div>
              <h4 className="fw-bold">لحق حالك واطلبها الآن</h4>
              <button className="btn btn-success rounded-pill mt-3 px-5 py-2" style={{ backgroundColor: "#78b933", border: "none" }}>
                عرض جميع العروض
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* مميزات المتجر */}
      <div className="container mt-5 pt-5">
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <p className="text-muted small mt-4">منصة تسوق الكتروني رائدة محلياً توفر مجموعة متنوعة من المنتجات للتسوق بسهولة وأمان.</p>
          </div>
          {[
            { icon: "🔒", title: "طرق دفع آمنة" },
            { icon: "🛡️", title: "كفالة سنوية" },
            { icon: "⭐", title: "منتجات أصلية" },
          ].map((f, i) => (
            <div className="col-md-3" key={i}>
              <div className="card p-4 bg-white shadow-sm rounded-4 border">
                <div className="fs-2 mb-2 text-success">{f.icon}</div>
                <h6 className="fw-bold">{f.title}</h6>
                <small className="text-primary" style={{ cursor: "pointer" }}>تفاصيل أكثر</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الأفضل مبيعاً */}
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">المنتجات الأفضل مبيعاً</h3>
          <a href="#" className="text-decoration-none fw-bold" style={{ color: "#78b933" }}>عرض الجميع ‹</a>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map(product => (
            <div className="col" key={product._id}>
              <ProductCard product={product} showHeart={true} />
            </div>
          ))}
        </div>
      </div>

      {/* ماذا يقول عملاؤنا */}
      <div className="container mt-5 mb-5">
        <h3 className="fw-bold mb-4">ماذا يقول عملاؤنا ❤️</h3>
        <div className="row g-4">
          {[
            { name: "باسم", initial: "B", review: "روعة" },
            { name: "أحمد", initial: "A", review: "رائع جداً" },
            { name: "ندى", initial: "N", review: "تجربة شراء ممتازة" },
          ].map((r, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-1 rounded-5 p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <img src="/phone1.png" alt="product" className="img-fluid rounded-3" style={{ width: "100px" }} />
                  <div className="text-end">
                    <div className="d-flex align-items-center justify-content-end mb-2">
                      <span className="fw-bold me-2 fs-5">{r.name}</span>
                      <div className="text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "45px", height: "45px", backgroundColor: "#8ece30" }}>
                        <span className="fw-bold">{r.initial}</span>
                      </div>
                    </div>
                    <div className="text-warning mb-3">⭐⭐⭐⭐⭐</div>
                    <p className="fw-bold text-dark">{r.review}</p>
                  </div>
                </div>
                <div className="mt-auto pt-3 border-top text-end text-muted small">2025, Feb Sat 📅</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;