import type { Page } from "@prisma/client";
import useSWR from "swr";

import fetcher from "../lib/fetcher";

const usePage = (pageId: string | undefined) => {
  const { data } = useSWR<Page>(
    pageId != null ? `/api/v1/pages/${pageId}` : null,
    fetcher
  );

  return data;
};

export default usePage;
