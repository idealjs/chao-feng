import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

import useProfile from "../../hooks/useProfile";

const Home = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { profile, isValidating } = useProfile();

  if (status === "loading" || isValidating) {
    return null;
  }

  if (profile?.lastActive != null) {
    router.push(`/${profile.lastActive}`);
    return null;
  }

  if (session != null && profile?.lastActive == null) {
    router.push("/onboarding");
    return null;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary" onClick={() => signIn()}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
