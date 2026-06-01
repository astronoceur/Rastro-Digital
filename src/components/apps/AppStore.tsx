import { useState } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { STORE_APPS } from '../../data/mockData';

export default function AppStore() {
  const { showFeedback, applyEffect } = useGame();
  const app = STORE_APPS[0];
  const [decisions, setDecisions] = useState<Record<string, boolean | null>>({});

  const decide = (id: string, accept: boolean, needed: boolean) => {
    setDecisions((d) => ({ ...d, [id]: accept }));
    if (accept && needed) {
      applyEffect({ pegada: -2, seguranca: 3 });
    } else if (accept && !needed) {
      applyEffect({ pegada: 5, privacidade: -4 });
      showFeedback({
        type: 'bad',
        title: 'Permissão desnecessária aceita',
        message: 'Esse acesso não é necessário para o app funcionar. Atenção a esse padrão.',
      });
    } else if (!accept && needed) {
      applyEffect({ pegada: 1 });
      showFeedback({
        type: 'info',
        title: 'Recusou uma permissão essencial',
        message: 'Sem isso o app pode não funcionar. Avalie caso a caso.',
      });
    } else {
      applyEffect({ pegada: -3, privacidade: 4 });
      showFeedback({
        type: 'good',
        title: 'Permissão excessiva recusada',
        message: 'Você acabou de bloquear um acesso que não deveria existir.',
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Loja de Apps" subtitle="Treine suas permissões" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="app-card p-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-700 flex items-center justify-center text-3xl">
            {app.icon}
          </div>
          <div className="flex-1">
            <div className="text-white font-bold">{app.name}</div>
            <div className="text-xs text-white/70 mt-0.5">{app.description}</div>
          </div>
          <div className="flex items-center gap-1 text-amber-300 text-xs">
            <AlertTriangle size={14} /> 4 permissões
          </div>
        </div>

        <div className="space-y-2">
          {app.permissions.map((p) => {
            const decided = decisions[p.id];
            return (
              <div
                key={p.id}
                className={`app-card p-3 ${
                  decided === true && !p.needed
                    ? 'border-rose-400/40'
                    : decided === false && !p.needed
                      ? 'border-emerald-400/40'
                      : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="text-sm text-white font-semibold">{p.label}</div>
                    <div className="text-[11px] text-white/65 mt-0.5">{p.reason}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => decide(p.id, false, p.needed)}
                    disabled={decided !== undefined && decided !== null}
                    className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1 disabled:opacity-60"
                  >
                    <X size={12} /> Negar
                  </button>
                  <button
                    onClick={() => decide(p.id, true, p.needed)}
                    disabled={decided !== undefined && decided !== null}
                    className="btn-primary flex-1 text-xs flex items-center justify-center gap-1 disabled:opacity-60"
                  >
                    <Check size={12} /> Permitir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-[11px] text-white/50 px-1">
          App opcional — bom para praticar avaliação de permissões em qualquer fase.
        </div>
      </div>
    </div>
  );
}
