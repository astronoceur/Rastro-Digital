import { CheckCircle2, Circle, Lightbulb, Shield, Target } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import ProgressBars from '../ProgressBars';
import { PHASES } from '../../data/mockData';

export default function MissionCenter() {
  const { state, phaseObjectivesStatus, isPhaseComplete, nextPhase } = useGame();
  const phase = PHASES.find((p) => p.id === state.currentPhase)!;
  const completed = Object.values(phaseObjectivesStatus).filter(Boolean).length;
  const total = phase.objectives.length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Central da Patrulha" subtitle={`BNCC ${phase.code}`} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="app-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-cyan-300" />
            <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold">
              Fase {phase.id} de 5
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-white leading-tight">
            {phase.title}
          </h2>
          <p className="text-sm text-white/80 mt-2 leading-relaxed">{phase.briefing}</p>
        </div>

        <div className="app-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-emerald-300" />
            <div className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
              Objetivos · {completed}/{total}
            </div>
          </div>
          <ul className="space-y-2.5">
            {phase.objectives.map((obj) => {
              const done = phaseObjectivesStatus[obj.id];
              return (
                <li key={obj.id} className="flex items-start gap-2.5">
                  {done ? (
                    <CheckCircle2
                      size={18}
                      className="text-emerald-400 shrink-0 mt-0.5"
                    />
                  ) : (
                    <Circle size={18} className="text-white/40 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm leading-snug ${
                      done ? 'text-white/50 line-through' : 'text-white/90'
                    }`}
                  >
                    {obj.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="app-card p-4 border-amber-400/20 bg-amber-400/5">
          <div className="flex items-start gap-2.5">
            <Lightbulb size={18} className="text-amber-300 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                Dica da Patrulha
              </div>
              <p className="text-sm text-white/85 mt-1 leading-relaxed">
                {phase.hint}
              </p>
            </div>
          </div>
        </div>

        <ProgressBars />

        {isPhaseComplete && (
          <button onClick={nextPhase} className="btn-primary w-full">
            {state.currentPhase < 5 ? 'Concluir e avançar' : 'Confrontar a Sombra Online'}
          </button>
        )}
      </div>
    </div>
  );
}
