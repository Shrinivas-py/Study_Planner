import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function Practice() {
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subjectId');
  const navigate = useNavigate();

  const [assessmentId, setAssessmentId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.post('/assessments/start', { subjectId, grade: 10, topicId })
      .then(res => {
        setAssessmentId(res.data.assessmentId);
        setQuestions(res.data.questions);
      })
      .finally(() => setLoading(false));
  }, []);

  const selectAnswer = (questionId, index) => {
    setAnswers({ ...answers, [questionId]: index });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const answerList = Object.entries(answers).map(([questionId, selectedAnswerIndex]) => ({
      questionId,
      selectedAnswerIndex,
    }));
    try {
      const res = await api.post(`/assessments/${assessmentId}/submit`, { answers: answerList });
      setResult(res.data);
    } catch (err) {
      alert('Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Loading practice questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-center px-6">
        <div>
          <p className="text-slate-600 mb-4">No more questions available for this topic right now.</p>
          <button onClick={() => navigate('/dashboard')} className="text-brand-600 font-medium hover:underline">
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-1">Practice complete</h2>
          <p className="text-5xl font-bold text-brand-600 my-4">{result.score}%</p>
          <p className="text-slate-500 mb-6">{result.correctCount} out of {result.total} correct</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg"
          >
            Back to roadmap
          </button>
        </div>
      </div>
    );
  }

  const allAnswered = questions.every(q => answers[q._id] !== undefined);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Practice questions</h1>
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q._id} className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="font-medium text-slate-900 mb-4">{idx + 1}. {q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-2.5 cursor-pointer ${
                      answers[q._id] === i ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q._id}
                      checked={answers[q._id] === i}
                      onChange={() => selectAnswer(q._id, i)}
                      className="accent-brand-600"
                    />
                    <span className="text-sm text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="w-full mt-8 bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-lg disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit practice'}
        </button>
      </div>
    </div>
  );
}