import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { useRef } from "react";

import useBlock from "../../hooks/useBlock";
import BlockFactory from "./BlockFactory";
import BindContext from "./Toolbox/BindContext";
import RefContext from "./Toolbox/RefContext";

interface IProps {
  blockId: string;
  bind: (...args: any[]) => ReactDOMAttributes;
}

const Block = (props: IProps) => {
  const { blockId, bind } = props;
  const block = useBlock(blockId);
  const blockRef = useRef<HTMLDivElement>(null);

  return block ? (
    <BindContext bindFunc={() => bind(blockId, blockRef)}>
      <RefContext blockRef={blockRef}>
        <BlockFactory block={block} />
      </RefContext>
    </BindContext>
  ) : null;
};
export default Block;
