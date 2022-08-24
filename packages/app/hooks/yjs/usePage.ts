import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import { IPage } from "../../lib/type";

const usePage = (pageId: string | undefined) => {
  const rootDoc = useYDoc();
  return useYDocSelector(rootDoc, (yDoc) => {
    if (pageId == null) {
      return null;
    }
    return yDoc?.getMap<IPage>("pages").get(pageId);
  });
};

export default usePage;
