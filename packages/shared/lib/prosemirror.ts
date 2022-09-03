import { Schema } from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: { content: "paragraph+" },
    paragraph: {
      content: "text*",
      toDOM(node) {
        return ["p", 0];
      },
    },
    text: { inline: true },
  },
});

export const linkSchema = new Schema({
  nodes: {
    doc: {
      content: "text*",
    },
    text: {
      group: "inline",
    },
  },
  marks: {
    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs(dom: HTMLElement | string) {
            if (dom instanceof HTMLElement) {
              return {
                href: dom.getAttribute("href"),
                title: dom.getAttribute("title"),
              };
            }
            return {
              href: dom,
              title: dom,
            };
          },
        },
      ],
      toDOM(node) {
        let { href, title } = node.attrs;
        return ["a", { href, title }, 0];
      },
    },
  },
});
