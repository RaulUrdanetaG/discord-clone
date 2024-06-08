"use client";

import { SignalHigh, SignalLow } from "lucide-react";
import { useSocket } from "./providers/socket-provider";

export default function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div className="text-yellow-600 flex flex-col items-start text-lg font-semibold hover:cursor-pointer">
        <aside className="flex items-center justify-center">
          <SignalLow className="w4 h-4" />
          <span className="hover:underline">Low Signal</span>
        </aside>
        <p className="text-xs text-[#4E5058] dark:text-[#B5BAC1] font-thin">
          Not connected to Audio/Text channels
        </p>
      </div>
    );
  }

  return (
    <div className="text-[#2DC770] flex flex-col items-start text-lg font-semibold hover:cursor-pointer">
      <aside className="flex items-center justify-center">
        <SignalHigh className="w4 h-4" />
        <span className="hover:underline">Connected</span>
      </aside>
      <p className="text-xs text-[#4E5058] dark:text-[#B5BAC1] font-thin">
        Connected to Audio/Text channels
      </p>
    </div>
  );
}
