import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(data);
      data.isAdmin ? navigate('/admin') : navigate('/');
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
          <h5 className="fw-bold mt-2">تسجيل الدخول</h5>
          <p className="text-muted small">أهلاً بك مرة ثانية!</p>
        </div>

        {error && (
          <div className="alert alert-danger rounded-3 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control rounded-3 py-2"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">كلمة المرور</label>
            <input
              type="password"
              className="form-control rounded-3 py-2"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-bold py-2 rounded-pill"
            style={{ backgroundColor: '#8ece30', border: 'none' }}
            disabled={loading}
          >
            {loading ? '⏳ جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted small">ما عندك حساب؟ </span>
          <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#8ece30' }}>
            إنشاء حساب
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;