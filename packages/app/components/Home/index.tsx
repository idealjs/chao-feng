import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Fragment, useEffect } from "react";

import useProfile from "../../hooks/useProfile";
import Profile from "./Profile";
import SignIn from "./SignIn";

const Test = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { data: profile } = useProfile();

  if (session != null && profile?.lastActive == null) {
    router.push("onboarding");
  }
  useEffect(() => {

  }, [profile?.lastActive, router, session]);

  if (status === "loading") {
    return null;
  }

  return (
    <Fragment>{session ? <Profile session={session} /> : <SignIn />}</Fragment>
  );
};

export default Test;
