import { PermissionTag, Profile, Workspace } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useProfile = () => {
  const { data } = useSWR<
    Profile & {
      workspaces: Workspace[];
      tags: PermissionTag[];
    }
  >("/api/v1/profile", fetcher);

  return data;
};

export default useProfile;
