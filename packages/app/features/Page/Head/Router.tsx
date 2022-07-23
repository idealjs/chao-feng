import usePageId from "../../../hooks/usePageId";
import useParents from "../../../hooks/useParents";

const Router = () => {
  const pageId = usePageId();
  const parents = useParents(pageId);

  return <div className="invisible lg:visible">Router {pageId}</div>;
};

export default Router;
