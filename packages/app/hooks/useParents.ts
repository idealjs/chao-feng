import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useParents = (pageId: string | undefined) => {
  const { data } = useSWR(
    pageId != null ? `/api/v1/pages/parent?pageId=${pageId}` : null,
    fetcher
  );

  return data;
};

export default useParents;
