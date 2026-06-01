import { Eye, RotateCcw, ShieldCheck } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function FinalScreen() {
  const { state, resetGame } = useGame();
  const pegada = state.pegadaDigital;

  const result =
    pegada <= 30
      ? {
          title: 'Guardião(ã) da Privacidade',
          subtitle: 'A Sombra Online recuou totalmente.',
          color: 'from-emerald-500 to-cyan-500',
          tone: 'good' as const,
          message:
            'Você dominou cada aspecto da pegada digital: imagem, dados, termos, configurações e ética. A Patrulha está orgulhosa.',
        }
      : pegada <= 60
        ? {
            title: 'Investigador(a) Digital',
            subtitle: 'A Sombra Online enfraqueceu, mas resiste.',
            color: 'from-cyan-500 to-violet-500',
            tone: 'mid' as const,
            message:
              'Decisões boas dominaram, mas algumas escolhas deixaram rastros. Da próxima vez, revise termos e permissões antes de aceitar.',
          }
        : {
            title: 'Aprendiz da Patrulha Digital',
            subtitle: 'A Sombra Online ainda paira por aí.',
            color: 'from-rose-500 to-fuchsia-600',
            tone: 'bad' as const,
            message:
              'Você concluiu as missões, mas várias escolhas aumentaram sua pegada. Reler termos, ajustar privacidade e respeitar autoria muda tudo.',
          };

  return (
    <div className="flex-1 flex flex-col p-5 overflow-y-auto relative">
      {/* boss visual */}
      <div className="relative flex flex-col items-center justify-center mt-4 mb-4">
        <div className="relative">
          <div
            className={`w-44 h-44 rounded-full bg-gradient-to-br ${
              result.tone === 'good'
                ? 'from-cyan-500/30 to-emerald-500/30'
                : result.tone === 'mid'
                  ? 'from-violet-600/40 to-fuchsia-700/40'
                  : 'from-rose-700/60 to-shadow-dark animate-pulse-slow'
            } flex items-center justify-center border border-white/10`}
            style={{
              boxShadow:
                result.tone === 'bad'
                  ? '0 0 80px rgba(244, 63, 94, 0.5)'
                  : '0 0 80px rgba(34, 211, 238, 0.45)',
            }}
          >
            {result.tone === 'good' ? (
              <ShieldCheck size={88} className="text-emerald-200" />
            ) : (
              <div className="relative">
                <Eye
                  size={88}
                  className={
                    result.tone === 'bad'
                      ? 'text-rose-200 animate-glitch'
                      : 'text-violet-200'
                  }
                />
              </div>
            )}
          </div>
          {result.tone === 'bad' && (
            <div className="absolute -inset-6 rounded-full border border-rose-500/30 animate-ping" />
          )}
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-widest text-white/60 font-bold">
          {result.tone === 'good'
            ? 'Sombra Online derrotada'
            : result.tone === 'mid'
              ? 'Sombra Online enfraquecida'
              : 'Sombra Online resistente'}
        </div>
      </div>

      <div
        className={`mx-auto px-3 py-1 rounded-full bg-gradient-to-r ${result.color} text-white text-xs font-bold uppercase tracking-wider`}
      >
        Você é
      </div>
      <h1 className="text-3xl font-extrabold text-white text-center mt-2 glow-text">
        {result.title}
      </h1>
      <p className="text-center text-white/70 text-sm mt-1">{result.subtitle}</p>

      <div className="app-card p-4 mt-5">
        <p className="text-sm text-white/85 leading-relaxed">{result.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="app-card p-3">
          <div className="text-[10px] uppercase text-white/60">Pegada Digital</div>
          <div className="text-2xl font-bold text-white">{Math.round(pegada)}/100</div>
        </div>
        <div className="app-card p-3">
          <div className="text-[10px] uppercase text-white/60">Privacidade</div>
          <div className="text-2xl font-bold text-cyan-300">
            {Math.round(state.indicators.privacidade)}
          </div>
        </div>
        <div className="app-card p-3">
          <div className="text-[10px] uppercase text-white/60">Segurança</div>
          <div className="text-2xl font-bold text-violet-300">
            {Math.round(state.indicators.seguranca)}
          </div>
        </div>
        <div className="app-card p-3">
          <div className="text-[10px] uppercase text-white/60">Ética Digital</div>
          <div className="text-2xl font-bold text-emerald-300">
            {Math.round(state.indicators.etica)}
          </div>
        </div>
      </div>

      <button onClick={resetGame} className="btn-primary mt-5 flex items-center justify-center gap-2">
        <RotateCcw size={16} />
        Jogar novamente
      </button>
    </div>
  );
}
