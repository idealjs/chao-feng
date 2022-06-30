import { Subject } from "rxjs";

import CommonScope, { defaultScope } from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";

function createStore<State>(
  initialState: State
): CommonStore<State, Subject<State>>;

function createStore<State>(
  initialState?: State
): CommonStore<State | undefined, Subject<State | undefined>>;

function createStore<
  State,
  SubjectClass extends Subject<State> = Subject<State>
>(
  initialState: State,
  CustomClass: new (...params: State[]) => SubjectClass,
  options?: {
    scope?: CommonScope;
    id?: symbol | string | number;
  }
): CommonStore<State, SubjectClass>;

function createStore<
  State,
  SubjectClass extends Subject<State> = Subject<State>
>(
  initialState: State,
  CustomClass: new (...params: State[]) => SubjectClass = Subject as any,
  options?: {
    scope?: CommonScope;
    id?: symbol | string | number;
  }
) {
  return new CommonStore<State, SubjectClass>(initialState, {
    CustomClass: CustomClass,
    scope: options?.scope ?? defaultScope,
    id: options?.id ?? Symbol(Math.random().toFixed(2).toString()),
  });
}

export default createStore;
