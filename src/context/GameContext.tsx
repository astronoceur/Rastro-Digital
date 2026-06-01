import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { AppId, FeedbackData, GameState } from '../types';
import { VIRAL_POST } from '../data/mockData';

const INITIAL_STATE: GameState = {
  screen: 'home',
  currentApp: null,
  currentPhase: 1,
  pegadaDigital: 78,
  indicators: { privacidade: 22, seguranca: 28, etica: 32 },
  feedback: null,
  phaseComplete: false,
  intro: true,
  phase1: {
    investigatedChat: false,
    locationRemoved: false,
    facesBlurred: false,
    authorizationAsked: false,
    postFixed: false,
    postDeleted: false,
  },
  phase2: {
    scannedItems: [],
    hiddenItems: [],
    profilePrivate: false,
    locationOff: false,
  },
  phase3: {
    highlightedClauses: [],
    decision: null,
  },
  phase4: {
    passwordStrong: false,
    twoFA: false,
    publicLocationOff: false,
    postsRestricted: false,
    autoTagOff: false,
    permissionsReviewed: false,
  },
  phase5: {
    imageDecisions: {},
    detectorUsed: [],
  },
};

interface Effect {
  pegada?: number;
  privacidade?: number;
  seguranca?: number;
  etica?: number;
}

interface GameContextValue {
  state: GameState;
  openApp: (app: AppId) => void;
  closeApp: () => void;
  startGame: () => void;
  resetGame: () => void;
  showFeedback: (data: FeedbackData) => void;
  hideFeedback: () => void;
  applyEffect: (effect: Effect) => void;
  nextPhase: () => void;
  // Phase 1
  investigateChat: () => void;
  removePostLocation: () => void;
  blurFace: (id: string) => void;
  askAuthorization: () => void;
  deletePost: () => void;
  republishSafely: () => void;
  // Phase 2
  scanField: (id: string, sensitive: boolean) => void;
  hideField: (id: string) => void;
  togglePrivateProfile: () => void;
  toggleProfileLocation: () => void;
  // Phase 3
  highlightClause: (id: string, dangerous: boolean) => void;
  decideTerms: (decision: 'accept' | 'reject') => void;
  // Phase 4
  setStrongPassword: () => void;
  toggle2FA: () => void;
  togglePublicLocation: () => void;
  togglePostsRestricted: () => void;
  toggleAutoTag: () => void;
  reviewPermissions: () => void;
  // Phase 5
  useDetector: (id: string) => void;
  decideImage: (id: string, action: string, valid: boolean) => void;
  // computed
  phaseObjectivesStatus: Record<string, boolean>;
  isPhaseComplete: boolean;
  taggedState: typeof VIRAL_POST.tagged;
}

