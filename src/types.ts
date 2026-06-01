export type AppId =
  | 'mission'
  | 'chat'
  | 'social'
  | 'gallery'
  | 'settings'
  | 'browser'
  | 'appstore'
  | 'tracemap';

export type Screen = 'home' | 'app' | 'final';

export interface Objective {
  id: string;
  text: string;
}

export interface Phase {
  id: number;
  code: string;
  title: string;
  briefing: string;
  hint: string;
  apps: AppId[];
  objectives: Objective[];
}

export interface Indicators {
  privacidade: number;
  seguranca: number;
  etica: number;
}

export type FeedbackType = 'good' | 'bad' | 'info';

export interface FeedbackData {
  type: FeedbackType;
  title: string;
  message: string;
}

export interface Phase1State {
  investigatedChat: boolean;
  locationRemoved: boolean;
  facesBlurred: boolean;
  authorizationAsked: boolean;
  postFixed: boolean;
  postDeleted: boolean;
}

export interface Phase2State {
  scannedItems: string[];
  hiddenItems: string[];
  profilePrivate: boolean;
  locationOff: boolean;
}

export interface Phase3State {
  highlightedClauses: string[];
  decision: 'accept' | 'reject' | null;
}

export interface Phase4State {
  passwordStrong: boolean;
  twoFA: boolean;
  publicLocationOff: boolean;
  postsRestricted: boolean;
  autoTagOff: boolean;
  permissionsReviewed: boolean;
}

export interface Phase5State {
  imageDecisions: Record<string, string>;
  detectorUsed: string[];
}

export interface GameState {
  screen: Screen;
  currentApp: AppId | null;
  currentPhase: number;
  pegadaDigital: number;
  indicators: Indicators;
  feedback: FeedbackData | null;
  phaseComplete: boolean;
  intro: boolean;
  phase1: Phase1State;
  phase2: Phase2State;
  phase3: Phase3State;
  phase4: Phase4State;
  phase5: Phase5State;
}

export interface PostData {
  id: string;
  author: string;
  avatar: string;
  caption: string;
  location: string | null;
  tagged: TaggedPerson[];
  likes: number;
  comments: number;
}

export interface TaggedPerson {
  id: string;
  name: string;
  authorized: boolean;
  blurred: boolean;
}

export interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  me?: boolean;
  highlight?: boolean;
}

export interface ChatConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  messages: ChatMessage[];
}

export interface ProfileField {
  id: string;
  label: string;
  value: string;
  sensitive: boolean;
  scanned: boolean;
  hidden: boolean;
}

export interface TermsClause {
  id: string;
  text: string;
  dangerous: boolean;
  explanation: string;
}

export interface AppPermission {
  id: string;
  label: string;
  needed: boolean;
  reason: string;
  granted: boolean | null;
}

export interface StoreApp {
  id: string;
  name: string;
  icon: string;
  description: string;
  permissions: AppPermission[];
}

export type GalleryImageKind = 'own' | 'friend' | 'protected' | 'screenshot' | 'free';

export interface GalleryImage {
  id: string;
  name: string;
  emoji: string;
  kind: GalleryImageKind;
  source: string;
  rights: string;
  hint: string;
  validActions: string[];
}
