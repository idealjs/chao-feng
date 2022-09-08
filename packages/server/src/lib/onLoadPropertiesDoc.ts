import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { Socket } from "socket.io";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
import { Doc, encodeStateAsUpdate } from "yjs";

const onLoadPropertiesDoc =
  (options: { socket: Socket; yDoc: Doc }) =>
  async (msg: { blockId: string }) => {
    const { socket, yDoc } = options;

    console.group("[debug] LOAD_PROPERTIES_DOC");

    let propertiesDoc =
      yDoc.getMap<Doc>("docMapOfBlockProperties").get(msg.blockId) ?? null;
    console.debug("is propertiesDoc null?", propertiesDoc == null);
    console.groupEnd();
    if (propertiesDoc == null) {
      const block = await prisma.block.findUnique({
        where: { id: msg.blockId },
      });

      if (block == null) {
        return;
      }
      try {
        propertiesDoc = prosemirrorJSONToYDoc(schema, block.properties);
        yDoc.getMap("docMapOfBlockProperties").set(msg.blockId, propertiesDoc);
        yDoc.getMap("blocks").set(msg.blockId, block);
      } catch (error) {
        console.error(error);
      }
    }

    if (propertiesDoc != null) {
      const update = encodeStateAsUpdate(propertiesDoc);

      socket.emit("PROPERTIES_DOC_UPDATED", {
        blockId: msg.blockId,
        update: update,
      });
    }
  };

export default onLoadPropertiesDoc;
