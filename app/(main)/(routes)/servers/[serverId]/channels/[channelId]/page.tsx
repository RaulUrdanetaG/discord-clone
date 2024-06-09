import ChatInput from "@/components/chat/chat-input";

import ChatHeader from "@/components/chat/chat-header";
import MembersList from "@/components/chat/members-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatMessages from "@/components/chat/chat-messages";

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
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <section className="flex h-full">
        <div className="flex flex-col flex-1 h-full">
          <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
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
        </div>
        {channel.type !== "AUDIO" && (
          <div className="hidden lg:flex max-w-60">
            <MembersList currentProfile={profile} />
          </div>
        )}
      </section>
    </div>
  );
}
