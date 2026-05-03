import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterPage() {
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('كلمتا المرور غير متطابقتين');
    if (form.password.length < 6) return setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ، حاول مرة ثانية');
    }
    setLoading(false);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}
      className="d-flex align-items-center justify-content-center">
      <div className="card border-0 shadow-sm rounded-4 p-5" style={{ width: '100%', maxWidth: '420px' }}>

        {/* اللوغو */}
        <div className="text-center mb-4">
          <div className="fs-2 fw-bold" style={{ color: '#8ece30' }}>Store 🛍️</div>
          <h5 className="fw-bold mt-2">إنشاء حساب جديد</h5>
          <p className="text-muted small">انضم إلينا اليوم!</p>
        </div>

        {error && (
          <div className="alert alert-danger rounded-3 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">الاسم</label>
            <input
              className="form-control rounded-3 py-2"
              name="name"
              placeholder="اسمك الكامل"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control rounded-3 py-2"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">كلمة المرور</label>
            <input
              type="password"
              className="form-control rounded-3 py-2"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">تأكيد كلمة المرور</label>
            <input
              type="password"
              className="form-control rounded-3 py-2"
              name="confirm"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-bold py-2 rounded-pill"
            style={{ backgroundColor: '#8ece30', border: 'none' }}
            disabled={loading}
          >
            {loading ? '⏳ جاري الإنشاء...' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted small">عندك حساب؟ </span>
          <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#8ece30' }}>
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;