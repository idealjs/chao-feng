import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server } from "socket.io";
import { applyUpdate, encodeStateAsUpdate } from "yjs";

import { getPageDoc } from "./proxyDocs";

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
  const { pageId, externalJwt } = socket.handshake.query as {
    pageId: string | undefined;
    externalJwt: string | undefined;
  };
  // verify token

  if (externalJwt == null) {
    socket.emit("error", {
      msg: "missing externalJwt",
    });
    socket.disconnect(true);
    return;
  }

  if (pageId == null) {
    socket.emit("error", {
      msg: "missing pageId",
    });
    socket.disconnect(true);
    return;
  }

  const yDocPage = await getPageDoc(pageId, (yDoc) => {
    const update = encodeStateAsUpdate(yDoc);
    console.debug(
      "[debug] DOC_UPDATE getPageDoc",
      yDoc.getMap("prosemirror").toJSON()
    );
    socket.emit("DOC_UPDATE", {
      update: update,
    });
  });

  socket.join(pageId);

  socket.on("DOC_UPDATE", (msg: { pageId: string; update: ArrayBuffer }) => {
    console.debug("[debug] REMOTE DOC_UPDATE");
    if (msg.pageId === pageId) {
      applyUpdate(yDocPage, new Uint8Array(msg.update));
      socket.to(pageId).emit("DOC_UPDATE", { update: msg.update });
    }
  });
});

export default io;
