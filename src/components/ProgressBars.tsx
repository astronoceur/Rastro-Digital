import { Eye, Lock, Scale, ShieldOff } from 'lucide-react';
import { useGame } from '../context/GameContext';

function Bar({
  icon,
  label,
  value,
  color,
  invert,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  invert?: boolean;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 text-[10px] text-white/70 font-semibold mb-1">
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
        <span className="ml-auto text-white/90">{Math.round(value)}</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      {invert && (
        <div className="text-[9px] text-white/40 mt-0.5">menor = melhor</div>
      )}
    </div>
  );
}

export default function ProgressBars() {
  const { state } = useGame();
  const pegadaColor =
    state.pegadaDigital >= 60
      ? 'bg-gradient-to-r from-rose-500 to-red-600'
      : state.pegadaDigital >= 30
        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
        : 'bg-gradient-to-r from-emerald-400 to-emerald-600';

  return (
    <div className="app-card p-3 space-y-3">
      <Bar
        icon={<ShieldOff size={11} className="text-rose-300" />}
        label="Pegada Digital"
        value={state.pegadaDigital}
        color={pegadaColor}
        invert
      />
      <div className="flex gap-3">
        <Bar
          icon={<Lock size={11} className="text-cyan-300" />}
          label="Privacidade"
          value={state.indicators.privacidade}
          color="bg-gradient-to-r from-cyan-400 to-sky-500"
        />
        <Bar
          icon={<Eye size={11} className="text-violet-300" />}
          label="Segurança"
          value={state.indicators.seguranca}
          color="bg-gradient-to-r from-violet-400 to-fuchsia-500"
        />
        <Bar
          icon={<Scale size={11} className="text-emerald-300" />}
          label="Ética"
          value={state.indicators.etica}
          color="bg-gradient-to-r from-emerald-400 to-teal-500"
        />
      </div>
    </div>
  );
}
