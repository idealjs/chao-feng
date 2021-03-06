import { useSWRConfig } from "swr";

import useCreateBlock from "../../hooks/api/useCreateBlock";

interface IProps {
  pageId: string;
}

const Empty = (props: IProps) => {
  const { pageId } = props;
  const createBlock = useCreateBlock();
  const { mutate } = useSWRConfig();

  return (
    <div
      onClick={async () => {
        await createBlock({ pageId, type: "text", properties: {} });
        mutate(`/api/v1/pages/${pageId}`);
      }}
    >
      click create block
    </div>
  );
};
export default Empty;
