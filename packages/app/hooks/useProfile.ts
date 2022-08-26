import type { PermissionTag, Profile, Workspace } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useProfile = () => {
  const { data, isValidating } = useSWR<
    Profile & {
      workspaces: Workspace[];
      tags: PermissionTag[];
    }
  >("/api/v1/profile", fetcher);

  return { profile: data, isValidating };
};

export default useProfile;
