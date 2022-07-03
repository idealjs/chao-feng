import { useSWRConfig } from "swr";

import useCreateBlock from "../../hooks/useCreateBlock";

interface IProps {
  pageId: string;
}

const Empty = (props: IProps) => {
  const { pageId } = props;
  const createBlock = useCreateBlock(pageId);
  const { mutate } = useSWRConfig();

  return (
    <div
      onClick={() => {
        createBlock({ type: "text", properties: {} });
        mutate(`/api/v1/pages/${pageId}`);
      }}
    >
      click create block
    </div>
  );
};
export default Empty;
