import { useMemo } from "react";

import usePage from "./usePage";

const useBlockOrder = (pageId: string) => {
  const page = usePage(pageId);

  return useMemo(() => page?.blockOrder?.split(","), [page?.blockOrder]);
};

export default useBlockOrder;
