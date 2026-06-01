import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function FeedbackModal() {
  const { state, hideFeedback } = useGame();
  if (!state.feedback) return null;
  const { type, title, message } = state.feedback;

  const config =
    type === 'good'
      ? {
          Icon: CheckCircle2,
          color: 'from-emerald-500 to-teal-600',
          tag: 'Boa escolha',
        }
      : type === 'bad'
        ? {
            Icon: XCircle,
            color: 'from-rose-500 to-red-600',
            tag: 'Reveja a decisão',
          }
        : {
            Icon: Info,
            color: 'from-sky-500 to-cyan-600',
            tag: 'Análise da Patrulha',
          };

  const { Icon } = config;

  return (
    <div className="absolute inset-0 z-50 flex items-end animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={hideFeedback}
      />
      <div className="relative w-full p-4 animate-slide-up">
        <div className="bg-patrol-900/95 border border-white/15 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shrink-0`}
            >
              <Icon className="text-white" size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                {config.tag}
              </div>
              <div className="text-white font-bold text-base leading-tight mt-0.5">
                {title}
              </div>
              <p className="text-sm text-white/80 mt-2 leading-relaxed">{message}</p>
            </div>
          </div>
          <button
            onClick={hideFeedback}
            className="mt-4 w-full btn-primary"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
