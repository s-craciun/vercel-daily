"use client";

import { type FC } from "react";
import { Button, type IButtonProps } from "./button";

interface IClientButtonProps extends IButtonProps {
  onClick?: () => void;
}

export const ClientButton: FC<IClientButtonProps> = ({
  variant,
  children,
  onClick,
}) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};
