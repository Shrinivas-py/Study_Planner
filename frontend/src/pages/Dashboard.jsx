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

  const badgeStyle = {
    weak: 'bg-clay-50 text-clay-600 border-clay-400/30',
    moderate: 'bg-gold-50 text-gold-600 border-gold-400/30',
    strong: 'bg-moss-50 text-moss-600 border-moss-400/30',
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
    <div className="min-h-screen bg-paper font-sans text-ink">
      <nav className="bg-paper/90 backdrop-blur border-b border-ink/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-moss-500 flex items-center justify-center">
            <span className="font-display text-white text-sm font-bold">S</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">StudyPath</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-ink-400 hidden sm:inline">Hi, {user?.name}</span>
          <button onClick={() => navigate('/subjects')} className="text-sm text-moss-600 font-medium hover:text-moss-700">
            Take an assessment
          </button>
          <button onClick={handleLogout} className="text-sm text-ink-400 hover:text-ink-600">
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs font-semibold tracking-widest text-moss-600 uppercase mb-2">Dashboard</p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-1">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-ink-400 mb-8">Here's where your learning path stands today.</p>

        <div className="flex gap-2 mb-10 flex-wrap">
          {subjects.map(s => (
            <button
              key={s._id}
              onClick={() => setSelectedSubject(s._id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedSubject === s._id
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-white text-ink-600 border-ink/15 hover:border-ink/30'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-ink/10 rounded-2xl p-5 h-20 animate-pulse" />
            ))}
          </div>
        ) : roadmap.length === 0 ? (
          <div className="bg-white border border-ink/10 rounded-2xl p-12 text-center">
            <p className="font-display text-lg font-semibold text-ink mb-1">No roadmap yet</p>
            <p className="text-ink-400 mb-5">Take a short assessment and we'll map out exactly what to study next.</p>
            <button
              onClick={() => navigate('/subjects')}
              className="bg-moss-500 hover:bg-moss-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Take an assessment
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-stretch bg-white border border-ink/10 rounded-2xl mb-10 overflow-hidden">
              <div className="flex-1 px-6 py-5">
                <p className="text-xs text-ink-400 mb-1">Overall progress</p>
                <p className="font-display text-2xl font-semibold text-ink">{progressPct}%</p>
              </div>
              <div className="w-px bg-ink/10" />
              <div className="flex-1 px-6 py-5">
                <p className="text-xs text-ink-400 mb-1">Topics done</p>
                <p className="font-display text-2xl font-semibold text-ink">{doneCount}<span className="text-ink-400 text-base font-normal"> / {roadmap.length}</span></p>
              </div>
              <div className="w-px bg-ink/10" />
              <div className="flex-1 px-6 py-5">
                <p className="text-xs text-ink-400 mb-1">Avg. mastery</p>
                <p className="font-display text-2xl font-semibold text-ink">{avgMastery}%</p>
              </div>
            </div>

            <h2 className="font-display text-lg font-semibold text-ink mb-1">Your learning path</h2>
            <p className="text-sm text-ink-400 mb-6">Follow it in order — each step builds on the last.</p>

            <div className="relative">
              <div className="absolute left-[25px] top-3 bottom-3 w-px bg-ink/10" aria-hidden="true" />
              <div className="space-y-3">
                {roadmap.map((t, i) => (
                  <div key={t.topicId} className="relative flex items-center gap-5 pl-0">
                    <div className="relative z-10 shrink-0 bg-paper">
                      <MasteryRing score={t.masteryScore} />
                    </div>

                    <div className="flex-1 min-w-0 bg-white border border-ink/10 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-ink/20 transition-colors">
                      <span className="font-display text-xs text-ink-400/70 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>

                      <div className="flex-1 min-w-0">
                        <div className="mb-1">
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeStyle[t.classification]}`}>
                            {t.classification}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/practice/${t.topicId}?subjectId=${selectedSubject}`)}
                          className="text-sm text-ink font-medium hover:text-moss-600 transition-colors"
                        >
                          {activityLabel[t.activityType] || t.activityType} →
                        </button>
                      </div>

                      {t.status === 'done' ? (
                        <span className="text-sm text-moss-600 font-medium flex items-center gap-1 shrink-0">
                          ✓ Done
                        </span>
                      ) : (
                        <button
                          onClick={() => markDone(t.topicId)}
                          className="text-sm bg-paper hover:bg-ink/5 text-ink-600 font-medium px-4 py-1.5 rounded-lg shrink-0 border border-ink/10 transition-colors"
                        >
                          Mark as done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}