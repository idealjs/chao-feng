import { useDebugValue } from "react";

import { useBlock } from "../../store/blocks";
import Page, { isPageBlock } from "./Page";
import Text, { isTextBlock } from "./Text";

interface IProps {
  blockId: string;
}
const Block = (props: IProps) => {
  const { blockId } = props;
  const block = useBlock(blockId);

  if (isPageBlock(block)) {
    return <Page blockId={blockId} />;
  }

  if (isTextBlock(block)) {
    return <Text blockId={blockId} />;
  }

  return <div>Block</div>;
};
export default Block;
