import useCreateBlock from "../../hooks/yjs/useCreateBlock";

interface IProps {
  pageId: string;
}

const Empty = (props: IProps) => {
  const createBlock = useCreateBlock();

  return (
    <div
      onClick={async () => {
        createBlock({
          type: "text",
        });
      }}
    >
      click create block
    </div>
  );
};
export default Empty;
