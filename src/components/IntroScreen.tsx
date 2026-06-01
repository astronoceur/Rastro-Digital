import { Eye, ShieldCheck } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function IntroScreen() {
  const { startGame } = useGame();
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-fuchsia-700/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/30 blur-3xl" />
      <div className="relative">
        <div className="relative inline-block">
          <Eye size={72} className="text-rose-400 animate-glitch" />
          <div className="absolute -inset-3 rounded-full border border-rose-500/40 animate-ping" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-rose-300 font-bold mt-3">
          Sombra Online detectada
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-1 leading-tight glow-text">
          Rastros Digitais
        </h1>
        <div className="text-sm text-white/70">O Caso da Sombra Online</div>
        <p className="text-xs text-white/70 mt-5 max-w-xs leading-relaxed">
          Você faz parte da <span className="text-cyan-300 font-semibold">Patrulha Digital</span>.
          Sua missão: navegar pelos apps deste celular, investigar pistas e reduzir a pegada
          digital da escola — antes que a Sombra Online cresça.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wider text-white/70">
          <div className="app-card p-2">
            <ShieldCheck size={14} className="mx-auto text-cyan-300 mb-1" />
            5 fases
          </div>
          <div className="app-card p-2">
            <ShieldCheck size={14} className="mx-auto text-cyan-300 mb-1" />
            8 apps
          </div>
          <div className="app-card p-2">
            <ShieldCheck size={14} className="mx-auto text-cyan-300 mb-1" />
            BNCC
          </div>
        </div>
        <button onClick={startGame} className="btn-primary mt-7 w-full max-w-xs">
          Iniciar investigação
        </button>
      </div>
    </div>
  );
}
