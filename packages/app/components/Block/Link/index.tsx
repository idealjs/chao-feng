import { Block } from "@prisma/client";

import { Decoration, IBaseTextBlock } from "../../../lib/type";

export interface ILinkBlock extends IBaseTextBlock {
  type: "text";
  properties: {
    title?: Decoration | undefined;
    linkId: string;
  };
}

interface IProps {
  block: ILinkBlock;
}

const Link = (props: IProps) => {
  const { block } = props;
  return <div>Link {block.properties.linkId}</div>;
};

export default Link;

export const isLinkBlock = (block?: Block): block is ILinkBlock => {
  if (block?.type === "link") {
    return true;
  }
  return false;
};
