import CommonScope, { defaultScope } from "./classes/CommonScope";
import createScope from "./creator/createScope";

const fork = (scope: CommonScope = defaultScope) => {
  const newScope = createScope();
  scope.getStores().forEach((store) => {
    store.fork(newScope);
  });

  return newScope;
};

export default fork;
