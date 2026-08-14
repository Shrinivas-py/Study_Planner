import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [topicsMap, setTopicsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/subjects').then(res => {
      setSubjects(res.data);
      if (res.data.length > 0) setSelectedSubject(res.data[0]._id);
    });
  }, []);

  useEffect(() => {
    if (!selectedSubject) return;
    setLoading(true);
    api.get(`/roadmap/${selectedSubject}`)
      .then(res => setRoadmap(res.data.roadmap))
      .catch(() => setRoadmap([]))
      .finally(() => setLoading(false));
  }, [selectedSubject]);

  const markDone = async (topicId) => {
    await api.patch(`/roadmap/${selectedSubject}/topic/${topicId}`, { status: 'done' });
    const res = await api.get(`/roadmap/${selectedSubject}`);
    setRoadmap(res.data.roadmap);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const badgeColor = {
    weak: 'bg-red-50 text-red-700 border-red-200',
    moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    strong: 'bg-green-50 text-green-700 border-green-200',
  };

  const avgMastery = roadmap.length
    ? Math.round(roadmap.reduce((sum, t) => sum + t.masteryScore, 0) / roadmap.length)
    : 0;
  const doneCount = roadmap.filter(t => t.status === 'done').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-brand-700">StudyPath</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Hi, {user?.name}</span>
          <button onClick={() => navigate('/subjects')} className="text-sm text-brand-600 font-medium hover:underline">
            Take an assessment
          </button>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-slate-700">
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Your dashboard</h1>

        <div className="flex gap-2 mb-8">
          {subjects.map(s => (
            <button
              key={s._id}
              onClick={() => setSelectedSubject(s._id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                selectedSubject === s._id
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500">Loading roadmap...</p>
        ) : roadmap.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="text-slate-600 mb-4">No assessment data yet for this subject.</p>
            <button
              onClick={() => navigate('/subjects')}
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-2 rounded-lg"
            >
              Take an assessment
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">Average mastery</p>
                <p className="text-2xl font-semibold text-slate-900">{avgMastery}%</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">Topics tracked</p>
                <p className="text-2xl font-semibold text-slate-900">{roadmap.length}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="text-sm text-slate-500 mb-1">Completed</p>
                <p className="text-2xl font-semibold text-slate-900">{doneCount}/{roadmap.length}</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">Your roadmap</h2>
            <div className="space-y-3">
              {roadmap.map((t) => (
                <div key={t.topicId} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeColor[t.classification]}`}>
                        {t.classification}
                      </span>
                      <span className="text-sm text-slate-500">{t.masteryScore}% mastery</span>
                    </div>
                    <p className="text-sm text-slate-600 capitalize">{t.activityType.replace('-', ' ')}</p>
                  </div>
                  {t.status === 'done' ? (
                    <span className="text-sm text-green-600 font-medium">Completed</span>
                  ) : (
                    <button
                      onClick={() => markDone(t.topicId)}
                      className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-1.5 rounded-lg"
                    >
                      Mark as done
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}