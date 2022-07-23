import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

import HeroInput from "../../components/HeroInput";
import useCreateWorkspace from "../../hooks/api/useCreateWorkspace";
import useProfile from "../../hooks/useProfile";

const Onboarding = () => {
  const { profile } = useProfile();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const createWorkspace = useCreateWorkspace();

  if (profile?.lastActive) {
    router.push(`/${profile.lastActive}`);
  }

  return (
    <HeroInput
      title="Create Your Workspace"
      content="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
      excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
      a id nisi."
      input={{
        label: "Workspace Name",
        placeholder: "workspace name",
      }}
      button={{
        check: "Go",
      }}
      check={async (input) => {
        await createWorkspace(input ?? "");
        mutate("/api/v1/profile");
        return false;
      }}
    />
  );
};
export default Onboarding;
