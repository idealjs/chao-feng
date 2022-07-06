import { DndContext, useSensors } from "@dnd-kit/core";
import { closestCenter, useSensor } from "@dnd-kit/core";
import { animated, useSprings } from "@react-spring/web";
import { Fragment } from "react";

import useBlockOrder from "../../hooks/useBlockOrder";
import usePage from "../../hooks/usePage";
import useStateRef from "../../lib/useStateRef";
import Block from "../Block";
import SpringApiProvider from "../Block/Toolbox/SpringApiProvider";
import Empty from "./Empty";

interface IProps {
  pageId: string;
}

const Page = (props: IProps) => {
  const { pageId } = props;
  const page = usePage(pageId);
  const blockOrder = useBlockOrder(pageId);
  const blockOrderRef = useStateRef(blockOrder);

  const [springs, api] = useSprings(blockOrder?.length ?? 0, (index) => {
    return { y: 0 };
  });

  return (
    <Fragment>
      <div className="flex-1 flex flex-col ">
        <div className="h-12">head</div>
        <div className="flex-1 h-full">
          <div className="flex flex-1 justify-center">
            <div className="pl-24 w-3/5">
              {page?.name != null ? page.name : "untitled"}
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="px-24 w-3/5 pb-36 max-w-5xl">
              {(blockOrder == null || blockOrder?.length === 0) && (
                <Empty pageId={pageId} />
              )}
              <SpringApiProvider api={api}>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragMove={(e) => {
                    api.start((index) => {
                      const blockIndex = blockOrderRef.current?.indexOf(
                        e.active.id as string
                      );
                      if (index === blockIndex) {
                        return { y: e.delta.y };
                      }
                      return {
                        y: 0,
                      };
                    });
                  }}
                >
                  {springs?.map(({ y }, index) => {
                    return (
                      <animated.div
                        key={index}
                        style={{ y, touchAction: "none" }}
                      >
                        {blockOrder?.[index] && (
                          <Block blockId={blockOrder?.[index]} />
                        )}
                      </animated.div>
                    );
                  })}
                </DndContext>
              </SpringApiProvider>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
