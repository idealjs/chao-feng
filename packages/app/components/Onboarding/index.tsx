import { useRouter } from "next/router";
import { useCallback } from "react";

import useProfile from "../../hooks/useProfile";
import WorkspaceCreator from "./WorkspaceCreator";

const Onboarding = () => {
  const { data: profile } = useProfile();
  const router = useRouter();
  if (profile?.lastActive) {
    router.push(`/${profile.lastActive}`);
  }
  return (
    <div>
      <WorkspaceCreator />
    </div>
  );
};
export default Onboarding;
