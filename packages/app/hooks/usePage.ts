import { Block, Page, PermissionTag } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const usePage = (pageId: string) => {
  const { data, error, mutate, isValidating } = useSWR<
    Page & {
      blocks: Block[];
    }
  >(`/api/v1/pages/${pageId}`, fetcher);

  return { data, mutate };
};

export default usePage;
