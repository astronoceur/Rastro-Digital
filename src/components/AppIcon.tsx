import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  Icon: LucideIcon;
  color: string;
  badge?: number;
  glow?: boolean;
  onClick: () => void;
}

export default function AppIcon({ label, Icon, color, badge, glow, onClick }: Props) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 group">
      <div className="relative">
        <div
          className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg border border-white/10 group-active:scale-95 transition ${
            glow ? 'animate-shadow-pulse' : ''
          }`}
        >
          <Icon className="text-white" size={26} strokeWidth={2.2} />
        </div>
        {badge !== undefined && badge > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-patrol-950">
            {badge}
          </div>
        )}
      </div>
      <span className="text-[11px] text-white/90 font-medium leading-tight text-center">
        {label}
      </span>
    </button>
  );
}
