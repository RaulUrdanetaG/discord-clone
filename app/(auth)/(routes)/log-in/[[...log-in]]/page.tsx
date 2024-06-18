"use client";

import TestUserButton from "@/components/test-user-button";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative">
      <SignIn />
      <div className="relative -top-10 z-50">
        <TestUserButton />
      </div>
    </div>
  );
}
