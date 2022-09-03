import type { Block } from "@prisma/client";

import useBlock from "../../hooks/yjs/useBlock";
import useLoadPropertiesDoc from "../../hooks/yjs/useLoadPropertiesDoc";
import useSyncPropertiesDoc from "../../hooks/yjs/useSyncPropertiesDoc";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Link, { isLinkBlock } from "./Link";
import Text, { isTextBlock } from "./Text";
import Toolbox from "./Toolbox";

interface IProps {
  blockId: string;
}

const BlockFactory = (props: IProps) => {
  const { blockId } = props;

  const rootDoc = useYDoc();
  const block = useBlock(blockId);

  useSyncPropertiesDoc(blockId);
  useLoadPropertiesDoc(blockId);

  if (isTextBlock(block)) {
    return (
      <Toolbox blockId={block.id}>
        <Text blockId={block.id} />
      </Toolbox>
    );
  }

  if (isLinkBlock(block)) {
    return (
      <Toolbox blockId={block.id}>
        <Link blockId={block.id} />
      </Toolbox>
    );
  }

  return <Toolbox blockId={blockId}>unknown block {block?.type}</Toolbox>;
};

export default BlockFactory;
