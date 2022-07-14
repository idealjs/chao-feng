import type { Page, Workspace } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useWorkspaceRouter = (workspaceId: string | null | undefined) => {
  const { data } = useSWR<
    Workspace & {
      pages: Page[];
    }
  >(
    workspaceId != null
      ? `/api/v1/workspaces/router?workspaceId=${workspaceId}`
      : null,
    fetcher
  );

  return data;
};

export default useWorkspaceRouter;
