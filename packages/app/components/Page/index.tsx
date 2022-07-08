import {
  closestCenter,
  DndContext,
  MouseSensor,
  useDroppable,
  useSensors,
} from "@dnd-kit/core";
import { useSensor } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment } from "react";

import useBlockOrder from "../../hooks/useBlockOrder";
import usePage from "../../hooks/usePage";
import rectIntersection from "../../lib/rectIntersection";
import Block from "../Block";
import Empty from "./Empty";

interface IProps {
  pageId: string;
}

const Page = (props: IProps) => {
  const { pageId } = props;
  const page = usePage(pageId);
  const blockOrder = useBlockOrder(pageId);

  const sensors = useSensors(useSensor(MouseSensor));

  const { setNodeRef } = useDroppable({ id: "page" });

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
              {blockOrder && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={rectIntersection}
                >
                  <SortableContext
                    id={"page"}
                    items={blockOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    <div ref={setNodeRef} style={{ background: "#e2dfdf" }}>
                      {blockOrder?.map((blockId) => {
                        return <Block key={blockId} blockId={blockId} />;
                      })}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
