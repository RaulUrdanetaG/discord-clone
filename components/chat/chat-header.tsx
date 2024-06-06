import { channel } from "diagnostics_channel";
import { Hash, Menu, Users } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import ServerSearch from "../server/server-search";
import { Button } from "../ui/button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export default function ChatHeader({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) {
  return (
    <div className="text-md font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <aside className="flex items-center">
        <MobileToggle serverId={serverId} />
        {type === "channel" && (
          <Hash className="w-5 h-5 text-zinc-50 dark:text-zinc-400 mr-2" />
        )}
        <p className="font-semibold text-md text-black dark:text-white line-clamp-1">
          {name}
        </p>
      </aside>
      <aside className="flex items-center gap-1">
        <Button variant="ghost" className="hover:bg-transparent">
          <Users />
        </Button>
        <ServerSearch />
      </aside>
    </div>
  );
}
