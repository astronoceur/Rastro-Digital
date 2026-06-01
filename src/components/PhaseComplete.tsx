import { Sparkles, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { PHASES } from '../data/mockData';

export default function PhaseComplete() {
  const { state, isPhaseComplete, nextPhase } = useGame();
  if (!isPhaseComplete) return null;
  const phase = PHASES.find((p) => p.id === state.currentPhase)!;

  return (
    <div className="absolute inset-0 z-40 bg-gradient-to-br from-emerald-900/95 via-patrol-900/95 to-patrol-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="relative">
        <Trophy size={64} className="text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" />
        <Sparkles
          size={20}
          className="absolute -top-2 -right-2 text-yellow-200 animate-pulse"
        />
      </div>
      <div className="mt-4 text-[11px] uppercase tracking-widest text-emerald-300 font-bold">
        Fase concluída
      </div>
      <h2 className="text-2xl font-extrabold text-white text-center mt-1">
        {phase.title}
      </h2>
      <p className="text-white/80 text-center mt-3 max-w-xs text-sm leading-relaxed">
        {state.currentPhase === 1 &&
          'Você protegeu a turma de uma exposição perigosa. Compartilhar é uma decisão coletiva.'}
        {state.currentPhase === 2 &&
          'Dados pessoais agora estão protegidos. Quanto menos rastros públicos, melhor.'}
        {state.currentPhase === 3 &&
          'Você leu, identificou e recusou termos abusivos. Aceitar nunca é automático.'}
        {state.currentPhase === 4 &&
          'O perfil está blindado. A Sombra Online não vai entrar tão fácil agora.'}
        {state.currentPhase === 5 &&
          'Cada imagem foi tratada com respeito à autoria e ao direito de imagem.'}
      </p>
      <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-xs">
        <div className="app-card p-3 text-center">
          <div className="text-[10px] text-white/60 uppercase">Privacidade</div>
          <div className="text-xl font-bold text-cyan-300">
            {Math.round(state.indicators.privacidade)}
          </div>
        </div>
        <div className="app-card p-3 text-center">
          <div className="text-[10px] text-white/60 uppercase">Segurança</div>
          <div className="text-xl font-bold text-violet-300">
            {Math.round(state.indicators.seguranca)}
          </div>
        </div>
        <div className="app-card p-3 text-center">
          <div className="text-[10px] text-white/60 uppercase">Ética</div>
          <div className="text-xl font-bold text-emerald-300">
            {Math.round(state.indicators.etica)}
          </div>
        </div>
      </div>
      <button onClick={nextPhase} className="btn-primary mt-7 w-full max-w-xs">
        {state.currentPhase < 5 ? 'Próxima fase' : 'Enfrentar a Sombra Online'}
      </button>
    </div>
  );
}
