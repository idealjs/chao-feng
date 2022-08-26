import Router from "./Router";

const Head = () => {
  return (
    <div className="flex justify-between">
      <div>
        <label htmlFor="chaofeng-drawer" className="lg:hidden">
          Open drawer
        </label>
        <Router />
      </div>

      <div></div>
    </div>
  );
};

export default Head;
