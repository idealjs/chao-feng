import { nanoid } from "nanoid";
import objectHash from "object-hash";

interface ISharedTrieJSON<V = unknown> {
  id: string;
  timestamp: number;
  value: V;
  parent: ISharedTrieJSON<V> | null;
  child: ISharedTrieJSON<V> | null;

  // younger than this; such as child, grandchild...
  descendant: Record<string, ISharedTrieJSON<V>>;
}

class SharedTrie<V = unknown> extends Map<string, SharedTrie<V>> {
  id: string;
  timestamp: number;
  parent: SharedTrie<V> | null = null;
  child: SharedTrie<V> | null = null;
  value: V | undefined;

  descendant: Record<string, SharedTrie<V>> = {};

  constructor(options: { value?: V; id?: string; timestamp: number }) {
    super();
    this.id = options?.id ?? nanoid();
    this.timestamp = options.timestamp;
    this.value = options?.value;
  }

  static fromJSON = <V, R>(
    json: ISharedTrieJSON<V>,
    parseValue?: (value: V | undefined) => R
  ): SharedTrie<V | R> => {
    let child: SharedTrie<V | R> | null = null;
    if (json.child) {
      child = SharedTrie.fromJSON(json.child, parseValue);
    }

    const current = new SharedTrie({
      id: json.id,
      timestamp: json.timestamp,
      value: parseValue ? parseValue(json.value) : json.value,
    });

    if (child != null) {
      current.child = child;
      child.parent = current;
      current.descendant = { [child.id]: child, ...child.descendant };
    }

    return current;
  };

  setChild = (child: SharedTrie<V> | null) => {
    this.child = child;
    if (child != null) {
      child.parent = this.parent;
      this.descendant = {
        [child.id]: child,
        ...child.descendant,
      };
    }
  };

  toJSON = (jsonifyValue?: <R>(value: V | undefined) => R): ISharedTrieJSON => {
    return {
      id: this.id,
      timestamp: this.timestamp,
      value: jsonifyValue ? jsonifyValue(this.value) : this.value,
      parent: this.parent?.toJSON() ?? null,
      child: this.child?.toJSON() ?? null,
      descendant: Object.fromEntries(
        Object.entries(this.descendant).map(
          (entry): [string, ISharedTrieJSON] => {
            return [entry[0], entry[1].toJSON()];
          }
        )
      ),
    };
  };

  toList = (): (V | undefined)[] => {
    return [this.value].concat(this.child?.toList());
  };

  getHash = () => {
    return objectHash(this.toJSON());
  };

  gt = <V>(compare: SharedTrie<V>) => {
    if (this.timestamp === compare.timestamp) {
      return this.id > compare.id;
    }

    return this.timestamp > compare.timestamp;
  };

  static merge = <V>(
    current: SharedTrie<V>,
    nextSibling: SharedTrie<V>
  ): SharedTrie<V> => {
    if (current.getHash() === nextSibling.getHash()) {
      return current;
    }

    if (current.id !== nextSibling.id && current.gt(nextSibling)) {
      if (nextSibling.child == null) {
        nextSibling.setChild(current);
      } else {
        const merged = SharedTrie.merge(current, nextSibling.child);
        nextSibling.setChild(merged);
      }
      return nextSibling;
    }

    if (current.id !== nextSibling.id && !current.gt(nextSibling)) {
      if (current.child == null) {
        current.setChild(nextSibling);
      } else {
        const merged = SharedTrie.merge(current.child, nextSibling);
        current.setChild(merged);
      }
      return current;
    }

    if (current.id === nextSibling.id) {
      let merged: SharedTrie<V> | null = null;
      if (current.child != null && nextSibling.child != null) {
        merged = SharedTrie.merge(current.child, nextSibling.child);
      } else if (current.child != null) {
        merged = current.child;
      } else if (nextSibling.child != null) {
        merged = nextSibling.child;
      }

      if (current.gt(nextSibling)) {
        current.setChild(merged);
        return current;
      } else {
        nextSibling.setChild(merged);
        return nextSibling;
      }
    }

    return current;
  };
}

export default SharedTrie;
