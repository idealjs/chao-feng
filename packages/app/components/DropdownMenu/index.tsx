import clsx from "clsx";
import React, { PropsWithChildren, useRef, useState } from "react";

interface IProps extends IPropsWithClassName {}

const DropdownMenu = (props: PropsWithChildren<IProps>) => {
  const { className, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      className={clsx(
        "dropdown-menu",
        {
          "dropdown-menu-open": open,
        },
        className
      )}
      onClick={(e) => {
        setOpen((o) => {
          return !o;
        });
      }}
      onBlur={() => {
        setOpen(false);
      }}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
