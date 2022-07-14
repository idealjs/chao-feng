import { useMemo } from "react";

import usePage from "./usePage";

const useBlockOrder = (pageId: string) => {
  const page = usePage(pageId);

  return useMemo(() => page?.blockOrder as string[], [page?.blockOrder]);
};

export default useBlockOrder;
