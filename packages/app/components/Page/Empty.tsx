import useCreateBlock from "../../hooks/useCreateBlock";

interface IProps {
  pageId: string;
}

const Empty = (props: IProps) => {
  const { pageId } = props;
  const createBlock = useCreateBlock(pageId);

  return (
    <div onClick={() => createBlock({ type: "", properties: {} })}>
      click create block
    </div>
  );
};
export default Empty;
