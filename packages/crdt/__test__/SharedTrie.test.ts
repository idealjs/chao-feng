import SharedTrie from "../src/SharedTrie";

const trie1 = new SharedTrie({
  value: "a",
});

const trie2 = new SharedTrie({
  value: "a",
});

const b = new SharedTrie({
  value: "b",
});

const c = new SharedTrie({
  value: "c",
});

const d = new SharedTrie({
  value: "d",
});

const e = new SharedTrie({
  value: "e",
});

trie1.setChild(b);

trie2.setChild(c);

b.setChild(d);

c.setChild(e);

trie1.merge(trie2);
trie2.merge(trie1);

console.log("test test", JSON.stringify(trie1.toJSON()));
console.log("test test", JSON.stringify(trie2.toJSON()));
