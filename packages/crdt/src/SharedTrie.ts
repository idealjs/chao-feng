import { nanoid } from "nanoid";
import Lamport from "./Lamport";
import objectHash from "object-hash";

class SharedTrie<V = unknown> extends Map<string, SharedTrie> {
  id: string;
  timestamp = new Lamport();
  parent: SharedTrie | null = null;
  activedChild: SharedTrie | null = null;

  value: V | undefined;

  constructor(options?: { value?: V; id?: string }) {
    super();
    this.id = options?.id ?? nanoid();
    this.value = options?.value;
  }

  toJSON = (): any => {
    return {
      value: this.value,
      child: this.activedChild?.toJSON(),
    };
  };

  getHash = () => {
    return objectHash(this.toJSON());
  };

  setChild = (value: SharedTrie<unknown>): this => {
    super.set(value.id, value);
    this.activedChild = value;
    return this;
  };

  merge = (income: SharedTrie | undefined): this => {
    if (this.activedChild?.getHash() === income?.activedChild?.getHash()) {
      return this;
    }

    let merged: SharedTrie | null = null;

    if (this.activedChild != null && income?.activedChild != null) {
      if (
        this.activedChild.timestamp.counter <
        income.activedChild.timestamp.counter
      ) {
        merged = this.activedChild.merge(
          new SharedTrie({
            id: this.activedChild.id,
            value: this.activedChild.value,
          }).setChild(income.activedChild)
        );
      } else {
        merged = income.activedChild.merge(
          new SharedTrie({
            id: this.activedChild.id,
            value: this.activedChild.value,
          }).setChild(this.activedChild)
        );
      }
    }

    if (this.activedChild != null && income?.activedChild == null) {
      merged = this.activedChild;
    }

    if (this.activedChild == null && income?.activedChild != null) {
      merged = income.activedChild;
    }

    if (merged != null) {
      this.setChild(merged);
    }

    return this;
  };
}

export default SharedTrie;
