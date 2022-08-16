import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { applyUpdate, Doc, encodeStateAsUpdate } from "yjs";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
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

  socket.on("PAGE_DOC_INIT", async (msg: { pageId: string }) => {
    console.debug("[debug] PAGE_DOC_INIT", msg.pageId);

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

  socket.on("BLOCK_DOC_INIT", async (msg: { blockId: string }) => {
    console.group("[debug] BLOCK_DOC_INIT");

    let blockDoc = yDoc.getMap<Doc>("blockDocs").get(msg.blockId) ?? null;
    console.debug("is blockDoc null?", blockDoc == null);
    console.groupEnd();
    if (blockDoc == null) {
      const block = await prisma.block.findUnique({
        where: { id: msg.blockId },
      });

      if (block == null) {
        return;
      }
      blockDoc = prosemirrorJSONToYDoc(schema, block.properties);
      yDoc.getMap("blockDocs").set(msg.blockId, blockDoc);
    }

    const update = encodeStateAsUpdate(blockDoc);

    socket.emit("BLOCK_DOC_UPDATED", {
      blockId: msg.blockId,
      update: update,
    });
  });

  socket.on("PAGE_DOC_UPDATED", async (msg: { pageId: string }) => {
    console.debug("[debug] PAGE_DOC_UPDATED", msg.pageId);

    const page = await prisma.page.findUnique({ where: { id: msg.pageId } });

    if (page == null) {
      return;
    }

    yDoc.getMap("pages").set(msg.pageId, page);
  });

  socket.on(
    "BLOCK_DOC_UPDATED",
    async (msg: { blockId: string; update: ArrayBuffer }) => {
      const blockDoc = yDoc.getMap<Doc>("blockDocs").get(msg.blockId) ?? null;
      console.debug("[debug] BLOCK_DOC_UPDATED");

      if (blockDoc != null) {
        applyUpdate(blockDoc, new Uint8Array(msg.update));
      }

      socket.to(pageId).emit("BLOCK_DOC_UPDATED", msg);
    }
  );
});

export default io;
