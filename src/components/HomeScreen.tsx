import {
  Camera,
  Globe2,
  Images,
  MapPin,
  MessageCircle,
  Settings,
  ShieldAlert,
  Store,
} from 'lucide-react';
import AppIcon from './AppIcon';
import ProgressBars from './ProgressBars';
import { useGame } from '../context/GameContext';
import { PHASES } from '../data/mockData';

export default function HomeScreen() {
  const { openApp, state } = useGame();
  const phase = PHASES.find((p) => p.id === state.currentPhase)!;

  return (
    <div className="flex-1 flex flex-col px-5 pb-3 overflow-y-auto">
      <div className="mt-3 mb-4">
        <div className="text-[11px] uppercase tracking-widest text-cyan-300/80 font-bold">
          Patrulha Digital
        </div>
        <div className="text-lg font-bold text-white leading-tight">
          Fase {phase.id}: {phase.title}
        </div>
        <div className="text-xs text-white/60 mt-0.5">
          BNCC {phase.code} · Toque na Central da Patrulha para detalhes
        </div>
      </div>

      <ProgressBars />

      <div className="grid grid-cols-4 gap-4 mt-5">
        <AppIcon
          label="Central"
          Icon={ShieldAlert}
          color="bg-gradient-to-br from-cyan-500 to-patrol-600"
          glow
          badge={1}
          onClick={() => openApp('mission')}
        />
        <AppIcon
          label="Chat"
          Icon={MessageCircle}
          color="bg-gradient-to-br from-emerald-500 to-emerald-700"
          badge={state.currentPhase === 1 ? 4 : 0}
          onClick={() => openApp('chat')}
        />
        <AppIcon
          label="Rede Social"
          Icon={Camera}
          color="bg-gradient-to-br from-pink-500 to-fuchsia-700"
          badge={state.currentPhase <= 2 ? 1 : 0}
          onClick={() => openApp('social')}
        />
        <AppIcon
          label="Galeria"
          Icon={Images}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          badge={state.currentPhase === 5 ? 5 : 0}
          onClick={() => openApp('gallery')}
        />
        <AppIcon
          label="Configurações"
          Icon={Settings}
          color="bg-gradient-to-br from-slate-500 to-slate-700"
          badge={state.currentPhase === 4 ? 6 : 0}
          onClick={() => openApp('settings')}
        />
        <AppIcon
          label="Navegador"
          Icon={Globe2}
          color="bg-gradient-to-br from-sky-500 to-blue-700"
          badge={state.currentPhase === 3 ? 1 : 0}
          onClick={() => openApp('browser')}
        />
        <AppIcon
          label="Loja Apps"
          Icon={Store}
          color="bg-gradient-to-br from-indigo-500 to-violet-700"
          onClick={() => openApp('appstore')}
        />
        <AppIcon
          label="Mapa Rastros"
          Icon={MapPin}
          color="bg-gradient-to-br from-rose-500 to-red-700"
          onClick={() => openApp('tracemap')}
        />
      </div>

      <div className="mt-auto pt-4 text-center text-[11px] text-white/40">
        Pegada Digital atual: {state.pegadaDigital}/100
      </div>
    </div>
  );
}
