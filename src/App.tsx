import PhoneFrame from './components/PhoneFrame';
import StatusBar from './components/StatusBar';
import HomeScreen from './components/HomeScreen';
import IntroScreen from './components/IntroScreen';
import FeedbackModal from './components/FeedbackModal';
import PhaseComplete from './components/PhaseComplete';
import FinalScreen from './components/FinalScreen';
import MissionCenter from './components/apps/MissionCenter';
import ChatApp from './components/apps/ChatApp';
import SocialApp from './components/apps/SocialApp';
import GalleryApp from './components/apps/GalleryApp';
import SettingsApp from './components/apps/SettingsApp';
import BrowserApp from './components/apps/BrowserApp';
import AppStoreApp from './components/apps/AppStore';
import TraceMap from './components/apps/TraceMap';
import { useGame } from './context/GameContext';

const APP_MAP = {
  mission: MissionCenter,
  chat: ChatApp,
  social: SocialApp,
  gallery: GalleryApp,
  settings: SettingsApp,
  browser: BrowserApp,
  appstore: AppStoreApp,
  tracemap: TraceMap,
} as const;

export default function App() {
  const { state } = useGame();

  let content;
  if (state.intro) content = <IntroScreen />;
  else if (state.screen === 'final') content = <FinalScreen />;
  else if (state.screen === 'app' && state.currentApp) {
    const AppView = APP_MAP[state.currentApp];
    content = <AppView />;
  } else content = <HomeScreen />;

  return (
    <PhoneFrame>
      <StatusBar />
      {content}
      <FeedbackModal />
      {state.screen !== 'final' && !state.intro && <PhaseComplete />}
    </PhoneFrame>
  );
}
