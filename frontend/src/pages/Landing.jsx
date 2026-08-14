import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-mesh bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[length:32px_32px]" />

      <nav className="relative px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-slate-900 text-sm font-black">S</div>
          StudyPlanner
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2">
            Log in
          </Link>
          <Link to="/register" className="text-sm font-medium bg-brand-500 hover:bg-brand-400 text-slate-900 px-4 py-2 rounded-lg">
            Get started
          </Link>
        </div>
      </nav>

      <div className="relative max-w-3xl mx-auto text-center px-6 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-brand-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
          Stop studying<br />
          <span className="text-brand-400">everything.</span> Study<br />
          what matters.
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10">
          One assessment tells us exactly where you stand. We turn that into a roadmap that reorders itself as you improve.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="bg-brand-500 hover:bg-brand-400 text-slate-900 font-semibold px-7 py-3.5 rounded-lg">
            Start your assessment
          </Link>
          <Link to="/login" className="border border-white/15 text-white font-medium px-7 py-3.5 rounded-lg hover:bg-white/5">
            Log in
          </Link>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pb-24 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
        {[
          { step: '01', title: 'Take an assessment', desc: 'A short quiz across the topics you\'re studying — no prep needed.' },
          { step: '02', title: 'See where you stand', desc: 'Every topic scored and classified as weak, moderate, or strong.' },
          { step: '03', title: 'Follow your roadmap', desc: 'A prioritized plan, reordered automatically as your scores change.' },
        ].map((f) => (
          <div key={f.step} className="bg-slate-900/40 p-8">
            <div className="text-brand-400 text-sm font-mono mb-3">{f.step}</div>
            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}