"use client";

import TestUserButton from "@/components/test-user-button";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <SignIn />
      <TestUserButton />
    </div>
  );
}
