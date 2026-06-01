import { ReactNode } from 'react';
import { useGame } from '../context/GameContext';

interface Props {
  children: ReactNode;
}

export default function PhoneFrame({ children }: Props) {
  const { state } = useGame();
  const danger = state.pegadaDigital >= 60;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-6">
      <div className="relative">
        {/* shadow glow */}
        <div
          className={`absolute inset-0 -m-6 rounded-[3.2rem] blur-3xl transition-opacity duration-500 ${
            danger
              ? 'bg-rose-500/20 animate-pulse-slow'
              : 'bg-cyan-500/20'
          }`}
        />
        <div className="relative w-[390px] max-w-[100vw] h-[844px] max-h-[100vh] bg-black rounded-[3rem] p-3 shadow-2xl shadow-black/60 border border-white/10">
          {/* notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/20 mr-2" />
            <div className="w-12 h-1.5 rounded-full bg-white/10" />
          </div>
          <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-patrol-950 via-patrol-900 to-shadow-dark">
            {/* shadow veil grows with pegada digital */}
            <div
              className="absolute inset-0 shadow-veil z-10 transition-opacity duration-500"
              style={{ opacity: state.pegadaDigital / 200 + 0.05 }}
            />
            {danger && (
              <div className="absolute inset-0 pointer-events-none z-10 bg-rose-500/5 animate-pulse-slow" />
            )}
            <div className="relative z-20 h-full flex flex-col">{children}</div>
          </div>
          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
