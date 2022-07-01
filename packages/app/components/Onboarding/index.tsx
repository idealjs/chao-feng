import { useRouter } from "next/router";

import useProfile from "../../hooks/useProfile";
import WorkspaceCreator from "./WorkspaceCreator";

const Onboarding = () => {
  const profile = useProfile();
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
