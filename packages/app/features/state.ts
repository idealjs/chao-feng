import { proxy } from "valtio/vanilla";
import { bindProxyAndYMap } from "valtio-yjs";
import { Doc } from "yjs";

import { IBlock, IPage } from "../lib/type";

const yDoc = new Doc();
const yMapPages = yDoc.getMap<IPage | null>("pages");
const yMapBlocks = yDoc.getMap<IBlock | null>("blocks");
const yMapBlockPropertiesDoc = yDoc.getMap<Doc>("docMapOfBlockProperties");

const proxyPages = proxy<Record<string, IPage | null>>({});
const proxyBlocks = proxy<Record<string, IBlock | null>>({});

bindProxyAndYMap(proxyPages, yMapPages);
bindProxyAndYMap(proxyBlocks, yMapBlocks);

export { proxyBlocks, proxyPages, yDoc, yMapBlockPropertiesDoc };
