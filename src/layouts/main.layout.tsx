import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="flex justify-center">
      <div className={twMerge(" max-w-screen-xl w-full min-h-screen", className)}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
