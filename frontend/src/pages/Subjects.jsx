import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const subjectIcon = {
  Mathematics: '📐',
  Science: '🧪',
};

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/subjects')
      .then(res => setSubjects(res.data))
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50/30 to-white">
      <nav className="bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-xl font-bold text-brand-700">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white text-xs font-black">S</div>
          StudyPath
        </div>
        <div className="flex items-center gap-5">
          <span className="text-sm text-slate-600 hidden sm:inline">Hi, {user?.name}</span>
          <button onClick={() => navigate('/dashboard')} className="text-sm text-brand-600 font-medium hover:underline">
            Dashboard
          </button>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-slate-700">
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">Pick a subject</h1>
        <p className="text-slate-500 mb-8">Choose what you'd like to be assessed on today.</p>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 h-28 animate-pulse" />
            ))}
          </div>
        ) : subjects.length === 0 ? (
          <p className="text-slate-500">No subjects available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {subjects.map((s) => (
              <button
                key={s._id}
                onClick={() => navigate(`/assessment/${s._id}`)}
                className="text-left bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-400 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center text-xl mb-4 group-hover:bg-brand-100 transition-colors">
                  {subjectIcon[s.name] || '📘'}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{s.name}</h3>
                <p className="text-sm text-slate-500">Grades {s.applicableGrades?.join(', ')}</p>
                <p className="text-sm text-brand-600 font-medium mt-3 flex items-center gap-1">
                  Start assessment <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}