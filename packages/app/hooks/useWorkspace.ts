import type { Workspace } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useWorkspace = (workspaceId: string | null | undefined) => {
  const { data } = useSWR<Workspace>(
    workspaceId != null ? `/api/v1/workspaces/${workspaceId}` : null,
    fetcher
  );

  return data;
};

export default useWorkspace;
