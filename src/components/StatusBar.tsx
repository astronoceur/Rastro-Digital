import { BatteryFull, Signal, Wifi } from 'lucide-react';

export default function StatusBar() {
  const time = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center justify-between px-7 pt-2.5 pb-1 text-xs text-white/90 font-semibold">
      <div>{time}</div>
      <div className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <BatteryFull size={14} />
      </div>
    </div>
  );
}
