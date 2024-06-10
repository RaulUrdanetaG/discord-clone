import ChatInput from "@/components/chat/chat-input";

import ChatHeader from "@/components/chat/chat-header";
import MembersList from "@/components/chat/members-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatMessages from "@/components/chat/chat-messages";
import { ChannelType } from "@prisma/client";
import MediaRoom from "@/components/media-room";

interface ChannelIdProps {
  serverId: string;
  channelId: string;
}

export default async function ChannelIdPage({
  params,
}: {
  params: ChannelIdProps;
}) {
  const profile = await currentProfile();

  if (!profile) return auth().redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full min-h-screen">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <div className="flex flex-1 h-full min-h-0">
          <div className="bg-white dark:bg-[#313338] flex flex-col flex-1 h-full min-h-0">
            <ChatMessages
              name={channel.name}
              member={member}
              chatId={channel.id}
              type="channel"
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />
            <ChatInput
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{ channelId: channel.id, serverId: channel.serverId }}
            />
          </div>
          <div className="hidden lg:flex max-w-60">
            <MembersList currentProfile={profile} />
          </div>
        </div>
      )}
      {channel.type === ChannelType.AUDIO && (
        <div className="h-full min-h-0 overflow-hidden">
          <MediaRoom chatId={channel.id} audio={true} video={false} />
        </div>
      )}
    </div>
  );
}
