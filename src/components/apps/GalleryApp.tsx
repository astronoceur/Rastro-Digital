import { ChevronLeft, Scan, ScanSearch } from 'lucide-react';
import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { GALLERY_IMAGES } from '../../data/mockData';
import { GalleryImage } from '../../types';

const ACTIONS: Record<string, { label: string; emoji: string }> = {
  ask: { label: 'Pedir autorização', emoji: '🙋' },
  blur: { label: 'Borrar rostos', emoji: '🌫' },
  credits: { label: 'Adicionar créditos', emoji: '✍️' },
  replace: { label: 'Substituir por imagem livre', emoji: '🔄' },
  remove: { label: 'Remover do trabalho', emoji: '🗑' },
  use: { label: 'Usar como está', emoji: '✅' },
};

export default function GalleryApp() {
  const { state, useDetector, decideImage } = useGame();
  const [open, setOpen] = useState<GalleryImage | null>(null);

  if (open) {
    const wasDetected = state.phase5.detectorUsed.includes(open.id);
    const decision = state.phase5.imageDecisions[open.id];
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <MissionBanner title={open.name} onBack={() => setOpen(null)} />
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="aspect-square bg-gradient-to-br from-amber-500/30 to-orange-600/30 rounded-2xl flex items-center justify-center text-9xl border border-white/10">
            {open.emoji}
          </div>

          {!wasDetected ? (
            <button
              onClick={() => useDetector(open.id)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ScanSearch size={16} /> Usar Detector de Imagem
            </button>
          ) : (
            <div className="app-card p-3 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300 text-[10px] font-bold uppercase tracking-widest">
                <Scan size={12} /> Resultado do Detector
              </div>
              <div className="text-sm text-white">
                <span className="text-white/60">Origem:</span> {open.source}
              </div>
              <div className="text-sm text-white">
                <span className="text-white/60">Direitos:</span> {open.rights}
              </div>
              <div className="text-[11px] text-amber-200">💡 {open.hint}</div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold px-1">
              Escolha a ação
            </div>
            {Object.entries(ACTIONS).map(([key, info]) => {
              const isValid = open.validActions.includes(key);
              const isChosen = decision === key;
              return (
                <button
                  key={key}
                  onClick={() =>
                    decideImage(open.id, isValid ? key : 'wrong', isValid)
                  }
                  disabled={isChosen && isValid}
                  className={`w-full text-left p-3 rounded-xl border transition active:scale-95 ${
                    isChosen && isValid
                      ? 'bg-emerald-500/20 border-emerald-400/40'
                      : isChosen
                        ? 'bg-rose-500/20 border-rose-400/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="text-sm text-white flex items-center gap-2">
                    <span className="text-lg">{info.emoji}</span>
                    {info.label}
                    {isChosen && isValid && (
                      <span className="ml-auto text-[10px] text-emerald-300 font-bold">
                        ESCOLHIDA
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Galeria" subtitle="Imagens para o trabalho" />
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-3 gap-2">
          {GALLERY_IMAGES.map((img) => {
            const detected = state.phase5.detectorUsed.includes(img.id);
            const decisionEntry = state.phase5.imageDecisions[img.id];
            const isCorrect = decisionEntry && decisionEntry !== 'wrong';
            return (
              <button
                key={img.id}
                onClick={() => setOpen(img)}
                className="relative aspect-square rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex flex-col items-center justify-center text-5xl hover:bg-white/15 transition"
              >
                <span>{img.emoji}</span>
                <div className="absolute bottom-1 left-1 right-1 text-[9px] text-white/80 truncate text-center font-medium">
                  {img.name}
                </div>
                {isCorrect && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                    ✓
                  </div>
                )}
                {detected && !isCorrect && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center">
                    !
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="text-[11px] text-white/60 mt-4 px-1">
          Toque em cada imagem para analisar com o Detector e escolher a ação correta.
        </div>
      </div>
    </div>
  );
}
