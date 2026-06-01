import {
  AppPermission,
  ChatConversation,
  GalleryImage,
  Phase,
  PostData,
  ProfileField,
  StoreApp,
  TermsClause,
} from '../types';

export const PHASES: Phase[] = [
  {
    id: 1,
    code: 'EF08CO07',
    title: 'O Post que Viralizou',
    briefing:
      'Uma foto da turma do 9º ano foi publicada na Rede Social sem autorização. Aparecem rostos, uniforme da escola e a localização exata. O caso já tem comentários estranhos.',
    hint: 'Abra o Chat Escolar e descubra quem NÃO autorizou. Depois volte à Rede Social e corrija o post.',
    apps: ['social', 'chat'],
    objectives: [
      { id: 'investigate', text: 'Investigue o caso no Chat Escolar' },
      { id: 'location', text: 'Remova a localização do post' },
      { id: 'faces', text: 'Borre os rostos de quem não autorizou' },
      { id: 'fix', text: 'Republique com legenda responsável (ou apague o post)' },
    ],
  },
  {
    id: 2,
    code: 'EF08CO08',
    title: 'Dados à Mostra',
    briefing:
      'O perfil público de um aluno está exibindo informações sensíveis demais. A Sombra Online adora um descuido desses.',
    hint: 'Use o Scanner de Dados na Rede Social para identificar dados pessoais e oculte-os. Depois, torne o perfil privado.',
    apps: ['social'],
    objectives: [
      { id: 'scan', text: 'Identifique pelo menos 4 dados pessoais sensíveis' },
      { id: 'hide', text: 'Oculte os dados sensíveis encontrados' },
      { id: 'private', text: 'Torne o perfil privado' },
    ],
  },
  {
    id: 3,
    code: 'EF08CO09',
    title: 'Termos Invisíveis',
    briefing:
      'Um app chamado "ShineCam" pediu para ser instalado. Parece inofensivo, mas os termos de uso escondem cláusulas perigosas.',
    hint: 'Abra o Navegador, ative a Lupa de Termos e marque os trechos abusivos. Depois decida se aceita ou rejeita os termos.',
    apps: ['browser'],
    objectives: [
      { id: 'identify', text: 'Marque pelo menos 3 cláusulas abusivas' },
      { id: 'decide', text: 'Tome a decisão correta sobre os termos' },
    ],
  },
  {
    id: 4,
    code: 'EF08CO10',
    title: 'Perfil em Risco',
    briefing:
      'A conta da Patrulha Digital está vulnerável. A Sombra Online tenta invadir. Reforce a segurança antes que seja tarde.',
    hint: 'Abra Configurações e ajuste cada item de privacidade e segurança.',
    apps: ['settings'],
    objectives: [
      { id: 'password', text: 'Crie uma senha forte' },
      { id: '2fa', text: 'Ative a autenticação em duas etapas' },
      { id: 'location', text: 'Desative a localização pública' },
      { id: 'posts', text: 'Restrinja quem vê seus posts' },
      { id: 'tag', text: 'Desligue marcações automáticas' },
      { id: 'permissions', text: 'Revise as permissões de apps' },
    ],
  },
  {
    id: 5,
    code: 'EF09CO09',
    title: 'A Imagem Não Era Sua',
    briefing:
      'Um colega está montando um trabalho com imagens da Galeria. Antes de publicar, é preciso verificar autoria, direitos e autorização de cada uma.',
    hint: 'Na Galeria, use o Detector de Imagem em cada arquivo e escolha a ação correta para cada caso.',
    apps: ['gallery'],
    objectives: [
      { id: 'detect', text: 'Analise todas as imagens com o Detector' },
      { id: 'decide', text: 'Tome a decisão correta para cada imagem' },
    ],
  },
];

// ============ FASE 1 ============

export const VIRAL_POST: PostData = {
  id: 'post1',
  author: 'Lucas.Esportes',
  avatar: '🏀',
  caption:
    'Galera da Sala 902 da Escola Municipal Aurora! Última prova feita, agora é só festa 🎉 #MelhorTurma #Aurora902',
  location: 'Escola Municipal Aurora — Rua das Acácias, 247',
  likes: 132,
  comments: 18,
  tagged: [
    { id: 'p1', name: 'Mariana S.', authorized: false, blurred: false },
    { id: 'p2', name: 'Pedro H.', authorized: true, blurred: false },
    { id: 'p3', name: 'Júlia M.', authorized: false, blurred: false },
    { id: 'p4', name: 'Bruno R.', authorized: true, blurred: false },
    { id: 'p5', name: 'Camila T.', authorized: false, blurred: false },
  ],
};

