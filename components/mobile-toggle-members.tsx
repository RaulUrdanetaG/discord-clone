import { Menu, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

import NavigationSidebar from "./navigation/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";
import MembersList from "./chat/members-list";
import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";

export async function MobileToggleMembers() {
  const profile = await currentProfile();

  if (!profile) return auth().redirectToSignIn();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-transparent"
        >
          <Users />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 flex gap-0">
        <MembersList currentProfile={profile} />
      </SheetContent>
    </Sheet>
  );
}
