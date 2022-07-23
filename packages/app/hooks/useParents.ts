import useSWR from "swr";

import fetcher from "../lib/fetcher";

interface IPage {
  parentId: string | null;
  id: string;
  name: string | null;
}

const useParents = (pageId: string | undefined) => {
  const { data } = useSWR<IPage[]>(
    pageId != null ? `/api/v1/pages/parent?pageId=${pageId}` : null,
    fetcher
  );

  return [...(data ?? [])].reverse();
};

export default useParents;
