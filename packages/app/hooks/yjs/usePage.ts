import { useSnapshot } from "valtio";

import { proxyPage } from "../../features/state";

const usePage = (pageId: string | undefined) => {
  return useSnapshot(proxyPage);
};

export default usePage;
