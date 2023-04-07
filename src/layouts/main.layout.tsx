import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="">
      <div className={twMerge("", className)}>{children}</div>
    </div>
  );
};

export default MainLayout;
