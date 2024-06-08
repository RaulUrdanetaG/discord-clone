import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { db } from "./db";

export async function currentProfilePages(req: NextApiRequest) {
  const { userId } = getAuth(req);

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}
