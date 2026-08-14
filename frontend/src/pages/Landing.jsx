import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold text-brand-700">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white text-xs font-black">S</div>
          StudyPath
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2">
            Log in
          </Link>
          <Link to="/register" className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg shadow-sm shadow-brand-600/30">
            Get started
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto text-center px-6 pt-16 pb-20">
        <div className="inline-block bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          Personalized learning, powered by your own data
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
          Study smarter with a roadmap<br />built just for you.
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10">
          Take a quick assessment. We'll identify your strengths and weak spots, then generate a study plan that adjusts as you improve.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm shadow-brand-600/30">
            Start free
          </Link>
          <Link to="/login" className="bg-white border border-slate-200 text-slate-700 font-medium px-6 py-3 rounded-lg hover:border-slate-300">
            Log in
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20 grid sm:grid-cols-3 gap-6">
        {[
          { icon: '🎯', title: 'Assess your level', desc: 'Take a short quiz across topics you\'re studying.' },
          { icon: '📊', title: 'See your gaps', desc: 'We identify what\'s strong, moderate, or weak — automatically.' },
          { icon: '🗺️', title: 'Follow your roadmap', desc: 'A prioritized plan that updates as your scores change.' },
        ].map((f) => (
          <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
            <p className="text-sm text-slate-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}