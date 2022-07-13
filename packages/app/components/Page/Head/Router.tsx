import usePageId from "../../../hooks/usePageId";

const Router = () => {
  const pageId = usePageId();
  return <div className="invisible lg:visible">Router {pageId}</div>;
};

export default Router;
