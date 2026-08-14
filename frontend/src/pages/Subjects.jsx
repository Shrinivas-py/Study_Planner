import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

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

  const startAssessment = (subjectId) => {
    navigate(`/assessment/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-brand-700">StudyPath</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Hi, {user?.name}</span>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-slate-700">
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Pick a subject</h1>
        <p className="text-slate-500 mb-8">Choose what you'd like to be assessed on today.</p>

        {loading ? (
          <p className="text-slate-500">Loading subjects...</p>
        ) : subjects.length === 0 ? (
          <p className="text-slate-500">No subjects available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {subjects.map((s) => (
              <button
                key={s._id}
                onClick={() => startAssessment(s._id)}
                className="text-left bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-500 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{s.name}</h3>
                <p className="text-sm text-slate-500">Grades {s.applicableGrades?.join(', ')}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}