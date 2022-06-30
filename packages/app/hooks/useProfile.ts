import { PermissionTag, Profile, Workspace } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useProfile = () => {
  const { data, error, mutate, isValidating } = useSWR<
    Profile & {
      workspaces: Workspace[];
      tags: PermissionTag[];
    }
  >("/api/v1/profile", fetcher);
  return { data, mutate };
};

export default useProfile;
