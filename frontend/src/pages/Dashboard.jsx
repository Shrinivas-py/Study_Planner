import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import MasteryRing from '../components/MasteryRing';

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
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

  const activityLabel = {
    'concept-revision': 'Revisit the concept',
    'mixed-practice': 'Mixed practice set',
    'advanced-challenge': 'Advanced challenge',
  };

  const avgMastery = roadmap.length
    ? Math.round(roadmap.reduce((sum, t) => sum + t.masteryScore, 0) / roadmap.length)
    : 0;
  const doneCount = roadmap.filter(t => t.status === 'done').length;
  const progressPct = roadmap.length ? Math.round((doneCount / roadmap.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50/30 to-white">
      <nav className="bg-white/70 backdrop-blur-md border-b border-slate-200/70 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="text-xl font-bold text-brand-700">StudyPath</div>
        <div className="flex items-center gap-5">
          <span className="text-sm text-slate-600 hidden sm:inline">Hi, {user?.name}</span>
          <button onClick={() => navigate('/subjects')} className="text-sm text-brand-600 font-medium hover:underline">
            Take an assessment
          </button>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-slate-700">
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">Your dashboard</h1>
        <p className="text-slate-500 mb-6">Track your mastery and follow your personalized roadmap.</p>

        <div className="flex gap-2 mb-8">
          {subjects.map(s => (
            <button
              key={s._id}
              onClick={() => setSelectedSubject(s._id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
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
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 h-20 animate-pulse" />
            ))}
          </div>
        ) : roadmap.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
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
            {/* Overview card */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 mb-8 text-white flex items-center justify-between flex-wrap gap-6">
              <div>
                <p className="text-brand-100 text-sm mb-1">Overall progress</p>
                <p className="text-3xl font-bold">{progressPct}% complete</p>
                <p className="text-brand-100 text-sm mt-1">{doneCount} of {roadmap.length} topics done</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-brand-100 text-xs mb-1">Avg. mastery</p>
                  <p className="text-2xl font-semibold">{avgMastery}%</p>
                </div>
                <div>
                  <p className="text-brand-100 text-xs mb-1">Topics tracked</p>
                  <p className="text-2xl font-semibold">{roadmap.length}</p>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">Your roadmap</h2>
            <div className="space-y-3">
              {roadmap.map((t) => (
                <div
                  key={t.topicId}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-5 hover:shadow-sm transition-shadow"
                >
                  <MasteryRing score={t.masteryScore} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeColor[t.classification]}`}>
                        {t.classification}
                      </span>
                    </div>
                    <button
  onClick={() => navigate(`/practice/${t.topicId}?subjectId=${selectedSubject}`)}
  className="text-sm text-brand-600 font-medium hover:underline"
>
  {activityLabel[t.activityType] || t.activityType} →
</button>
                  </div>

                  {t.status === 'done' ? (
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1 shrink-0">
                      ✓ Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => markDone(t.topicId)}
                      className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-1.5 rounded-lg shrink-0"
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