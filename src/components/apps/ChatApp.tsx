import { AlertTriangle, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import MissionBanner from '../MissionBanner';
import { CHAT_CONVERSATIONS } from '../../data/mockData';
import { ChatConversation } from '../../types';

export default function ChatApp() {
  const { investigateChat } = useGame();
  const [open, setOpen] = useState<ChatConversation | null>(null);

  if (open) {
    return (
      <Conversation
        conversation={open}
        onBack={() => {
          setOpen(null);
        }}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner title="Chat Escolar" subtitle="Conversas e pistas" />
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {CHAT_CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setOpen(c);
              if (c.id === 'c1') investigateChat();
            }}
            className="w-full app-card p-3 flex items-center gap-3 hover:bg-white/10 transition text-left"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                c.id === 'c3'
                  ? 'bg-rose-500/20 border border-rose-500/40 animate-pulse-slow'
                  : 'bg-patrol-700/50'
              }`}
            >
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-white font-semibold text-sm truncate">{c.name}</div>
                {c.id === 'c3' && (
                  <AlertTriangle size={12} className="text-rose-400 shrink-0" />
                )}
              </div>
              <div className="text-xs text-white/60 truncate">{c.lastMessage}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {c.unread > 0 && (
                <div className="bg-cyan-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                  {c.unread}
                </div>
              )}
              <ChevronRight size={16} className="text-white/40" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Conversation({
  conversation,
  onBack,
}: {
  conversation: ChatConversation;
  onBack: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <MissionBanner
        title={conversation.name}
        subtitle="Conversa"
        onBack={onBack}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversation.messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] ${m.me ? 'ml-auto' : ''} ${
              m.highlight ? 'ring-2 ring-amber-400/40 rounded-2xl' : ''
            }`}
          >
            {!m.me && (
              <div className="text-[10px] text-white/50 ml-1 mb-0.5 font-semibold">
                {m.author}
              </div>
            )}
            <div
              className={`p-3 rounded-2xl text-sm ${
                m.me
                  ? 'bg-gradient-to-br from-cyan-500 to-patrol-600 text-white rounded-br-md'
                  : m.highlight
                    ? 'bg-amber-400/15 border border-amber-400/30 text-white rounded-bl-md'
                    : 'bg-white/10 text-white rounded-bl-md'
              }`}
            >
              {m.text}
              <div className="text-[10px] text-white/50 mt-1 text-right">{m.time}</div>
            </div>
            {m.highlight && (
              <div className="text-[10px] text-amber-300 ml-1 mt-1 font-semibold">
                ⚠ Pista para a investigação
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
