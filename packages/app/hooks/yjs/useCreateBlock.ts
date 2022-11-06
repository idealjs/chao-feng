import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { useCallback } from "react";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
import type { XmlFragment } from "yjs";

import { proxyBlocks, proxyPage } from "../../features/state";
import nanoid from "../../lib/nanoid";
import { useYDoc } from "../../lib/react-yjs";
import { IBlock } from "../../lib/type";
import usePageId from "../usePageId";

const useCreateBlock = () => {
  const pageId = usePageId();
  const yDoc = useYDoc();

  const createBlock = useCallback(
    (blockOptions: { type: string }) => {
      const { type } = blockOptions;

      let properties: Record<string, any> = schema
        .node("doc", null, [
          schema.node("paragraph", null, [schema.text("hello world!")]),
        ])
        .toJSON();

      if (type === "link") {
        properties = schema
          .node("doc", null, [
            schema.node("paragraph", null, [
              schema.text("hello link!", [
                schema.mark("link", {
                  title: "untitled",
                  href: "hello",
                }),
              ]),
            ]),
          ])
          .toJSON();
      }

      const key = "prosemirror";

      const doc = prosemirrorJSONToYDoc(schema, properties, key);

      if (pageId == null) {
        return;
      }
      const block: IBlock = {
        id: nanoid(),
        pageId,
        type,
        properties,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      proxyPage.blockOrder.push(block.id);
      proxyBlocks[block.id] = block;
      yDoc
        .getMap<XmlFragment>("prosemirror")
        .set(block.id, doc.getXmlFragment(key).clone());
    },
    [pageId, yDoc]
  );

  return createBlock;
};

export default useCreateBlock;
