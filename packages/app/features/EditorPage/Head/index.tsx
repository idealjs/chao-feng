import { Suspense } from "react";

import Router from "./Router";

const Head = () => {
  return (
    <div className="flex justify-between">
      <div>
        <label htmlFor="chaofeng-drawer" className="lg:hidden">
          Open drawer
        </label>
        <Suspense fallback={<div className="h-9" />}>
          <Router />
        </Suspense>
      </div>

      <div></div>
    </div>
  );
};

export default Head;
