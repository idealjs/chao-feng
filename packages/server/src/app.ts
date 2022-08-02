import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { Doc, encodeStateAsUpdate } from "yjs";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
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

io.on("connection", (socket) => {
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

  const yDoc = new Doc();

  yDoc.getArray("blockOrder").insert(0, ["a", "b", "c"]);

  ["a", "b", "c"].forEach((blockId) => {
    const subDoc = prosemirrorJSONToYDoc(schema, {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "aaaaa",
            },
          ],
        },
      ],
    });
    yDoc.getMap(pageId).set(blockId, subDoc);
  });

  socket.emit("init", {
    update: encodeStateAsUpdate(yDoc),
  });

  socket.on("updated", (msg: { updatedUrl: string | undefined }) => {
    const { updatedUrl } = msg;
    socket.to(pageId).emit("updated", { updatedUrl });
  });
});

export default io;
