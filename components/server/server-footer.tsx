"use client";

import { UserButton } from "@clerk/nextjs";
import { Profile } from "@prisma/client";

export default function ServerFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="dark:bg-[#232428] bg-[#EBEDEF]">
      <section className="p-2 text-xs">Connection status component</section>
      <section
        className="flex p-2 gap-2 border-[#D2D4D8] 
        dark:border-[#37393F] border-t-[1px]"
      >
        <UserButton />
        <div className="flex flex-col line-clamp-1 pr-1 transition">
          <p className="text-[#060607] dark:text-[#F2F3F5] text-sm line-clamp-1">
            {profile.name}
          </p>
          <p className=" text-[#4E5058] dark:text-[#B5BAC1] text-xs line-clamp-1">
            {profile.email}
          </p>
        </div>
      </section>
    </footer>
  );
}
