import { proxy } from "valtio/vanilla";
import { bindProxyAndYMap } from "valtio-yjs";
import { Doc } from "yjs";
import { YXmlFragment } from "yjs/dist/src/internals";

import { IBlock, IPage } from "../lib/type";

const yDoc = new Doc();
const yMapPages = yDoc.getMap<IPage[keyof IPage]>("pageData");
const yMapBlocks = yDoc.getMap<IBlock | null>("blocks");
const yMapBlockYXmlFragment = yDoc.getMap<YXmlFragment>("blockYXmlFragment");

const proxyPage = proxy<IPage>();
const proxyBlocks = proxy<Record<string, IBlock | null>>({});

bindProxyAndYMap(
  proxyPage as unknown as Record<string, IPage[keyof IPage]>,
  yMapPages
);
bindProxyAndYMap(proxyBlocks, yMapBlocks);

export {
  proxyBlocks,
  proxyPage,
  yDoc,
  yMapBlocks,
  yMapBlockYXmlFragment,
  yMapPages,
};
