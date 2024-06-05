"use client";

import { useServerData } from "@/hooks/use-server-data";
import { MembersWithProfile } from "@/types";
import { Channel } from "@prisma/client";
import { useEffect } from "react";

interface ServerSaveData {
  textChannels: Channel[];
  audioChannels: Channel[];
  serverMembers: MembersWithProfile[];
}

export default function ServerDataSave({
  textChannels,
  audioChannels,
  serverMembers,
}: ServerSaveData) {
  const { setData } = useServerData();

  useEffect(() => {
    setData({ textChannels, audioChannels, serverMembers });
  }, [textChannels, audioChannels, serverMembers, setData]);
  return <></>;
}