export const CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'c1',
    name: 'Turma 902 💬',
    avatar: '🎓',
    lastMessage: 'Mariana: Não autorizei essa foto, viu???',
    unread: 3,
    messages: [
      { id: 'm1', author: 'Lucas', text: 'Postei a foto da nossa última prova! 🎉', time: '14:02' },
      { id: 'm2', author: 'Pedro', text: 'Massa demais cara, tô aparecendo bem', time: '14:05' },
      {
        id: 'm3',
        author: 'Mariana',
        text: 'Lucas, não autorizei essa foto, viu??? Apaga ou tira meu rosto.',
        time: '14:08',
        highlight: true,
      },
      {
        id: 'm4',
        author: 'Júlia',
        text: 'Concordo com a Mari. Não pediu pra ninguém. E ainda marcou a localização da escola 😬',
        time: '14:10',
        highlight: true,
      },
      { id: 'm5', author: 'Bruno', text: 'De boa por mim, pode deixar', time: '14:12' },
      {
        id: 'm6',
        author: 'Camila',
        text: 'Eu também não autorizei. Minha mãe não deixa expor escola.',
        time: '14:14',
        highlight: true,
      },
      { id: 'm7', author: 'Patrulha Digital', text: 'Investigue: pelo menos 3 colegas não autorizaram.', time: '14:15', me: true },
    ],
  },
  {
    id: 'c2',
    name: 'Diretoria 🏫',
    avatar: '📣',
    lastMessage: 'Atenção: revisem o que publicam sobre a escola.',
    unread: 1,
    messages: [
      {
        id: 'd1',
        author: 'Diretora Ana',
        text: 'Atenção alunos: já recebemos reclamações sobre fotos publicadas mostrando o uniforme e a localização da escola. Por favor, sejam responsáveis.',
        time: '13:50',
      },
      {
        id: 'd2',
        author: 'Diretora Ana',
        text: 'A escola não autoriza o compartilhamento da fachada ou endereço em redes sociais.',
        time: '13:52',
      },
    ],
  },
  {
    id: 'c3',
    name: 'Sombra Online 👁',
    avatar: '👁',
    lastMessage: '...',
    unread: 0,
    messages: [
      {
        id: 's1',
        author: '???',
        text: 'Adorei o post. Já sei onde vocês estudam, em que horário saem e quem são. 😈',
        time: '14:20',
        highlight: true,
      },
    ],
  },
];

// ============ FASE 2 ============

export const PUBLIC_PROFILE: ProfileField[] = [
  { id: 'name', label: 'Nome completo', value: 'João Pedro Silva Santos', sensitive: true, scanned: false, hidden: false },
  { id: 'username', label: 'Usuário', value: '@joaopedrops', sensitive: false, scanned: false, hidden: false },
  { id: 'school', label: 'Escola', value: 'EM Aurora — 9º ano B', sensitive: true, scanned: false, hidden: false },
  { id: 'phone', label: 'Telefone', value: '(11) 99876-5432', sensitive: true, scanned: false, hidden: false },
  { id: 'address', label: 'Endereço', value: 'Rua das Acácias, 247 — apto 32', sensitive: true, scanned: false, hidden: false },
  { id: 'routine', label: 'Rotina', value: 'Saio de casa às 7h, volto às 18h. Treino 19h.', sensitive: true, scanned: false, hidden: false },
  { id: 'bio', label: 'Bio', value: 'Curte futebol e games 🎮', sensitive: false, scanned: false, hidden: false },
  { id: 'location', label: 'Localização ativa', value: 'Compartilhando em tempo real', sensitive: true, scanned: false, hidden: false },
  { id: 'birthday', label: 'Aniversário', value: '12/04/2010 (idade exata)', sensitive: true, scanned: false, hidden: false },
];

// ============ FASE 3 ============

