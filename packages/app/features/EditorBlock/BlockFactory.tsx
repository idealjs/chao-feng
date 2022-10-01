import useBlock from "../../hooks/yjs/useBlock";
import useLoadPropertiesDoc from "../../hooks/yjs/useLoadPropertiesDoc";
import useSyncPropertiesDoc from "../../hooks/yjs/useSyncPropertiesDoc";
import Link, { isLinkBlock } from "./Link";
import Text, { isTextBlock } from "./Text";
import Toolbox from "./Toolbox";

interface IProps {
  blockId: string;
}

const BlockFactory = (props: IProps) => {
  const { blockId } = props;

  const block = useBlock(blockId);

  // useSyncPropertiesDoc(blockId);
  // useLoadPropertiesDoc(blockId);

  if (isTextBlock(block)) {
    return (
      <Toolbox blockId={blockId}>
        <Text blockId={blockId} />
      </Toolbox>
    );
  }

  if (isLinkBlock(block)) {
    return (
      <Toolbox blockId={blockId}>
        <Link blockId={blockId} />
      </Toolbox>
    );
  }

  return <Toolbox blockId={blockId}>unknown block {block?.type}</Toolbox>;
};

export default BlockFactory;
