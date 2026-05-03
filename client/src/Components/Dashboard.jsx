import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';

const emptyForm = {
  name: '',
  price: '',
  description: '',
  category: '',
  image: '',
  countInStock: '',
};

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  
  const fetchProducts = () => {
    axios.get(API).then(res => setProducts(res.data.products));
  };

  useEffect(() => { fetchProducts(); }, []);

  // تغيير الحقول
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // إضافة أو تعديل
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        setMsg('✅ تم تعديل المنتج!');
      } else {
        await axios.post(API, form);
        setMsg('✅ تم إضافة المنتج!');
      }
      setForm(emptyForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      setMsg('❌ حدث خطأ، تحقق من البيانات');
    }
    setLoading(false);
    setTimeout(() => setMsg(''), 3000);
  };

  // تعبئة الفورم للتعديل
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || '',
      category: product.category || '',
      image: product.image || '',
      countInStock: product.countInStock || '',
    });
    setEditId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // حذف منتج
  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    await axios.delete(`${API}/${id}`);
    setMsg('🗑️ تم حذف المنتج');
    fetchProducts();
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* الهيدر */}
      <div style={{ backgroundColor: '#8ece30' }} className="py-3 px-4 shadow-sm sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <h4 className="text-white fw-bold mb-0"> لوحة التحكم 🛠️</h4>
          <a href="/" className="btn btn-light btn-sm rounded-pill px-3">
            العودة للمتجر
          </a>
        </div>
      </div>

      <div className="container py-5">

        {/* رسالة النجاح أو الخطأ */}
        {msg && (
          <div className={`alert ${msg.includes('❌') ? 'alert-danger' : 'alert-success'} rounded-4 mb-4`}>
            {msg}
          </div>
        )}

        {/* إحصائيات سريعة */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <div className="fs-1">📦</div>
              <h2 className="fw-bold" style={{ color: '#8ece30' }}>{products.length}</h2>
              <p className="text-muted mb-0">إجمالي المنتجات</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <div className="fs-1">✅</div>
              <h2 className="fw-bold" style={{ color: '#8ece30' }}>
                {products.filter(p => p.countInStock > 0).length}
              </h2>
              <p className="text-muted mb-0">منتجات متوفرة</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <div className="fs-1">❌</div>
              <h2 className="fw-bold text-danger">
                {products.filter(p => p.countInStock === 0).length}
              </h2>
              <p className="text-muted mb-0">نفدت الكمية</p>
            </div>
          </div>
        </div>

        {/* فورم الإضافة / التعديل */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
          <h5 className="fw-bold mb-4">
            {editId ? '✏️ تعديل المنتج' : '➕ إضافة منتج جديد'}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">اسم المنتج *</label>
                <input
                  className="form-control rounded-3"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="مثال: Samsung Galaxy S25"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">السعر *</label>
                <input
                  className="form-control rounded-3"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="مثال: 1200"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">الفئة</label>
                <select
                  className="form-select rounded-3"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">اختر الفئة</option>
                  <option value="هواتف">هواتف</option>
                  <option value="أجهزة منزلية">أجهزة منزلية</option>
                  <option value="أجهزة لوحية">أجهزة لوحية</option>
                  <option value="سماعات">سماعات</option>
                  <option value="اكسسوارات">اكسسوارات</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">الكمية في المخزن</label>
                <input
                  className="form-control rounded-3"
                  name="countInStock"
                  type="number"
                  value={form.countInStock}
                  onChange={handleChange}
                  placeholder="مثال: 10"
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">رابط الصورة</label>
                <input
                  className="form-control rounded-3"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">الوصف</label>
                <textarea
                  className="form-control rounded-3"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="وصف مختصر للمنتج..."
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button
                type="submit"
                className="btn text-white px-4 rounded-pill"
                style={{ backgroundColor: '#8ece30', border: 'none' }}
                disabled={loading}
              >
                {loading ? '⏳ جاري الحفظ...' : editId ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => { setForm(emptyForm); setEditId(null); }}
                >
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>

        {/* جدول المنتجات */}
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <h5 className="fw-bold mb-4">📋 قائمة المنتجات ({products.length})</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center">
              <thead style={{ backgroundColor: '#f0f9e8' }}>
                <tr>
                  <th>الصورة</th>
                  <th>الاسم</th>
                  <th>الفئة</th>
                  <th>السعر</th>
                  <th>المخزن</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image || '/phone1.png'}
                        alt={product.name}
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                        className="rounded-3"
                      />
                    </td>
                    <td className="fw-bold">{product.name}</td>
                    <td>
                      <span className="badge rounded-pill" style={{ backgroundColor: '#e8f5d0', color: '#5a8a1a' }}>
                        {product.category || '—'}
                      </span>
                    </td>
                    <td className="fw-bold" style={{ color: '#8ece30' }}>
                      ${product.price}
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${product.countInStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {product.countInStock > 0 ? product.countInStock : 'نفد'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill px-3"
                          onClick={() => handleEdit(product)}
                        >
                          تعديل
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() => handleDelete(product._id)}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;