import type { Block, PermissionTag, Prisma } from "@prisma/client";

type PartialOmit<T, K extends string> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, Extract<keyof T, K>>>;

type PartialOmitAnyId<T> = PartialOmit<T, "id" | `${string | ""}Id`>;

export enum SCRUD {
  D = 1 << 0,
  U = 1 << 1,
  R = 1 << 2,
  C = 1 << 3,
  S = 1 << 4,
}

export enum TAG_TYPE {
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE",
}

export interface IBlock<O extends Prisma.JsonObject = {}> extends Block {
  id: string;
  properties: O;
}

export interface IPermissionTag extends PartialOmitAnyId<PermissionTag> {}

export interface IDividerBlock extends IBlock {
  type: "divider";
}

export interface ICodeBlock extends IBlock {
  type: "code";
  properties: {};
}

export interface IBaseTextBlock extends IBlock {
  properties: {};
}

export interface IBulletedListBlock extends IBaseTextBlock {
  type: "bulleted_list";
}

export interface INumberedListBlock extends IBaseTextBlock {
  type: "numbered_list";
}

export interface IHeaderBlock extends IBaseTextBlock {
  type: "header";
}

export interface ISubHeaderBlock extends IBaseTextBlock {
  type: "sub_header";
}

export interface ISubSubHeaderBlock extends IBaseTextBlock {
  type: "sub_sub_header";
}

export interface IQuoteBlock extends IBaseTextBlock {
  type: "quote";
}
