import { Fragment } from "react";

import { IBlock, IPageBlock } from "../../../lib/type";
import { useBlock } from "../../../store/blocks";
import Block from "..";

interface IProps {
  blockId: string;
}

const Page = (props: IProps) => {
  const { blockId } = props;
  const block = useBlock(blockId);

  return (
    <Fragment>
      {block?.content.map((id) => {
        return <Block key={id} blockId={id} />;
      })}
    </Fragment>
  );
};

export default Page;

export const isPageBlock = (block?: IBlock): block is IPageBlock => {
  if (block?.type === "page") {
    return true;
  }
  return false;
};
