import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useRef } from "react";

import HeroInput from "../../components/HeroInput";
import checkAuth from "./checkAuth";

const SignIn = () => {
  const callbackUrlRef = useRef<string | undefined>();

  const router = useRouter();
  return (
    <HeroInput
      check={async (input) => {
        const res = await checkAuth(input);
        if (res.allow) {
          const signInRes = await signIn("email", {
            email: input,
            callbackUrl: "/",
            redirect: false,
          });
          callbackUrlRef.current = signInRes?.url ?? undefined;
          return true;
        }
        return false;
      }}
      next={async (input, nextInput) => {
        const params = new URLSearchParams({
          email: input ?? "",
          token: nextInput ?? "",
          callbackUrl: callbackUrlRef.current ?? "",
        });

        window.location.href = `${
          router.basePath
        }/api/auth/callback/email?${params.toString()}`;
      }}
    />
  );
};

export default SignIn;
