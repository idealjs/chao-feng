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

export enum COLOR {
  GARY = "GARY",
  BROWN = "BROWN",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  TEAL = "TEAL",
  BLUE = "BLUE",
  PURPLE = "PURPLE",
  PINK = "PINK",
  RED = "RED",
  GARY_BACKGROUND = "GARY_BACKGROUND",
  BROWN_BACKGROUND = "BROWN_BACKGROUND",
  ORANGE_BACKGROUND = "ORANGE_BACKGROUND",
  YELLOW_BACKGROUND = "YELLOW_BACKGROUND",
  TEAL_BACKGROUND = "TEAL_BACKGROUND",
  BLUE_BACKGROUND = "BLUE_BACKGROUND",
  PURPLE_BACKGROUND = "PURPLE_BACKGROUND",
  PINK_BACKGROUND = "PINK_BACKGROUND",
  RED_BACKGROUND = "RED_BACKGROUND",
}

export type BoldFormat = ["b"];
export type ItalicFormat = ["i"];
export type StrikeFormat = ["s"];
export type CodeFormat = ["c"];
export type LinkFormat = ["a", string];
export type ColorFormat = ["h", COLOR];
export type DateFormat = [
  "d",
  {
    type: "date";
    start_date: string;
    date_format: string;
  }
];
export type UserFormat = ["u", string];
export type PageFormat = ["p", string];

type SubDecoration =
  | BoldFormat
  | ItalicFormat
  | StrikeFormat
  | CodeFormat
  | LinkFormat
  | ColorFormat
  | DateFormat
  | UserFormat
  | PageFormat;

export type Decoration = [string] | [string, SubDecoration[]];

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
  properties: {
    title?: Decoration;
    language?: Decoration[];
  };
}

export interface IBaseTextBlock extends IBlock {
  properties: {
    title?: Decoration;
  };
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
