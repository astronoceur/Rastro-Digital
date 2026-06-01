# Rastros Digitais — O Caso da Sombra Online

Protótipo jogável em React + TypeScript + Tailwind CSS de um jogo educacional
para o 8º e 9º ano do Ensino Fundamental, baseado em habilidades da
**BNCC Computação** (EF08CO07, EF08CO08, EF08CO09, EF08CO10, EF09CO09).

O jogo acontece inteiramente dentro de um celular fictício. O jogador atua
como agente da **Patrulha Digital** e investiga 5 missões para reduzir a
**Pegada Digital** e enfraquecer a **Sombra Online**.

## Como executar

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install
npm run dev
```

Abra o endereço impresso pelo Vite (geralmente http://localhost:5173).

Para gerar build de produção: `npm run build` e depois `npm run preview`.

## Estrutura de arquivos

```
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx                       # Orquestrador do jogo
    ├── main.tsx                      # Entrada
    ├── index.css                     # Tailwind + estilo global
    ├── types.ts                      # Tipos compartilhados
    ├── context
    │   └── GameContext.tsx           # Estado e ações do jogo
    ├── data
    │   └── mockData.ts               # Fases, posts, termos, chat, galeria...
    └── components
        ├── PhoneFrame.tsx            # Moldura do smartphone
        ├── StatusBar.tsx             # Barra de status (hora, wifi, bateria)
        ├── HomeScreen.tsx            # Tela inicial com 8 apps
        ├── AppIcon.tsx               # Ícone de app reutilizável
        ├── ProgressBars.tsx          # Pegada Digital + 3 indicadores
        ├── FeedbackModal.tsx         # Feedback educativo após cada ação
        ├── MissionBanner.tsx         # Cabeçalho dos apps com progresso
        ├── PhaseComplete.tsx         # Tela de conclusão de fase
        ├── FinalScreen.tsx           # Confronto final com a Sombra Online
        ├── IntroScreen.tsx           # Tela de abertura
        └── apps
            ├── MissionCenter.tsx     # Central da Patrulha (briefing)
            ├── ChatApp.tsx           # Chat Escolar (pistas)
            ├── SocialApp.tsx         # Rede Social (fase 1 e 2)
            ├── GalleryApp.tsx        # Galeria + Detector de Imagem (fase 5)
            ├── SettingsApp.tsx       # Configurações (fase 4)
            ├── BrowserApp.tsx        # Navegador + Lupa de Termos (fase 3)
            ├── AppStore.tsx          # Loja de Apps (treino de permissões)
            └── TraceMap.tsx          # Mapa de Rastros (resumo de risco)
```

## Como o jogo funciona

- A barra **Pegada Digital (0–100)** começa em 78 (Sombra forte). Decisões
  corretas reduzem; decisões erradas aumentam.
- **Indicadores** (Privacidade, Segurança, Ética Digital) começam baixos e
  sobem com boas escolhas. Aparecem no Home, no Mission Center e no Mapa de
  Rastros.
- Cada fase tem **objetivos** que ficam ✓ conforme o jogador age — não há
  quiz, todo aprendizado vem da interação com os apps.
- Após cada ação, o **FeedbackModal** explica em uma frase curta por que
  aquela escolha foi adequada (ou não).
- Quando todos os objetivos da fase atual ficam ✓, surge a tela de
  **PhaseComplete**, que segue para a próxima fase.
- Após a fase 5, a **FinalScreen** mostra o resultado contra a Sombra Online
  e o título conquistado.

### Fases implementadas

| # | Código BNCC | Título | App principal | Mecânica |
|---|---|---|---|---|
| 1 | EF08CO07 | O Post que Viralizou | Rede Social + Chat | Investigar conversa, remover localização, borrar rostos não autorizados, republicar ou apagar |
| 2 | EF08CO08 | Dados à Mostra | Rede Social | Scanner de Dados nos campos do perfil, ocultar sensíveis, tornar privado |
| 3 | EF08CO09 | Termos Invisíveis | Navegador | Lupa de Termos para marcar cláusulas abusivas, decidir aceitar/rejeitar |
| 4 | EF08CO10 | Perfil em Risco | Configurações | Senha forte, 2FA, localização, visibilidade, marcações, permissões |
| 5 | EF09CO09 | A Imagem Não Era Sua | Galeria | Detector de Imagem por arquivo e escolha de ação ética |

### Resultado final (faixa de Pegada Digital)

- **0 a 30** → Guardião(ã) da Privacidade — Sombra derrotada
- **31 a 60** → Investigador(a) Digital — Sombra enfraquecida
- **61 a 100** → Aprendiz da Patrulha Digital — Sombra resistente

## Dados mockados

Todos os dados de jogo vivem em `src/data/mockData.ts`:

- `PHASES` — definição das 5 fases, objetivos e dicas
- `VIRAL_POST` — post da fase 1 (autor, legenda, localização, marcados)
- `CHAT_CONVERSATIONS` — três conversas (turma, diretoria, sombra) com pistas
- `PUBLIC_PROFILE` — campos do perfil exposto na fase 2 (com flag `sensitive`)
- `SHINECAM_TERMS` — 8 cláusulas dos termos do app ShineCam, sendo 5 perigosas
- `APP_PERMISSIONS_REVIEW` — permissões para revisar na fase 4
- `GALLERY_IMAGES` — 5 imagens com origem, direitos e ações válidas
- `STORE_APPS` — app fictício para a Loja de Apps

## Sugestões de melhorias futuras

- **Persistência local** com `localStorage` para retomar a partida.
- **Áudio e efeitos sonoros** (notificações, glitches da Sombra Online).
- **Mais fases** — phishing, deepfake, golpes de engenharia social, cyberbullying.
- **Modo professor** com painel de relatório das decisões para a turma.
- **Multi-jogador cooperativo** (Patrulha de até 4 alunos).
- **Tutorial interativo** com personagem-mentor.
- **Animações Lottie/Framer Motion** para a Sombra Online ganhar vida.
- **Internacionalização** para uso em outros países lusófonos.
- **Acessibilidade** — narração, alto contraste, navegação por teclado.
- **Editor de fases** para professores criarem cenários próprios.
- **Integração com LMS** (Moodle, Google Classroom) para registrar conclusão.

## Notas técnicas

- Sem backend, sem banco, sem libs pesadas — apenas React, ReactDOM, Tailwind
  e `lucide-react` (ícones).
- Estado global via `useState` + `useContext` (sem Redux/Zustand).
- Layout mobile-first: o jogo simula um smartphone de 390×844 com notch,
  centralizado em qualquer viewport.
- Estilo visual com gradientes azul/roxo/ciano, glitch para representar a
  Sombra Online, e indicadores coloridos.
