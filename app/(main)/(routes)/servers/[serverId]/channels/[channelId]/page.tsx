import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import MembersList from "@/components/chat/members-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function ChannelIdPage({ params }: ChannelIdProps) {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1">Future Messages</div>
      <ChatInput />
    </div>
  );
}
