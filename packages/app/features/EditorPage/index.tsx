import {
  closestCenter,
  DndContext,
  MouseSensor,
  useDroppable,
  useSensors,
} from "@dnd-kit/core";
import { useSensor } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import useBlockOrder from "../../hooks/yjs/useBlockOrder";
import usePage from "../../hooks/yjs/usePage";
import EditorBlock from "../EditorBlock";
import Empty from "./Empty";
import Head from "./Head";

interface IProps {
  pageId: string;
}

const EditorPage = (props: IProps) => {
  const { pageId } = props;
  const page = usePage(pageId);
  const blockOrder = useBlockOrder(pageId);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const { setNodeRef } = useDroppable({ id: "page" });

  return (
    <div className="h-full w-full">
      <div className="h-full">
        <Head />
        <div className="flex justify-center">
          <h1 className="w-4/5 xl:px-24 max-w-5xl">
            {page?.name != null ? page.name : "untitled"}
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="w-4/5 xl:px-24 max-w-5xl lg:pb-36">
            {(blockOrder == null || blockOrder?.length === 0) && (
              <Empty pageId={pageId} />
            )}
            {blockOrder && (
              <DndContext sensors={sensors} collisionDetection={closestCenter}>
                <SortableContext
                  id={"page"}
                  items={blockOrder}
                  strategy={rectSortingStrategy}
                >
                  <div ref={setNodeRef} className="bg-white">
                    {blockOrder?.map((blockId) => {
                      return <EditorBlock key={blockId} blockId={blockId} />;
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
