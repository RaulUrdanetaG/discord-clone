import { currentProfile } from "@/lib/current-profile";
import { ChannelType } from "@prisma/client";
import { db } from "@/lib/db";

import ServerHeader from "./server-header";
import ServerSection from "./server-section";

import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import ServerChannel from "./server-channel";
import ServerFooter from "./server-footer";
import ServerDataSave from "./server-data-save";

interface ServerSidebarProps {
  serverId: string;
}

export default async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const members = server?.members.filter((member) => member.id !== profile.id);

  if (!server || !textChannels || !audioChannels || !members)
    return redirect("/");

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <ServerDataSave
          textChannels={textChannels}
          audioChannels={audioChannels}
          serverMembers={members}
        />
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            {audioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      <ServerFooter profile={profile} />
    </div>
  );
}
