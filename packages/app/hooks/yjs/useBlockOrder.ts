import usePage from "./usePage";

const useBlockOrder = (pageId: string) => {
  const page = usePage(pageId);

  return page?.blockOrder;
};

export default useBlockOrder;
