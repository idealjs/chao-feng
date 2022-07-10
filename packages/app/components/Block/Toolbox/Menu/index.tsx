import clsx from "clsx";

interface IProps {}

const Menu = (props: IProps) => {
  return (
    <ul
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={clsx(
        "dropdown-content menu shadow bg-base-100 w-56 rounded-box p-2 index z-10"
      )}
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
