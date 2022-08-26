import BlockFactory from "./BlockFactory";

interface IProps {
  blockId: string;
}

const EditorBlock = (props: IProps) => {
  const { blockId } = props;

  return <BlockFactory blockId={blockId} />;
};

export default EditorBlock;
