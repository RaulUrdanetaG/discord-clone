import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const profile = await currentProfile();

  //check if there is a profile logged in
  if (!profile) return auth().redirectToSignIn();

  // check if inviteCode param exists
  if (!params.inviteCode) return redirect("/");

  //1. Get the server with the invite code from params
  //2. In members table check if there's a user
  //   with the profile ID from current user
  //   and the server found in step 1.
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  //If the user was already in the server redrect the page to that server
  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  //If there's no server with that user
  //1. Find the server with the same invitation link
  //2. Create a member in members table with the current user ID
  //   and the server found in step 1.
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  //Check if the creation was successful
  if (server) return redirect(`/servers/${server.id}`);

  return <div>invite page</div>;
}
