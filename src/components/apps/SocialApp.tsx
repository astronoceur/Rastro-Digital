import {
  Eye,
  EyeOff,
  Heart,
  Lock,
  MapPin,
  MessageSquare,
  Scan,
  ScanLine,
  Trash2,
  UserCheck,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { PUBLIC_PROFILE, VIRAL_POST } from '../../data/mockData';

export default function SocialApp() {
  const { state } = useGame();
  if (state.currentPhase === 1) return <Phase1Post />;
  if (state.currentPhase === 2) return <Phase2Profile />;
  return <PostFeed />;
}

// ============== PHASE 1 ==============
function Phase1Post() {
  const {
    state,
    taggedState,
    removePostLocation,
    blurFace,
    askAuthorization,
    deletePost,
    republishSafely,
  } = useGame();
  const phase1 = state.phase1;
  const hasLocation = !phase1.locationRemoved;
  const postDeleted = phase1.postDeleted;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Rede Social" subtitle="Investigando postagem" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {postDeleted ? (
          <div className="app-card p-6 text-center">
            <Trash2 size={36} className="text-emerald-400 mx-auto mb-2" />
            <div className="text-white font-bold">Postagem apagada</div>
            <p className="text-sm text-white/70 mt-1">
              A foto não está mais visível para ninguém.
            </p>
          </div>
        ) : (
          <div className="app-card overflow-hidden">
            {/* author */}
            <div className="flex items-center gap-2 p-3">
              <div className="w-9 h-9 rounded-full bg-pink-600/40 flex items-center justify-center text-xl">
                {VIRAL_POST.avatar}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">{VIRAL_POST.author}</div>
                {hasLocation ? (
                  <div className="flex items-center gap-1 text-[11px] text-rose-300">
                    <MapPin size={10} />
                    <span className="truncate">{VIRAL_POST.location}</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-300">📍 Localização removida</div>
                )}
              </div>
            </div>
            {/* photo */}
            <div className="aspect-square bg-gradient-to-br from-fuchsia-700/60 to-patrol-800/60 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-50">
                📸
              </div>
              {hasLocation && (
                <div className="absolute top-2 left-2 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse-slow">
                  <MapPin size={10} />
                  ESCOLA EXPOSTA
                </div>
              )}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5">
                {taggedState.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => blurFace(t.id)}
                    className={`text-[10px] px-2 py-1 rounded-full font-semibold border transition active:scale-95 ${
                      t.blurred
                        ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-100'
                        : t.authorized
                          ? 'bg-cyan-500/30 border-cyan-400/50 text-cyan-100'
                          : 'bg-rose-500/30 border-rose-400/50 text-rose-100 animate-pulse-slow'
                    }`}
                  >
                    {t.blurred ? '🟢' : t.authorized ? '✓' : '⚠'} {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-white/90 leading-snug">
                <span className="font-semibold">{VIRAL_POST.author}</span>{' '}
                {phase1.postFixed
                  ? 'Lembrança do nosso último dia — com permissão de todos. 💙'
                  : VIRAL_POST.caption}
              </p>
              <div className="flex items-center gap-4 mt-3 text-white/70">
                <div className="flex items-center gap-1 text-xs">
                  <Heart size={14} /> {VIRAL_POST.likes}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <MessageSquare size={14} /> {VIRAL_POST.comments}
                </div>
              </div>
            </div>
          </div>
        )}

        {!postDeleted && (
          <>
            <div className="app-card p-3">
              <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold mb-2">
                Análise da postagem
              </div>
              <ul className="text-xs text-white/85 space-y-1.5">
                <li className={hasLocation ? 'text-rose-300' : 'text-emerald-300 line-through'}>
                  • Localização da escola exposta
                </li>
                <li
                  className={
                    taggedState.filter((t) => !t.authorized && !t.blurred).length > 0
                      ? 'text-rose-300'
                      : 'text-emerald-300 line-through'
                  }
                >
                  • {taggedState.filter((t) => !t.authorized && !t.blurred).length} rosto(s) sem
                  autorização visível(is)
                </li>
                <li className="text-white/60">
                  Toque nos nomes ⚠ vermelhos para borrar quem não autorizou.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={removePostLocation}
                disabled={phase1.locationRemoved}
                className="btn-ghost text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <MapPin size={14} />
                {phase1.locationRemoved ? 'Localização ok' : 'Remover localização'}
              </button>
              <button
                onClick={askAuthorization}
                disabled={phase1.authorizationAsked}
                className="btn-ghost text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <UserCheck size={14} />
                {phase1.authorizationAsked ? 'Autorização ok' : 'Pedir autorização'}
              </button>
              <button
                onClick={republishSafely}
                disabled={phase1.postFixed}
                className="btn-primary text-sm disabled:opacity-50"
              >
                Republicar com segurança
              </button>
              <button onClick={deletePost} className="btn-danger text-sm">
                <Trash2 size={14} className="inline -mt-0.5 mr-1" />
                Apagar postagem
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============== PHASE 2 ==============
function Phase2Profile() {
  const { state, scanField, hideField, togglePrivateProfile, toggleProfileLocation } = useGame();
  const [scannerOn, setScannerOn] = useState(false);
  const isPrivate = state.phase2.profilePrivate;
  const hidden = state.phase2.hiddenItems;
  const scanned = state.phase2.scannedItems;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Perfil Público" subtitle="@joaopedrops" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* profile header */}
        <div className="app-card p-4 text-center relative">
          {isPrivate && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
              <Lock size={10} /> PRIVADO
            </div>
          )}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-700 mx-auto flex items-center justify-center text-4xl">
            🧑‍🎓
          </div>
          <div className="text-white font-bold text-lg mt-2">João Pedro</div>
          <div className="text-white/60 text-xs">@joaopedrops</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScannerOn((v) => !v)}
            className={`flex-1 ${
              scannerOn ? 'btn-primary' : 'btn-ghost'
            } flex items-center justify-center gap-2 text-sm`}
          >
            {scannerOn ? <Scan size={16} /> : <ScanLine size={16} />}
            Scanner de Dados {scannerOn ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={togglePrivateProfile}
            className={`${
              isPrivate ? 'btn-primary' : 'btn-ghost'
            } text-sm flex items-center gap-1`}
          >
            <Lock size={14} /> {isPrivate ? 'Privado' : 'Público'}
          </button>
        </div>

        {scannerOn && (
          <div className="app-card p-3 border-cyan-400/30 bg-cyan-400/5">
            <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold mb-1">
              Modo Scanner ativo
            </div>
            <p className="text-xs text-white/80">
              Toque em cada dado para analisar. Os sensíveis precisam ser ocultados.
            </p>
          </div>
        )}

        <div className="app-card p-2">
          {PUBLIC_PROFILE.map((f) => {
            const wasScanned = scanned.includes(f.id);
            const isHidden = hidden.includes(f.id);
            return (
              <div
                key={f.id}
                className={`p-3 border-b border-white/5 last:border-0 ${
                  wasScanned && f.sensitive
                    ? 'bg-rose-500/10'
                    : wasScanned
                      ? 'bg-emerald-500/10'
                      : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                      {f.label}
                    </div>
                    <button
                      onClick={() => scannerOn && scanField(f.id, f.sensitive)}
                      disabled={!scannerOn || wasScanned}
                      className={`text-sm mt-0.5 font-medium block w-full text-left ${
                        isHidden
                          ? 'text-white/40 italic'
                          : f.sensitive && wasScanned
                            ? 'text-rose-200'
                            : 'text-white'
                      } ${scannerOn && !wasScanned ? 'cursor-pointer hover:text-cyan-300' : ''}`}
                    >
                      {isHidden ? '••••••••' : f.value}
                    </button>
                    {wasScanned && (
                      <div
                        className={`text-[10px] mt-1 font-semibold ${
                          f.sensitive ? 'text-rose-300' : 'text-emerald-300'
                        }`}
                      >
                        {f.sensitive ? '⚠ Dado sensível' : '✓ Dado seguro'}
                      </div>
                    )}
                  </div>
                  {wasScanned && f.sensitive && !isHidden && (
                    <button
                      onClick={() => hideField(f.id)}
                      className="btn-ghost text-[11px] py-1 px-2 flex items-center gap-1"
                    >
                      <EyeOff size={12} /> Ocultar
                    </button>
                  )}
                  {isHidden && (
                    <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                      <Eye size={12} className="opacity-60" /> oculto
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={toggleProfileLocation}
          disabled={state.phase2.locationOff}
          className="btn-ghost w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60"
        >
          <MapPin size={14} />
          {state.phase2.locationOff
            ? 'Localização desligada ✓'
            : 'Desligar compartilhamento de localização'}
        </button>
      </div>
    </div>
  );
}

// ============== FALLBACK (later phases) ==============
function PostFeed() {
  const { closeApp } = useGame();
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Rede Social" subtitle="Feed normal" />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-3">😎</div>
        <div className="text-white font-bold">Nada de novo no feed</div>
        <p className="text-sm text-white/70 mt-2">
          Você já resolveu o caso desta rede social. Volte para a missão atual.
        </p>
        <button onClick={closeApp} className="btn-primary mt-4 flex items-center gap-2">
          <X size={14} /> Voltar para a tela inicial
        </button>
      </div>
    </div>
  );
}
