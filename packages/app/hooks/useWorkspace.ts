import { Workspace } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useWorkspace = (workspaceId: string | null | undefined) => {
  const { data, error, mutate, isValidating } = useSWR<Workspace>(
    workspaceId != null ? `/api/v1/workspaces/${workspaceId}` : null,
    fetcher
  );
  return { data, mutate };
};

export default useWorkspace;
