import type { Block } from "@prisma/client";

import Text, { isTextBlock } from "./Text";
import Toolbox from "./Toolbox";

interface IProps {
  block: Block;
}

const BlockFactory = (props: IProps) => {
  const { block } = props;

  if (isTextBlock(block)) {
    return (
      <Toolbox blockId={block.id}>
        <Text block={block} />
      </Toolbox>
    );
  }

  return <Toolbox blockId={block.id}>unknown block {block.type}</Toolbox>;
};
export default BlockFactory;
