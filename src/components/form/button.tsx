import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "rounded-md border bg-green-500 py-3 text-white duration-300  hover:bg-green-700",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
