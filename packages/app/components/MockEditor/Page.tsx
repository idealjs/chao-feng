import usePageId from "../../hooks/usePageId";
import { useYDocSelector } from "../../lib/react-yjs";
import Block from "./Block";

const Page = () => {
  const blockOrder = useYDocSelector((root) => {
    return root?.getArray<string>("blockOrder");
  });
  console.log("test test", blockOrder?.toJSON());
  return (
    <div>
      {blockOrder?.map((blockId) => {
        return <Block key={blockId} blockId={blockId} />;
      })}
    </div>
  );
};
export default Page;
