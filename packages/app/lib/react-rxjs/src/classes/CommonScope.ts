import CommonStore from "./CommonStore";

class CommonScope {
  readonly id = Symbol(Math.random().toFixed(2));
  private storeMaps = new Map<
    string | number | symbol,
    CommonStore<any, any>
  >();

  constructor() {
    this.hasStore = this.hasStore.bind(this);
    this.getStore = this.getStore.bind(this);
    this.setStore = this.setStore.bind(this);
    this.getStores = this.getStores.bind(this);
  }

  public hasStore(key: string | number | symbol) {
    return this.storeMaps.has(key);
  }

  public getStore(key: string | number | symbol) {
    return this.storeMaps.get(key);
  }

  public setStore(key: string | number | symbol, store: CommonStore<any>) {
    return this.storeMaps.set(key, store);
  }

  public getStores(): CommonStore<any, any>[] {
    return Array.from(this.storeMaps.values());
  }
}

export default CommonScope;

export const defaultScope = new CommonScope();
