import BlockFactory from "./BlockFactory";

interface IProps {
  blockId: string;
}

const Block = (props: IProps) => {
  const { blockId } = props;

  return <BlockFactory blockId={blockId} />;
};

export default Block;
