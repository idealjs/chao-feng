import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { Doc, encodeStateAsUpdate } from "yjs";

const io = new Server({
  cors: {
    origin: "*",
  },
});

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

  socket.on("BLOCK_DOC_UPDATE", (msg: { pageId: string; blockId: string }) => {
    socket.to(pageId).emit("BLOCK_DOC_UPDATE", {});
  });

  socket.on("BLOCK_DOC_LOAD", (msg: { blockId: string }) => {
    socket.emit("BLOCK_DOC_LOAD", {});
  });

  const page = await prisma.page.findUnique({ where: { id: pageId } });

  const doc = new Doc();
  doc
    .getArray("blockOrder")
    .insert(0, (page?.blockOrder as string[] | undefined) ?? []);
  const update = encodeStateAsUpdate(doc);

  socket.emit("PAGE_DOC_INIT", {
    pageId,
    update,
  });
});

export default io;
