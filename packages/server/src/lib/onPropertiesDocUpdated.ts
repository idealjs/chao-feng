import type { Block } from "prisma/prisma-client";
import { Socket } from "socket.io";
import { yDocToProsemirrorJSON } from "y-prosemirror";
import { applyUpdate, Doc, encodeStateAsUpdate } from "yjs";

const onPropertiesDocUpdated =
  (options: { socket: Socket; yDoc: Doc; pageId: string }) =>
  async (msg: { blockId: string; update: ArrayBuffer }) => {
    const { socket, yDoc, pageId } = options;

    const propertiesDoc =
      yDoc.getMap<Doc>("docMapOfBlockProperties").get(msg.blockId) ?? null;
    console.debug("[debug] PROPERTIES_DOC_UPDATED");

    if (propertiesDoc != null) {
      applyUpdate(propertiesDoc, new Uint8Array(msg.update));

      const blockData = yDoc.getMap<Block>("blocks").get(msg.blockId);
      if (blockData != null) {
        yDoc.getMap<Block>("blocks").set(msg.blockId, {
          ...blockData,
          properties: yDocToProsemirrorJSON(propertiesDoc),
        });

        const update = encodeStateAsUpdate(yDoc);

        socket.emit("DOC_UPDATE", {
          update: update,
        });
      }
    }

    socket.to(pageId).emit("PROPERTIES_DOC_UPDATED", msg);
  };

export default onPropertiesDocUpdated;
