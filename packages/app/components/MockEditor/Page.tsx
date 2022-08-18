import { useEffect } from "react";

import { useSocket } from "../../features/SocketProvider";
import useInitPageDoc from "../../hooks/useInitPageDoc";
import usePageId from "../../hooks/usePageId";
import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import { IPage } from "../../lib/type";
import Block from "./Block";

const Page = () => {
  const pageId = usePageId();
  const yDoc = useYDoc();
  const blockOrder = useYDocSelector((yDoc) => {
    if (pageId == null) {
      return null;
    }
    return yDoc?.getMap<IPage>("pages").get(pageId)?.blockOrder;
  });

  useInitPageDoc(pageId);

  return (
    <div>
      {blockOrder?.map((blockId) => {
        return <Block key={blockId} blockId={blockId} />;
      })}
      <button
        onClick={() => {
          console.log(
            "test test",
            pageId,
            JSON.stringify(yDoc?.getMap("blockDocs").toJSON(), null, 2)
          );
        }}
      >
        test
      </button>
    </div>
  );
};
export default Page;
