import { Bell, ChevronRight, Key, KeyRound, Lock, MapPin, ShieldCheck, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { APP_PERMISSIONS_REVIEW } from '../../data/mockData';

export default function SettingsApp() {
  const {
    state,
    setStrongPassword,
    toggle2FA,
    togglePublicLocation,
    togglePostsRestricted,
    toggleAutoTag,
    reviewPermissions,
  } = useGame();
  const p = state.phase4;
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [permOpen, setPermOpen] = useState(false);
  const [password, setPassword] = useState('');

  const passwordStrength = (() => {
    const long = password.length >= 10;
    const hasUpper = /[A-Z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const hasSym = /[^A-Za-z0-9]/.test(password);
    return [long, hasUpper, hasNum, hasSym].filter(Boolean).length;
  })();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Configurações" subtitle="Segurança & Privacidade" />
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Section title="Conta">
          <Row
            icon={<KeyRound size={18} />}
            title="Senha"
            subtitle={p.passwordStrong ? 'Forte ✓' : 'Fraca — atualize agora'}
            danger={!p.passwordStrong}
            done={p.passwordStrong}
            onClick={() => setPasswordOpen(true)}
          />
          <Row
            icon={<ShieldCheck size={18} />}
            title="Autenticação em 2 etapas"
            subtitle={p.twoFA ? 'Ativada ✓' : 'Desativada — risco alto'}
            danger={!p.twoFA}
            done={p.twoFA}
            onClick={toggle2FA}
            toggle={p.twoFA}
          />
        </Section>

        <Section title="Privacidade">
          <Row
            icon={<MapPin size={18} />}
            title="Localização pública"
            subtitle={p.publicLocationOff ? 'Desativada ✓' : 'Compartilhando agora'}
            danger={!p.publicLocationOff}
            done={p.publicLocationOff}
            onClick={togglePublicLocation}
            toggle={!p.publicLocationOff}
          />
          <Row
            icon={<Lock size={18} />}
            title="Quem pode ver meus posts"
            subtitle={p.postsRestricted ? 'Apenas amigos ✓' : 'Público — qualquer um vê'}
            danger={!p.postsRestricted}
            done={p.postsRestricted}
            onClick={togglePostsRestricted}
          />
          <Row
            icon={<Tag size={18} />}
            title="Marcações automáticas"
            subtitle={p.autoTagOff ? 'Aprovação manual ✓' : 'Qualquer um pode te marcar'}
            danger={!p.autoTagOff}
            done={p.autoTagOff}
            onClick={toggleAutoTag}
            toggle={!p.autoTagOff}
          />
        </Section>

        <Section title="Permissões de Apps">
          <Row
            icon={<Bell size={18} />}
            title="Revisar permissões"
            subtitle={
              p.permissionsReviewed
                ? 'Permissões ajustadas ✓'
                : '5 permissões suspeitas'
            }
            danger={!p.permissionsReviewed}
            done={p.permissionsReviewed}
            onClick={() => setPermOpen(true)}
          />
        </Section>
      </div>

      {passwordOpen && (
        <Sheet onClose={() => setPasswordOpen(false)} title="Nova senha">
          <p className="text-xs text-white/70 mb-3">
            Use ao menos 10 caracteres, com letras, números e símbolos.
          </p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite uma senha forte..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
          />
          <div className="flex items-center gap-1 mt-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full ${
                  i < passwordStrength
                    ? passwordStrength === 4
                      ? 'bg-emerald-400'
                      : passwordStrength >= 2
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    : 'bg-white/15'
                }`}
              />
            ))}
          </div>
          <div className="text-[11px] text-white/60 mt-1">
            Força: {['Muito fraca', 'Fraca', 'Razoável', 'Boa', 'Forte'][passwordStrength]}
          </div>
          <button
            disabled={passwordStrength < 4}
            onClick={() => {
              setStrongPassword();
              setPasswordOpen(false);
              setPassword('');
            }}
            className="btn-primary w-full mt-4 disabled:opacity-50"
          >
            Salvar senha
          </button>
        </Sheet>
      )}

      {permOpen && (
        <Sheet onClose={() => setPermOpen(false)} title="Permissões dos apps">
          <ul className="space-y-2 mb-3">
            {APP_PERMISSIONS_REVIEW.map((perm) => (
              <li
                key={perm.id}
                className={`p-3 rounded-xl border ${
                  perm.needed
                    ? 'border-emerald-400/30 bg-emerald-400/5'
                    : 'border-rose-400/30 bg-rose-400/5'
                }`}
              >
                <div className="text-sm text-white font-semibold">{perm.label}</div>
                <div className="text-[11px] text-white/70 mt-0.5">{perm.reason}</div>
                <div
                  className={`text-[10px] font-bold mt-1 ${
                    perm.needed ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {perm.needed ? 'MANTER' : 'REVOGAR'}
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              reviewPermissions();
              setPermOpen(false);
            }}
            className="btn-primary w-full"
          >
            Revogar excessos e salvar
          </button>
        </Sheet>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1.5 px-1">
        {title}
      </div>
      <div className="app-card divide-y divide-white/5">{children}</div>
    </div>
  );
}

function Row({
  icon,
  title,
  subtitle,
  danger,
  done,
  onClick,
  toggle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  danger?: boolean;
  done?: boolean;
  onClick?: () => void;
  toggle?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition text-left"
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          done
            ? 'bg-emerald-500/20 text-emerald-300'
            : danger
              ? 'bg-rose-500/20 text-rose-300'
              : 'bg-white/10 text-white/80'
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div
          className={`text-[11px] mt-0.5 ${
            done ? 'text-emerald-300' : danger ? 'text-rose-300' : 'text-white/60'
          }`}
        >
          {subtitle}
        </div>
      </div>
      {toggle !== undefined ? (
        <div
          className={`w-10 h-6 rounded-full p-0.5 transition ${
            toggle ? 'bg-emerald-500/80' : 'bg-white/15'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow transition ${
              toggle ? 'translate-x-4' : ''
            }`}
          />
        </div>
      ) : (
        <ChevronRight size={16} className="text-white/40" />
      )}
    </button>
  );
}

function Sheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-40 animate-fade-in">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 p-3 animate-slide-up">
        <div className="bg-patrol-900/95 border border-white/15 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-bold">{title}</div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10"
              aria-label="Fechar"
            >
              <X size={16} className="text-white/70" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
