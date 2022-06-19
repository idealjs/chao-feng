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

export interface IBaseBlock {
  id: string;
  type: string;
  version: number;
  created_time: number;
  last_edited_time: number;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  created_by: {
    table: string;
    id: string;
  };
  last_edited_by: {
    table: string;
    id: string;
  };
  space_id?: string;
  content?: string[];
}

export interface IPermission {
  role: string;
  type: string;
}

export interface IPageFormat {
  page_full_width?: boolean;
  page_small_text?: boolean;
  page_cover_position?: number;
  block_locked?: boolean;
  block_locked_by?: string;
  page_cover?: string;
  page_icon?: string;
}

export interface IPageBlock extends IBaseBlock {
  type: "page";
  properties?: {
    title: Decoration[];
  };
  content: string[];
  format: IPageFormat;
  permissions: IPermission[];
  file_ids?: string[];
}

export interface IDividerBlock extends IBaseBlock {
  type: "divider";
}

export interface ICodeBlock extends IBaseBlock {
  type: "code";
  properties: {
    title: Decoration[];
    language: Decoration[];
  };
}

export interface IBaseTextBlock extends IBaseBlock {
  properties?: {
    title: Decoration[];
  };
  format?: {
    block_color: COLOR;
  };
}

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
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
