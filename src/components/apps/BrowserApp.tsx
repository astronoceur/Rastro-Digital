import { Check, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { SHINECAM_TERMS } from '../../data/mockData';

export default function BrowserApp() {
  const { state, highlightClause, decideTerms } = useGame();
  const [lupaOn, setLupaOn] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);

  const highlighted = state.phase3.highlightedClauses;
  const dangerousFoundCount = SHINECAM_TERMS.filter(
    (c) => c.dangerous && highlighted.includes(c.id),
  ).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Termos de Uso" subtitle="shinecam.fake/legal" />
      <div className="px-3 pt-2 flex items-center gap-2">
        <button
          onClick={() => setLupaOn((v) => !v)}
          className={`${
            lupaOn ? 'btn-primary' : 'btn-ghost'
          } flex items-center gap-2 text-sm`}
        >
          <Search size={14} />
          Lupa de Termos {lupaOn ? 'ON' : 'OFF'}
        </button>
        <div className="text-xs text-white/70 ml-auto">
          Identificadas: <span className="text-cyan-300 font-bold">{dangerousFoundCount}</span>/5
        </div>
      </div>

      {lupaOn && (
        <div className="mx-3 mt-2 app-card p-2 border-cyan-400/30 bg-cyan-400/5 text-[11px] text-white/80">
          Lupa ativa: toque em cada cláusula para analisar. Cláusulas abusivas ficam marcadas em
          amarelo.
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="app-card p-4">
          <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold">
            ShineCam · Termos de Uso
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Leia antes de aceitar
          </h2>
        </div>

        {SHINECAM_TERMS.map((c, idx) => {
          const isHighlighted = highlighted.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => {
                if (lupaOn) {
                  highlightClause(c.id, c.dangerous);
                  setHoverInfo(c.id);
                }
              }}
              disabled={!lupaOn || isHighlighted}
              className={`w-full text-left p-3 rounded-xl border transition ${
                isHighlighted
                  ? c.dangerous
                    ? 'bg-amber-400/15 border-amber-400/40'
                    : 'bg-rose-500/10 border-rose-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } ${lupaOn && !isHighlighted ? 'cursor-zoom-in' : ''}`}
            >
              <div className="text-[10px] text-white/40 mb-1">Cláusula {idx + 1}</div>
              <p
                className={`text-sm leading-relaxed ${
                  isHighlighted && c.dangerous ? 'text-amber-100' : 'text-white/90'
                }`}
              >
                {c.text}
              </p>
              {isHighlighted && (
                <div
                  className={`mt-2 text-[11px] ${
                    c.dangerous ? 'text-amber-200' : 'text-rose-200'
                  }`}
                >
                  {c.dangerous ? '⚠ ' : '✗ '}
                  {c.explanation}
                </div>
              )}
            </button>
          );
        })}

        <div className="app-card p-3">
          <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">
            Decisão final
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => decideTerms('reject')}
              disabled={state.phase3.decision !== null}
              className={`flex-1 btn-danger text-sm disabled:opacity-60 flex items-center justify-center gap-1.5`}
            >
              <X size={14} /> Rejeitar termos
            </button>
            <button
              onClick={() => decideTerms('accept')}
              disabled={state.phase3.decision !== null}
              className={`flex-1 btn-ghost text-sm disabled:opacity-60 flex items-center justify-center gap-1.5`}
            >
              <Check size={14} /> Aceitar termos
            </button>
          </div>
          {state.phase3.decision === 'reject' && (
            <p className="text-[11px] text-emerald-300 mt-2">
              ✓ Termos recusados. Você está protegendo seus dados.
            </p>
          )}
          {state.phase3.decision === 'accept' && (
            <p className="text-[11px] text-rose-300 mt-2">
              ✗ Termos aceitos. A Sombra Online agora tem mais permissões.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
