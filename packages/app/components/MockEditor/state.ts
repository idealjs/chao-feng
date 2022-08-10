import { proxy } from "valtio";

import type { IBlock, IPage } from "../../lib/type";

export const blockStates = proxy<Record<string, IBlock | undefined>>({});

export const pageStates = proxy<Record<string, IPage | undefined>>({});
