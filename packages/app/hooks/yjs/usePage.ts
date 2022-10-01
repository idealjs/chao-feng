import { useSnapshot } from "valtio";

import { proxyPage } from "../../features/state";
import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import { IPage } from "../../lib/type";

const usePage = (pageId: string | undefined) => {
  return useSnapshot(proxyPage);
};

export default usePage;
