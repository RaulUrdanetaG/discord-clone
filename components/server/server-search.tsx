"use client";

import { DiWindows } from "react-icons/di";

import { Hash, Search, Shield, ShieldCheck, Volume2 } from "lucide-react";
import { KeyboardEvent, useEffect, useState } from "react";
import {
  CommandInput,
  CommandDialog,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { useParams, useRouter } from "next/navigation";
import { useServerData } from "@/hooks/use-server-data";
import { ChannelType, MemberRole } from "@prisma/client";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Volume2 className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Volume2 className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <Shield className="h-4 w-4 mr-2 text-rose-500" />,
};

export default function ServerSearch() {
  const { serverData } = useServerData();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  console.log(serverData);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };

    const handleCommand = down as unknown as EventListener;

    document.addEventListener("keydown", handleCommand);
    return () => document.removeEventListener("keydown", handleCommand);
  }, []);

  function onClick({ id, type }: { id: string; type: "channel" | "member" }) {
    setIsOpen(false);

    if (type === "member")
      return router.push(`/server/${params?.serverId}/conversations/${id}`);

    if (type === "channel")
      return router.push(`/server/${params?.serverId}/channels/${id}`);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 dark:bg-[#1E1F22]"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 
        group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center 
        gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-sm">
            <DiWindows />
          </span>
          + k
        </kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {serverData.textChannels && (
            <CommandGroup heading="Text Channels">
              {serverData.textChannels?.map((channel) => (
                <CommandItem key={channel.id}>
                  {iconMap["TEXT"]}
                  <span>{channel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {serverData.audioChannels && (
            <CommandGroup heading="Voice Channels">
              {serverData.audioChannels?.map((channel) => (
                <CommandItem key={channel.id}>
                  {iconMap["AUDIO"]}
                  <span>{channel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {serverData.serverMembers && (
            <CommandGroup heading="Voice Channels">
              {serverData.serverMembers?.map((member) => (
                <CommandItem key={member.id}>
                  {roleIconMap[member.role]}
                  <span>{member.profile.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
