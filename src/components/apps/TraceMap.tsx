import { Eye, Lock, MapPin, Scale, ShieldOff } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { PHASES } from '../../data/mockData';

export default function TraceMap() {
  const { state } = useGame();
  const traces: { label: string; ok: boolean; phase: number }[] = [
    {
      label: 'Foto da turma circulando',
      ok: state.phase1.postFixed || state.phase1.postDeleted,
      phase: 1,
    },
    {
      label: 'Perfil público com dados sensíveis',
      ok: state.phase2.profilePrivate,
      phase: 2,
    },
    {
      label: 'ShineCam com termos abusivos',
      ok: state.phase3.decision === 'reject',
      phase: 3,
    },
    {
      label: 'Conta sem 2FA / senha fraca',
      ok: state.phase4.twoFA && state.phase4.passwordStrong,
      phase: 4,
    },
    {
      label: 'Imagens de terceiros sem checagem',
      ok: state.phase5.detectorUsed.length >= 5,
      phase: 5,
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Mapa de Rastros" subtitle="Riscos detectados" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Card
            icon={<Lock size={18} />}
            label="Privacidade"
            value={state.indicators.privacidade}
          />
          <Card
            icon={<Eye size={18} />}
            label="Segurança"
            value={state.indicators.seguranca}
          />
          <Card
            icon={<Scale size={18} />}
            label="Ética"
            value={state.indicators.etica}
          />
        </div>
        <div className="app-card p-3">
          <div className="flex items-center gap-2 text-rose-300 mb-2">
            <ShieldOff size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Pegada digital atual
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {state.pegadaDigital}
            <span className="text-base text-white/50">/100</span>
          </div>
          <div className="text-[11px] text-white/60 mt-1">
            Quanto menor, mais protegida está a turma.
          </div>
        </div>
        <div className="app-card p-3">
          <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">
            Rastros encontrados
          </div>
          <ul className="space-y-2">
            {traces.map((t, i) => {
              const phase = PHASES.find((p) => p.id === t.phase)!;
              return (
                <li
                  key={i}
                  className={`flex items-start gap-2 p-2 rounded-lg ${
                    t.ok
                      ? 'bg-emerald-500/10 border border-emerald-400/20'
                      : 'bg-rose-500/10 border border-rose-400/20'
                  }`}
                >
                  <MapPin
                    size={14}
                    className={t.ok ? 'text-emerald-300' : 'text-rose-300'}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white font-semibold">{t.label}</div>
                    <div className="text-[10px] text-white/60">
                      Fase {phase.id} · {phase.title}
                    </div>
                  </div>
                  <div
                    className={`text-[10px] font-bold ${
                      t.ok ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {t.ok ? 'RESOLVIDO' : 'EM ABERTO'}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="app-card p-3">
      <div className="flex items-center gap-1 text-white/70 mb-1">{icon}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">
        {label}
      </div>
      <div className="text-xl font-bold text-white">{Math.round(value)}</div>
    </div>
  );
}
