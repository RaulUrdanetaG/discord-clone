import ChatHeader from "@/components/chat/chat-header";
import MembersList from "@/components/chat/members-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChannelIdProps {
  serverId: string;
  channelId: string;
}

export default async function ChannelIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
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
        <div className="flex flex-col flex-1 h-full">{children}</div>
        {channel.type !== "AUDIO" && (
          <div className="hidden md:flex w-60">
            <MembersList currentProfile={profile} />
          </div>
        )}
      </section>
    </div>
  );
}
