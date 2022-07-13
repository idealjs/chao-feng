import usePageId from "../../../hooks/usePageId";
import useParentIds from "../../../hooks/useParentIds";

const Router = () => {
  const pageId = usePageId();
  const parentIds = useParentIds(pageId);
  return <div className="invisible lg:visible">Router {pageId}</div>;
};

export default Router;
