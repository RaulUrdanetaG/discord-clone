"use client";

import TestUserButton from "@/components/test-user-button";
import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      {/* <Button onClick={onClick} /> */}
      <SignUp />
      <TestUserButton />
    </div>
  );
}
