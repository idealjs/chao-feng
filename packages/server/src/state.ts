import type { Block, Page } from "prisma/prisma-client";
import { proxy } from "valtio/vanilla";
import { bindProxyAndYMap } from "valtio-yjs";
import { Doc } from "yjs";
import { YXmlFragment } from "yjs/dist/src/internals";

const yDoc = new Doc();
const yMapPages = yDoc.getMap<Page | null>("pages");
const yMapBlocks = yDoc.getMap<Block | null>("blocks");
const yMapBlockYXmlFragment = yDoc.getMap<YXmlFragment>("blockYXmlFragment");

const proxyPages = proxy<Record<string, Page | null>>({});
const proxyBlocks = proxy<Record<string, Block | null>>({});

bindProxyAndYMap(proxyPages, yMapPages);
bindProxyAndYMap(proxyBlocks, yMapBlocks);

export { proxyBlocks, proxyPages, yDoc, yMapBlockYXmlFragment };
