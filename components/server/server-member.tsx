"use client";

import { MemberRole, Profile } from "@prisma/client";
import { Shield, ShieldCheck } from "lucide-react";
import UserAvatar from "../user-avatar";
import { MembersWithProfile } from "@/types";
import { useParams, useRouter } from "next/navigation";

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4  text-indigo-500" />,
  [MemberRole.ADMIN]: <Shield className="h-4 w-4 text-rose-500" />,
};

export default function ServerMember({
  member,
  currentProfile,
}: {
  member: MembersWithProfile;
  currentProfile: Profile;
}) {
  const router = useRouter();
  const params = useParams();

  function onClick(id: string) {
    return router.push(`/servers/${params?.serverId}/conversations/${id}`);
  }

  return (
    <button
      className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
      disabled={member.profile.id === currentProfile.id}
      onClick={() => {
        onClick(member.id);
      }}
    >
      <UserAvatar className="max-h-5 max-w-5" src={member.profile.imageUrl} />
      <p className="text-start line-clamp-1">{member.profile.name}</p>
      <div className="max-h-5 max-w-5">{roleIconMap[member.role]}</div>
    </button>
  );
}
