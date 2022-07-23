import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useRef } from "react";

import HeroInput from "../../components/HeroInput";
import checkAuth from "./checkAuth";

const SignIn = () => {
  const router = useRouter();
  return (
    <HeroInput
      check={async (input) => {
        const res = await checkAuth(input);
        if (res.allow) {
          await signIn("email", {
            email: input,
            callbackUrl: "/",
            redirect: false,
          });
          return true;
        }
        return false;
      }}
      next={async (input, nextInput) => {
        const params = new URLSearchParams({
          email: input ?? "",
          token: nextInput ?? "",
          callbackUrl: router.basePath,
        });

        router.push(`/api/auth/callback/email?${params.toString()}`);
      }}
    />
  );
};

export default SignIn;
