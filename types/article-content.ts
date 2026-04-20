export enum BlockType {
  Paragraph = "paragraph",
  Heading = "heading",
  Blockquote = "blockquote",
  UnorderedList = "unordered-list",
  OrderedList = "ordered-list",
  Image = "image",
}

export interface ParagraphBlock {
  type: BlockType.Paragraph;
  text: string;
}

export interface IHeadingBlock {
  type: BlockType.Heading;
  level: 2 | 3;
  text: string;
}

export interface IBlockquoteBlock {
  type: BlockType.Blockquote;
  text: string;
}

export interface IUnorderedListBlock {
  type: BlockType.UnorderedList;
  items: string[];
}

export interface IOrderedListBlock {
  type: BlockType.OrderedList;
  items: string[];
}

export interface IImageBlock {
  type: BlockType.Image;
  src: string;
  alt: string;
  caption?: string;
}

export type ArticleContentBlock =
  | ParagraphBlock
  | IHeadingBlock
  | IBlockquoteBlock
  | IUnorderedListBlock
  | IOrderedListBlock
  | IImageBlock;
