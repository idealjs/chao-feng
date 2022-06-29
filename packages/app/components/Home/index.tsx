import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import useProfile from "../../hooks/useProfile";
import SignIn from "./SignIn";

const Home = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { data: profile } = useProfile();

  if (status === "loading") {
    return null;
  }

  if (session == null) {
    return <SignIn />;
  }

  if (session != null && profile?.lastActive == null) {
    router.push("/onboarding");
  }

  if (profile?.lastActive != null) {
    router.push(`/${profile.lastActive}`);
  }

  return null;
};

export default Home;
