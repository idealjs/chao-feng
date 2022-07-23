import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import HeroInput from "../../components/HeroInput";
import checkAuth from "./checkAuth";

const SignIn = () => {
  const router = useRouter();
  return (
    <HeroInput
      title="Login now!"
      content="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
      excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
      a id nisi."
      input={{
        label: "Email",
        placeholder: "email",
      }}
      nextInput={{
        label: "Security Code",
        placeholder: "security code",
      }}
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
