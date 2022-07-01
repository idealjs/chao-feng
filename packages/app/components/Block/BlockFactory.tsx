import type { Block } from "@prisma/client";

import Text, { isTextBlock } from "./Text";

interface IProps {
  block: Block;
}

const BlockFactory = (props: IProps) => {
  const { block } = props;

  if (isTextBlock(block)) {
    return <Text blockId={block.id} />;
  }

  return <div>unknown block {block.type}</div>;
};
export default BlockFactory;
