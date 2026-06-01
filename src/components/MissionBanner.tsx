import { ChevronLeft, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { PHASES } from '../data/mockData';

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function MissionBanner({ title, subtitle, onBack }: Props) {
  const { closeApp, state, phaseObjectivesStatus } = useGame();
  const phase = PHASES.find((p) => p.id === state.currentPhase)!;
  const completed = Object.values(phaseObjectivesStatus).filter(Boolean).length;
  const total = phase.objectives.length;

  return (
    <div className="bg-black/40 border-b border-white/10 px-3 pt-2 pb-2.5">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack || closeApp}
          className="p-1.5 rounded-lg hover:bg-white/10 active:scale-95 transition"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-white truncate">{title}</div>
          {subtitle && (
            <div className="text-[11px] text-white/60 truncate">{subtitle}</div>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-semibold bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded-full">
          <Target size={11} />
          {completed}/{total}
        </div>
      </div>
    </div>
  );
}
