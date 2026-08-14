import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/subjects');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-800 text-white flex-col justify-between p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-2 text-2xl font-bold tracking-tight">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-brand-700 text-sm font-black">S</div>
          StudyPath
        </div>

        <div className="relative">
          <h2 className="text-3xl font-semibold leading-snug mb-4">
            Your learning, mapped to you.
          </h2>
          <p className="text-brand-100 max-w-md leading-relaxed">
            Take an assessment, see exactly where you stand, and get a study plan built around your own strengths and gaps — no guesswork.
          </p>
        </div>

        <div className="relative text-sm text-brand-100">© 2026 StudyPath</div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 text-xl font-bold text-brand-700 mb-8">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white text-xs font-black">S</div>
            StudyPath
          </div>

          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 mb-8 text-sm">Log in to continue your study plan.</p>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60 shadow-sm shadow-brand-600/30"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6 text-center">
            No account? <Link to="/register" className="text-brand-600 font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}