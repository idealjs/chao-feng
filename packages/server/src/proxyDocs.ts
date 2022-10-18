import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import type { Block, Page } from "prisma/prisma-client";
import { proxy } from "valtio/vanilla";
import { bind } from "valtio-yjs";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
import { Doc, XmlFragment } from "yjs";

const proxyDocs = new Map<string, Doc>();
const proxyPages = proxy<Record<string, Page | null>>({});
const proxyBlocks = proxy<Record<string, Block | null>>({});

export default proxyDocs;

const syncPage = async (
  pageId: string,
  sendUpdate: (yDoc: Doc) => void,
  createPageDoc = async (pageId: string) => {
    console.debug("[debug] createPageDoc", pageId);
    const yDocPage = new Doc();
    const yMapPageData = yDocPage.getMap<Page[keyof Page]>("pageData");

    const page = await prisma.page.findUnique({ where: { id: pageId } });
    proxyPages[pageId] = page;
    bind(proxyPages[pageId]!, yMapPageData);
    bind(proxyBlocks, yDocPage.getMap<Block | null>("blocks"));

    const blocks = await prisma.block.findMany({
      where: {
        id: {
          in: page?.blockOrder as string[],
        },
      },
    });

    blocks.forEach((block) => {
      proxyBlocks[block.id] = block;

      const key = "prosemirror";
      const doc = prosemirrorJSONToYDoc(schema, block.properties, key);
      yDocPage
        .getMap<XmlFragment>("prosemirror")
        .set(block.id, doc.getXmlFragment(key).clone());
    });

    return yDocPage;
  }
) => {
  console.debug("[debug] getPageDoc");
  let yDocPage = proxyDocs.get(pageId);
  if (yDocPage == null) {
    yDocPage = await createPageDoc(pageId);
    proxyDocs.set(pageId, yDocPage);
  }

  sendUpdate(yDocPage);

  return yDocPage;
};

export { proxyPages,syncPage };