export const SHINECAM_TERMS: TermsClause[] = [
  {
    id: 't1',
    text: 'Bem-vindo ao ShineCam! Ao usar nosso app você concorda com os termos abaixo.',
    dangerous: false,
    explanation: 'Cláusula introdutória, sem risco direto.',
  },
  {
    id: 't2',
    text: 'Coletamos sua localização precisa mesmo quando o aplicativo está fechado, 24 horas por dia.',
    dangerous: true,
    explanation: 'Rastreamento contínuo de localização viola a privacidade e expõe sua rotina.',
  },
  {
    id: 't3',
    text: 'Suas fotos podem ser usadas em campanhas comerciais sem aviso prévio nem pagamento.',
    dangerous: true,
    explanation: 'Cessão total de direitos de imagem é abusiva — fere autoria e uso de imagem.',
  },
  {
    id: 't4',
    text: 'Para entrar em contato, escreva para suporte@shinecam.fake.',
    dangerous: false,
    explanation: 'Apenas canal de contato. Sem risco.',
  },
  {
    id: 't5',
    text: 'O aplicativo acessa todos os seus contatos e os envia para nossos parceiros de marketing.',
    dangerous: true,
    explanation: 'Compartilhamento de dados de terceiros sem consentimento deles é grave.',
  },
  {
    id: 't6',
    text: 'Você pode excluir sua conta a qualquer momento nas configurações.',
    dangerous: false,
    explanation: 'Cláusula esperada — direito de exclusão é um bom sinal.',
  },
  {
    id: 't7',
    text: 'Podemos compartilhar seus dados com empresas parceiras a nosso critério, sem identificá-las.',
    dangerous: true,
    explanation: 'Compartilhamento opaco com terceiros é típico de termos abusivos.',
  },
  {
    id: 't8',
    text: 'O ShineCam não se responsabiliza por qualquer vazamento de dados pessoais.',
    dangerous: true,
    explanation: 'Isenção total de responsabilidade por vazamentos transfere o risco a você.',
  },
];

// ============ FASE 4 ============

export const APP_PERMISSIONS_REVIEW: AppPermission[] = [
  { id: 'cam', label: 'Câmera para o app de Calculadora', needed: false, reason: 'Calculadora não precisa de câmera.', granted: true },
  { id: 'mic', label: 'Microfone para o app Lanterna', needed: false, reason: 'Lanterna não usa áudio.', granted: true },
  { id: 'loc', label: 'Localização para Tradutor', needed: false, reason: 'Tradutor de textos não precisa de localização.', granted: true },
  { id: 'contacts', label: 'Contatos para um jogo de palavras', needed: false, reason: 'Jogos casuais não precisam dos seus contatos.', granted: true },
  { id: 'cammap', label: 'Câmera para o Mapa', needed: true, reason: 'Mapa usa câmera para visão aumentada — pode permitir.', granted: true },
];

// ============ FASE 5 ============

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    name: 'foto_turma.jpg',
    emoji: '👥',
    kind: 'friend',
    source: 'Capturada por você',
    rights: 'Mostra colegas reconhecíveis sem autorização.',
    hint: 'Tem rostos de pessoas — sem autorização não pode publicar como está.',
    validActions: ['ask', 'blur'],
  },
  {
    id: 'g2',
    name: 'meme_protegido.png',
    emoji: '🎭',
    kind: 'protected',
    source: 'Site de memes — © Studio Lol',
    rights: 'Imagem protegida por direitos autorais.',
    hint: 'É protegida. Não dá pra usar sem licença.',
    validActions: ['replace', 'credits'],
  },
  {
    id: 'g3',
    name: 'print_conversa.png',
    emoji: '💬',
    kind: 'screenshot',
    source: 'Print de chat privado',
    rights: 'Conteúdo de conversa privada de outra pessoa.',
    hint: 'Compartilhar print de conversa privada é antiético.',
    validActions: ['remove'],
  },
  {
    id: 'g4',
    name: 'selfie_minha.jpg',
    emoji: '🤳',
    kind: 'own',
    source: 'Sua própria foto',
    rights: 'Você é autor(a) e único(a) retratado(a).',
    hint: 'Sua, sem outras pessoas. Liberada.',
    validActions: ['use'],
  },
  {
    id: 'g5',
    name: 'paisagem_livre.jpg',
    emoji: '🏞',
    kind: 'free',
    source: 'Banco de imagens — Creative Commons',
    rights: 'Imagem livre, exige crédito ao autor.',
    hint: 'Pode usar, desde que dê o crédito.',
    validActions: ['credits'],
  },
];

// ============ LOJA DE APPS ============

export const STORE_APPS: StoreApp[] = [
  {
    id: 'shine',
    name: 'ShineCam',
    icon: '📸',
    description: 'Câmera com filtros mágicos.',
    permissions: [
      { id: 'p1', label: 'Câmera', needed: true, reason: 'Precisa para tirar fotos.', granted: null },
      { id: 'p2', label: 'Localização em segundo plano', needed: false, reason: 'Não precisa rastrear você 24h.', granted: null },
      { id: 'p3', label: 'Contatos', needed: false, reason: 'Não precisa do seu catálogo de amigos.', granted: null },
      { id: 'p4', label: 'Arquivos do dispositivo', needed: true, reason: 'Precisa para salvar fotos.', granted: null },
    ],
  },
];
