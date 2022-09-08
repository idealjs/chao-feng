import type { PermissionTag, Profile, Workspace } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useProfile = () => {
  const { status } = useSession();

  const { data, isValidating } = useSWR<
    Profile & {
      workspaces: Workspace[];
      tags: PermissionTag[];
    }
  >(status !== "authenticated" ? null : "/api/v1/profile", fetcher);

  return { profile: data, isValidating };
};

export default useProfile;
