import usePageId from "../../hooks/usePageId";
import useInitPageDoc from "../../hooks/yjs/useInitPageDoc";
import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import { IPage } from "../../lib/type";
import Block from "./Block";

const Page = () => {
  const pageId = usePageId();
  const rootDoc = useYDoc();
  const blockOrder = useYDocSelector(rootDoc, (yDoc) => {
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
            JSON.stringify(rootDoc?.getMap("docMapOfBlockProperties").toJSON(), null, 2)
          );
        }}
      >
        test
      </button>
    </div>
  );
};
export default Page;
