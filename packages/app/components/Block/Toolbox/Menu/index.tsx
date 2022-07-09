import clsx from "clsx";

interface IProps {
  open: boolean;
}

const Menu = (props: IProps) => {
  const { open } = props;

  return (
    <ul
      className={clsx("menu bg-base-100 w-56 rounded-box", {
        hidden: !open,
      })}
    >
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  );
};

export default Menu;
