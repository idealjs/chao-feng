import { useSnapshot } from "valtio";

import { state } from ".";
import Block from "./Block";

const Page = () => {
  const snapshot = useSnapshot(state);
  return (
    <div>
      {snapshot.blockOrders?.map((blockId) => {
        return <Block key={blockId} blockId={blockId} />;
      })}
    </div>
  );
};
export default Page;
