import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server } from "socket.io";
import { Doc } from "yjs";

import onLoadPage from "./lib/onLoadPage";
import onLoadPropertiesDoc from "./lib/onLoadPropertiesDoc";
import onPropertiesDocUpdated from "./lib/onPropertiesDocUpdated";
import onRootDocUpdated from "./lib/onRootDocUpdated";

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

  socket.on("LOAD_PAGE", onLoadPage({ socket, yDoc }));

  socket.on("LOAD_PROPERTIES_DOC", onLoadPropertiesDoc({ socket, yDoc }));

  socket.on(
    "PROPERTIES_DOC_UPDATED",
    onPropertiesDocUpdated({ socket, yDoc, pageId })
  );

  socket.on("ROOT_DOC_UPDATED", onRootDocUpdated({ socket, yDoc }));
});

export default io;