const GameContext = createContext<GameContextValue | null>(null);

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  // local tagged state so we can flip "blurred" per person
  const [tagged, setTagged] = useState(VIRAL_POST.tagged.map((t) => ({ ...t })));

  const showFeedback = useCallback((data: FeedbackData) => {
    setState((s) => ({ ...s, feedback: data }));
  }, []);

  const hideFeedback = useCallback(() => {
    setState((s) => ({ ...s, feedback: null }));
  }, []);

  const applyEffect = useCallback((effect: Effect) => {
    setState((s) => ({
      ...s,
      pegadaDigital: clamp(s.pegadaDigital + (effect.pegada ?? 0)),
      indicators: {
        privacidade: clamp(s.indicators.privacidade + (effect.privacidade ?? 0)),
        seguranca: clamp(s.indicators.seguranca + (effect.seguranca ?? 0)),
        etica: clamp(s.indicators.etica + (effect.etica ?? 0)),
      },
    }));
  }, []);

  const openApp = useCallback((app: AppId) => {
    setState((s) => ({ ...s, currentApp: app, screen: 'app' }));
  }, []);
  const closeApp = useCallback(() => {
    setState((s) => ({ ...s, currentApp: null, screen: 'home' }));
  }, []);
  const startGame = useCallback(() => {
    setState((s) => ({ ...s, intro: false }));
  }, []);
  const resetGame = useCallback(() => {
    setTagged(VIRAL_POST.tagged.map((t) => ({ ...t })));
    setState(INITIAL_STATE);
  }, []);

  // ===== Phase 1 =====
  const investigateChat = useCallback(() => {
    setState((s) =>
      s.phase1.investigatedChat ? s : { ...s, phase1: { ...s.phase1, investigatedChat: true } },
    );
  }, []);

  const removePostLocation = useCallback(() => {
    setState((s) => {
      if (s.phase1.locationRemoved) return s;
      return { ...s, phase1: { ...s.phase1, locationRemoved: true } };
    });
    applyEffect({ pegada: -10, privacidade: 12 });
    showFeedback({
      type: 'good',
      title: 'Localização removida ✓',
      message:
        'Expor a localização da escola permite que estranhos saibam onde vocês estão. Boa decisão de remover.',
    });
  }, [applyEffect, showFeedback]);

  const blurFace = useCallback(
    (id: string) => {
      const person = tagged.find((t) => t.id === id);
      if (!person) return;
      if (person.blurred) return;
      setTagged((prev) => prev.map((t) => (t.id === id ? { ...t, blurred: true } : t)));
      if (person.authorized) {
        applyEffect({ pegada: 4, etica: -5 });
        showFeedback({
          type: 'bad',
          title: 'Eita... Esse já tinha autorizado.',
          message:
            'Borrar quem autorizou não é necessário. Foque em proteger quem NÃO deu permissão.',
        });
      } else {
        applyEffect({ pegada: -6, etica: 8 });
        showFeedback({
          type: 'good',
          title: 'Rosto protegido ✓',
          message:
            'Sem autorização, expor o rosto fere o direito de imagem. Você respeitou a escolha do colega.',
        });
        // mark facesBlurred true if all unauthorized are blurred
        setState((s) => {
          const updatedTagged = tagged.map((t) => (t.id === id ? { ...t, blurred: true } : t));
          const allUnauthBlurred = updatedTagged
            .filter((t) => !t.authorized)
            .every((t) => t.blurred);
          if (allUnauthBlurred) {
            return { ...s, phase1: { ...s.phase1, facesBlurred: true } };
          }
          return s;
        });
      }
    },
    [tagged, applyEffect, showFeedback],
  );

  const askAuthorization = useCallback(() => {
    setState((s) => {
      if (s.phase1.authorizationAsked) return s;
      return { ...s, phase1: { ...s.phase1, authorizationAsked: true } };
    });
    applyEffect({ pegada: -4, etica: 6 });
    showFeedback({
      type: 'good',
      title: 'Pedido enviado ✓',
      message:
        'Pedir autorização antes de publicar é a postura ética. Compartilhar é decisão de cada um.',
    });
  }, [applyEffect, showFeedback]);

  const deletePost = useCallback(() => {
    setState((s) => ({ ...s, phase1: { ...s.phase1, postDeleted: true, postFixed: true } }));
    applyEffect({ pegada: -18, privacidade: 14, etica: 10 });
    showFeedback({
      type: 'good',
      title: 'Postagem apagada ✓',
      message:
        'Quando um conteúdo não respeita autorizações, apagar é uma solução válida. A pegada digital diminuiu bastante.',
    });
  }, [applyEffect, showFeedback]);

  const republishSafely = useCallback(() => {
    if (!state.phase1.locationRemoved || !state.phase1.facesBlurred) {
      showFeedback({
        type: 'bad',
        title: 'Ainda não está seguro.',
        message:
          'Antes de republicar, remova a localização e proteja os rostos de quem não autorizou.',
      });
      return;
    }
    setState((s) => ({ ...s, phase1: { ...s.phase1, postFixed: true } }));
    applyEffect({ pegada: -12, etica: 10, privacidade: 8 });
    showFeedback({
      type: 'good',
      title: 'Postagem corrigida e republicada ✓',
      message:
        'Sem localização, com rostos protegidos e legenda responsável. Assim sim!',
    });
  }, [state.phase1.locationRemoved, state.phase1.facesBlurred, applyEffect, showFeedback]);

  // ===== Phase 2 =====
  const scanField = useCallback(
    (id: string, sensitive: boolean) => {
      setState((s) => {
        if (s.phase2.scannedItems.includes(id)) return s;
        return { ...s, phase2: { ...s.phase2, scannedItems: [...s.phase2.scannedItems, id] } };
      });
      if (sensitive) {
        applyEffect({ privacidade: 4 });
        showFeedback({
          type: 'info',
          title: 'Dado sensível detectado',
          message: 'Esse dado, exposto, pode ser usado para localizar ou enganar você. Oculte-o.',
        });
      } else {
        showFeedback({
          type: 'info',
          title: 'Dado não-sensível',
          message: 'Esse dado é mais inofensivo. Foco nos que realmente expõem você.',
        });
      }
    },
    [applyEffect, showFeedback],
  );

  const hideField = useCallback(
    (id: string) => {
      setState((s) => {
        if (s.phase2.hiddenItems.includes(id)) return s;
        return { ...s, phase2: { ...s.phase2, hiddenItems: [...s.phase2.hiddenItems, id] } };
      });
      applyEffect({ pegada: -5, privacidade: 6 });
      showFeedback({
        type: 'good',
        title: 'Dado ocultado ✓',
        message: 'Menos informação pública = menos rastros para a Sombra Online.',
      });
    },
    [applyEffect, showFeedback],
  );

  const togglePrivateProfile = useCallback(() => {
    setState((s) => ({ ...s, phase2: { ...s.phase2, profilePrivate: !s.phase2.profilePrivate } }));
    applyEffect({ pegada: -8, privacidade: 10, seguranca: 6 });
    showFeedback({
      type: 'good',
      title: 'Perfil agora é privado ✓',
      message: 'Só pessoas aprovadas verão seu conteúdo. Decisão certeira.',
    });
  }, [applyEffect, showFeedback]);

  const toggleProfileLocation = useCallback(() => {
    setState((s) => ({ ...s, phase2: { ...s.phase2, locationOff: !s.phase2.locationOff } }));
    applyEffect({ pegada: -6, privacidade: 6 });
    showFeedback({
      type: 'good',
      title: 'Localização desligada ✓',
      message: 'Não compartilhar localização em tempo real protege sua rotina.',
    });
  }, [applyEffect, showFeedback]);

  // ===== Phase 3 =====
  const highlightClause = useCallback(
    (id: string, dangerous: boolean) => {
      setState((s) => {
        if (s.phase3.highlightedClauses.includes(id)) return s;
        return {
          ...s,
          phase3: {
            ...s.phase3,
            highlightedClauses: [...s.phase3.highlightedClauses, id],
          },
        };
      });
      if (dangerous) {
        applyEffect({ privacidade: 4, etica: 3 });
        showFeedback({
          type: 'good',
          title: 'Cláusula abusiva identificada ✓',
          message: 'Esse tipo de trecho é uma armadilha comum em termos de uso.',
        });
      } else {
        applyEffect({ pegada: 2 });
        showFeedback({
          type: 'bad',
          title: 'Hmm, esse trecho não era o problema.',
          message: 'Releia com calma. Cláusulas perigosas falam de DADOS, LOCALIZAÇÃO ou IMAGEM.',
        });
      }
    },
    [applyEffect, showFeedback],
  );

  const decideTerms = useCallback(
    (decision: 'accept' | 'reject') => {
      setState((s) => ({ ...s, phase3: { ...s.phase3, decision } }));
      if (decision === 'reject') {
        applyEffect({ pegada: -14, privacidade: 12, seguranca: 8 });
        showFeedback({
          type: 'good',
          title: 'Termos rejeitados ✓',
          message:
            'Recusar termos abusivos é seu direito. Sempre leia antes de aceitar qualquer app.',
        });
      } else {
        applyEffect({ pegada: 18, privacidade: -10, seguranca: -8 });
        showFeedback({
          type: 'bad',
          title: 'Aceitar foi precipitado.',
          message:
            'Você acabou de autorizar acesso a localização contínua, contatos e uso comercial das suas fotos.',
        });
      }
    },
    [applyEffect, showFeedback],
  );

  // ===== Phase 4 =====
  const setStrongPassword = useCallback(() => {
    setState((s) => ({ ...s, phase4: { ...s.phase4, passwordStrong: true } }));
    applyEffect({ pegada: -6, seguranca: 12 });
    showFeedback({
      type: 'good',
      title: 'Senha forte criada ✓',
      message:
        'Senhas longas, com letras, números e símbolos, são MUITO mais difíceis de quebrar.',
    });
  }, [applyEffect, showFeedback]);

  const toggle2FA = useCallback(() => {
    setState((s) => ({ ...s, phase4: { ...s.phase4, twoFA: true } }));
    applyEffect({ pegada: -8, seguranca: 14 });
    showFeedback({
      type: 'good',
      title: 'Autenticação em 2 etapas ativada ✓',
      message:
        'Mesmo que descubram sua senha, ainda precisarão do código do seu celular.',
    });
  }, [applyEffect, showFeedback]);

  const togglePublicLocation = useCallback(() => {
    setState((s) => ({ ...s, phase4: { ...s.phase4, publicLocationOff: true } }));
    applyEffect({ pegada: -5, privacidade: 8 });
    showFeedback({
      type: 'good',
      title: 'Localização pública desativada ✓',
      message: 'Sua rotina não fica mais à mostra para qualquer pessoa.',
    });
  }, [applyEffect, showFeedback]);

  const togglePostsRestricted = useCallback(() => {
    setState((s) => ({ ...s, phase4: { ...s.phase4, postsRestricted: true } }));
    applyEffect({ pegada: -5, privacidade: 8 });
    showFeedback({
      type: 'good',
      title: 'Visibilidade restrita ✓',
      message: 'Agora só quem você aprova vê suas publicações.',
    });
  }, [applyEffect, showFeedback]);

  const toggleAutoTag = useCallback(() => {
    setState((s) => ({ ...s, phase4: { ...s.phase4, autoTagOff: true } }));
    applyEffect({ pegada: -4, etica: 6 });
    showFeedback({
      type: 'good',
      title: 'Marcações automáticas desligadas ✓',
      message:
        'Você decide quando ser marcado(a) em fotos. Direito de imagem preservado.',
    });
  }, [applyEffect, showFeedback]);

  const reviewPermissions = useCallback(() => {
    setState((s) => ({ ...s, phase4: { ...s.phase4, permissionsReviewed: true } }));
    applyEffect({ pegada: -6, privacidade: 6, seguranca: 6 });
    showFeedback({
      type: 'good',
      title: 'Permissões revisadas ✓',
      message:
        'Apps só devem ter acesso ao que realmente precisam. Você cortou os excessos.',
    });
  }, [applyEffect, showFeedback]);

  // ===== Phase 5 =====
  const useDetector = useCallback(
    (id: string) => {
      setState((s) => {
        if (s.phase5.detectorUsed.includes(id)) return s;
        return { ...s, phase5: { ...s.phase5, detectorUsed: [...s.phase5.detectorUsed, id] } };
      });
    },
    [],
  );

  const decideImage = useCallback(
    (id: string, action: string, valid: boolean) => {
      setState((s) => ({
        ...s,
        phase5: { ...s.phase5, imageDecisions: { ...s.phase5.imageDecisions, [id]: action } },
      }));
      if (valid) {
        applyEffect({ pegada: -6, etica: 8 });
        showFeedback({
          type: 'good',
          title: 'Decisão correta ✓',
          message:
            'Respeitar autoria e direito de imagem mostra que você entende ética digital.',
        });
      } else {
        applyEffect({ pegada: 6, etica: -6 });
        showFeedback({
          type: 'bad',
          title: 'Essa ação não resolve.',
          message:
            'Esse tipo de imagem exige uma escolha diferente. Volte ao Detector e reavalie.',
        });
      }
    },
    [applyEffect, showFeedback],
  );

  // ===== Computed objectives =====
  const phaseObjectivesStatus = useMemo<Record<string, boolean>>(() => {
    const status: Record<string, boolean> = {};
    switch (state.currentPhase) {
      case 1:
        status.investigate = state.phase1.investigatedChat;
        status.location = state.phase1.locationRemoved;
        status.faces = state.phase1.facesBlurred;
        status.fix = state.phase1.postFixed || state.phase1.postDeleted;
        return status;
      case 2: {
        const sensitive = ['name', 'school', 'phone', 'address', 'routine', 'location', 'birthday'];
        const sensitiveScanned = state.phase2.scannedItems.filter((i) => sensitive.includes(i))
          .length;
        const sensitiveHidden = state.phase2.hiddenItems.filter((i) => sensitive.includes(i))
          .length;
        status.scan = sensitiveScanned >= 4;
        status.hide = sensitiveHidden >= 4;
        status.private = state.phase2.profilePrivate;
        return status;
      }
      case 3: {
        const dangerousIds = ['t2', 't3', 't5', 't7', 't8'];
        const correctlyHighlighted = state.phase3.highlightedClauses.filter((id) =>
          dangerousIds.includes(id),
        ).length;
        status.identify = correctlyHighlighted >= 3;
        status.decide = state.phase3.decision === 'reject';
        return status;
      }
      case 4: {
        const p = state.phase4;
        status.password = p.passwordStrong;
        status['2fa'] = p.twoFA;
        status.location = p.publicLocationOff;
        status.posts = p.postsRestricted;
        status.tag = p.autoTagOff;
        status.permissions = p.permissionsReviewed;
        return status;
      }
      case 5: {
        const totalImages = 5;
        const allDetected = state.phase5.detectorUsed.length >= totalImages;
        const allDecidedCorrectly = Object.entries(state.phase5.imageDecisions).filter(
          ([, v]) => v && v !== 'wrong',
        ).length;
        status.detect = allDetected;
        status.decide = allDecidedCorrectly >= totalImages;
        return status;
      }
      default:
        return status;
    }
  }, [state]);

  const isPhaseComplete = useMemo(
    () => Object.values(phaseObjectivesStatus).every(Boolean),
    [phaseObjectivesStatus],
  );

  const nextPhase = useCallback(() => {
    setState((s) => {
      if (s.currentPhase >= 5) {
        return { ...s, screen: 'final', currentApp: null };
      }
      return {
        ...s,
        currentPhase: s.currentPhase + 1,
        currentApp: 'mission',
        screen: 'app',
        feedback: null,
        phaseComplete: false,
      };
    });
  }, []);

  const value: GameContextValue = {
    state,
    openApp,
    closeApp,
    startGame,
    resetGame,
    showFeedback,
    hideFeedback,
    applyEffect,
    nextPhase,
    investigateChat,
    removePostLocation,
    blurFace,
    askAuthorization,
    deletePost,
    republishSafely,
    scanField,
    hideField,
    togglePrivateProfile,
    toggleProfileLocation,
    highlightClause,
    decideTerms,
    setStrongPassword,
    toggle2FA,
    togglePublicLocation,
    togglePostsRestricted,
    toggleAutoTag,
    reviewPermissions,
    useDetector,
    decideImage,
    phaseObjectivesStatus,
    isPhaseComplete,
    taggedState: tagged,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
