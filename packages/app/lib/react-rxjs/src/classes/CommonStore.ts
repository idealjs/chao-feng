import EventEmitter from "events";
import { Subject } from "rxjs";

import CommonScope from "./CommonScope";

interface ISubscribeListener<State> {
  (state: State): void;
}

interface IUnSubscribe {
  (): void;
}

export const updateSymbol = Symbol("update");

export interface IStore<State> {
  getState(): State;

  subscribe(listener: ISubscribeListener<State>): IUnSubscribe;

  fork(scope: CommonScope): IStore<State>;
}

class CommonStore<
  State,
  SubjectClass extends Subject<State> = Subject<State>
> extends EventEmitter {
  private state: State;

  readonly CustomClass: new (...params: State[]) => SubjectClass;
  readonly scope: CommonScope;
  readonly id: symbol | string | number;
  readonly subject: SubjectClass;

  constructor(
    initialState: State,
    options: {
      CustomClass: new (...params: State[]) => SubjectClass;
      scope: CommonScope;
      id: symbol | string | number;
    }
  ) {
    super();

    this.state = initialState;

    this.CustomClass = options.CustomClass;
    this.scope = options.scope;
    this.id = options.id;
    this.subject = new this.CustomClass(this.state);

    this.subject.subscribe((state) => {
      this.state = state;
      this.emit(updateSymbol, state);
    });

    this.scope.setStore(this.id, this);

    this.getState = this.getState.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.fork = this.fork.bind(this);
  }

  getState() {
    return this.state;
  }

  subscribe(listener: ISubscribeListener<State>) {
    this.addListener(updateSymbol, listener);
    return () => {
      this.removeListener(updateSymbol, listener);
    };
  }

  fork(scope: CommonScope): IStore<State> {
    return new CommonStore(this.state, {
      CustomClass: this.CustomClass,
      scope: scope,
      id: this.id,
    });
  }
}

export default CommonStore;
