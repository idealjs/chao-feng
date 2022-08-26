import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { applyUpdate, Doc, encodeStateAsUpdate } from "yjs";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { prosemirrorJSONToYDoc, yDocToProsemirrorJSON } from "y-prosemirror";
import type { Page, Block } from "prisma/prisma-client";
const io = new Server({
  cors: {
    origin: "*",
  },
});

const yDoc = new Doc();

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

pubClient.connect();
subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", async (socket) => {
  const { pageId } = socket.handshake.query as {
    pageId: string | undefined;
  };
  // verify token

  if (pageId == null) {
    socket.emit("error", {
      msg: "missing pageId",
    });
    socket.disconnect(true);
    return;
  }
  socket.join(pageId);

  yDoc.on("update", (update) => {
    socket.emit("DOC_UPDATE", { update });
  });

  socket.on("LOAD_PAGE", async (msg: { pageId: string }) => {
    console.debug("[debug] LOAD_PAGE", msg.pageId);

    let page = yDoc.getMap<Page>("pages").get(msg.pageId) ?? null;
    if (page == null) {
      page = await prisma.page.findUnique({ where: { id: msg.pageId } });
      if (page == null) {
        return;
      }
      yDoc.getMap("pages").set(msg.pageId, page);
    } else {
      const update = encodeStateAsUpdate(yDoc);

      socket.emit("DOC_UPDATE", {
        update: update,
      });
    }
  });

  socket.on("PROPERTIES_DOC_INIT", async (msg: { blockId: string }) => {
    console.group("[debug] PROPERTIES_DOC_INIT");

    let propertiesDoc = yDoc.getMap<Doc>("docMapOfBlockProperties").get(msg.blockId) ?? null;
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
  });

  socket.on("ROOT_DOC_UPDATED", async (msg: { pageId: string }) => {
    console.debug("[debug] ROOT_DOC_UPDATED", msg.pageId);

    const page = await prisma.page.findUnique({ where: { id: msg.pageId } });

    if (page == null) {
      return;
    }

    yDoc.getMap("pages").set(msg.pageId, page);
  });

  socket.on(
    "PROPERTIES_DOC_UPDATED",
    async (msg: { blockId: string; update: ArrayBuffer }) => {
      const propertiesDoc = yDoc.getMap<Doc>("docMapOfBlockProperties").get(msg.blockId) ?? null;
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
    }
  );
});

export default io;
