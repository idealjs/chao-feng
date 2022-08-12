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
