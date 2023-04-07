import Header from "@components/header/header";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="flex justify-center">
      <div
        className={twMerge(" min-h-screen w-full max-w-screen-xl ", className)}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
