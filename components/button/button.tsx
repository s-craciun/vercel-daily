import { type ButtonHTMLAttributes, type FC } from "react";
import { ButtonVariants } from "../../constants/constants";
import Link from "next/link";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  children: React.ReactNode;
  href?: string;
}

const commonButtonStyles =
  "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90";
const buttonVariants = {
  [ButtonVariants.DEFAULT]: `${commonButtonStyles} bg-foreground text-background`,
  [ButtonVariants.OUTLINE]: `${commonButtonStyles} bg-background text-foreground border border-gray-200`,
  [ButtonVariants.LINK]:
    "px-4 py-2 text-muted-foreground underline-offset-4 hover:underline",
};

export const Button: FC<IButtonProps> = (props) => {
  const { variant, children, href } = props;
  const className = buttonVariants[variant || ButtonVariants.DEFAULT];

  return !href ? (
    <button className={className} type={props?.type || "button"} {...props}>
      {children}
    </button>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};
