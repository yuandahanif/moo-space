import React, { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  textLabel: string;
}

const Input: React.FC<Props> = ({ className, textLabel, ...rest }) => {
  return (
    <label className="group relative flex flex-col w-full rounded-md border group-focus:border-slate-900">
      <input
        {...rest}
        className={twMerge(
          "peer min-w-[20em] rounded-md px-2 py-2 duration-300 focus:outline-black",
          className
        )}
      />
      <span className="absolute ml-2 -translate-y-1/2 bg-white px-1 text-slate-400 duration-300 peer-focus:text-black">
        {textLabel}
      </span>
    </label>
  );
};

export default Input;
