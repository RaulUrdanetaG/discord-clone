"use client";

import { useServerData } from "@/hooks/use-server-data";
import ServerMember from "../server/server-member";
import { Profile } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import ServerSection from "../server/server-section";
import { useMembersSection } from "@/hooks/use-members-section";
import { cn } from "@/lib/utils";

export default function MembersList({
  currentProfile,
}: {
  currentProfile: Profile;
}) {
  const { serverData } = useServerData();

  return (
    <ScrollArea className="flex flex-1 flex-col bg-[#F2F3F5] dark:bg-[#2B2D31] h-full px-5 py-2">
      <ServerSection sectionType="members" label="Members" />
      {serverData.serverMembers.map((member) => (
        <ServerMember
          key={member.profileId}
          member={member}
          currentProfile={currentProfile}
        />
      ))}
    </ScrollArea>
  );
}
