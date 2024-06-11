"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestUserButton() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  async function loginAsTestUser() {
    try {
      setIsLoaded(false);
      const emailAddress = "test+clerk_test@example.com";
      const response = await signIn?.create({
        identifier: emailAddress,
      });

      const { emailAddressId } = response?.supportedFirstFactors.find(
        (ff) =>
          ff.strategy === "email_code" && ff.safeIdentifier === emailAddress
      )! as EmailCodeFactor;

      await signIn?.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailAddressId,
      });

      const attemptResponse = await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code: "424242",
      });

      if (attemptResponse?.status == "complete") {
        await setActive!({ session: attemptResponse.createdSessionId });
        setIsLoaded(true);

        router.refresh();
        router.push("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error iniciando sesión:", error);
    }
  }

  return (
    <>
      {!isLoaded && (
        <div className="bg-[#313338] flex flex-col mb-2 rounded-[3px] pb-4 px-10">
          <div className="flex flex-1 text-white items-center justify-center text-center my-3">
            <hr className="flex-1  border-t-[1px] border-solid border-white" />
            <span className="mx-2 text-center text-xs">or</span>
            <hr className="flex-1  border-t-[1px] border-solid border-white" />
          </div>
          <button
            className="bg-[#5865f2] px-[12px] py-[6px] rounded-[3px] text-sm font-semibold"
            onClick={loginAsTestUser}
          >
            Sign in as demo User
          </button>
        </div>
      )}
    </>
  );
}
