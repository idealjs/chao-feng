import Link from "next/link";

import usePageId from "../../../../../hooks/usePageId";
import useParents from "../../../../../hooks/useParents";

const Router = () => {
  const pageId = usePageId();
  const parents = useParents(pageId);

  return (
    <div className="invisible lg:visible text-sm breadcrumbs">
      <ul>
        {parents?.map((page) => {
          return (
            <li key={page.id}>
              <Link href={page.id}>
                <a>{page.name ?? "untitled"}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Router;
