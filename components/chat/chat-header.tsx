import { Hash, Users } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import ServerSearch from "../server/server-search";
import { Button } from "../ui/button";
import UserAvatar from "../user-avatar";
import { useMembersSection } from "@/hooks/use-members-section";
import { MobileToggleMembers } from "../mobile-toggle-members";

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
          <Hash className="w-5 h-5 text-[#6D6F78] mr-2" />
        )}
        {type === "conversation" && (
          <UserAvatar src={imageUrl} className="w-5 h-5 md:h-5 md:w-5 mr-2" />
        )}
        <p className="font-semibold text-md text-black dark:text-white line-clamp-1">
          {name}
        </p>
      </aside>
      <aside className="flex items-center gap-1">
        <MobileToggleMembers />
        <ServerSearch />
      </aside>
    </div>
  );
}
