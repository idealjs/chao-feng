import React, { MouseEventHandler, PropsWithChildren } from "react";

interface IProps extends IPropsWithClassName {
  onClick?: MouseEventHandler;
}

const DropdownMenuItem = (props: PropsWithChildren<IProps>) => {
  const { className, children, onClick } = props;
  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  );
};

export default DropdownMenuItem;
