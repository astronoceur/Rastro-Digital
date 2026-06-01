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
