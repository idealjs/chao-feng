import SharedTrie from "./SharedTrie";

class SharedString extends SharedTrie<string> {
  constructor() {
    super();
  }
  concat(value: string): this {
    const root = new SharedTrie<string>({});

    value.split("").reduce((p: SharedTrie<string> | null, c: string) => {
      const trie = new SharedTrie({ value: c });
      if (p == null) {
        root.setChild(trie);
      } else {
        p.setChild(trie);
      }
      return trie;
    }, null as SharedTrie<string> | null);

    if (root.activedChild != null) {
      this.setChild(root.activedChild);
    }
    return this;
  }
  toString = (): string => {
    return this.toList().join("");
  };
}

export default SharedString;
