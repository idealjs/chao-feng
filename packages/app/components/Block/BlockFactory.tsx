import type { Block } from "@prisma/client";

import Text, { isTextBlock } from "./Text";
import Toolbox from "./Toolbox";

interface IProps {
  block: Block;
}

const BlockFactory = (props: IProps) => {
  const { block } = props;

  if (isTextBlock(block)) {
    return <Text block={block} />;
  }

  return (
    <div className="group relative">
      <Toolbox blockId={block.id} />
      unknown block {block.type}
    </div>
  );
};
export default BlockFactory;
