import { MembersWithProfile } from "@/types";
import { Channel } from "@prisma/client";
import { create } from "zustand";

interface ServerItemsData {
  textChannels: Channel[];
  audioChannels: Channel[];
  serverMembers: MembersWithProfile[];
}

interface ServerItemsStore {
  serverData: ServerItemsData;
  setData: (data: ServerItemsData) => void;
}

export const useServerData = create<ServerItemsStore>((set) => ({
  serverData: { textChannels: [], audioChannels: [], serverMembers: [] },
  setData: (data) => set({ serverData: data }),
}));
