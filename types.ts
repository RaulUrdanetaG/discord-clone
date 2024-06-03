import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMebersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
