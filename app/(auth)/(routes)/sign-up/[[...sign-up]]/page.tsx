"use client";

import TestUserButton from "@/components/test-user-button";
import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative">
      <SignUp />
      <div className="relative -top-10 z-50">
        <TestUserButton />
      </div>
    </div>
  );
}
