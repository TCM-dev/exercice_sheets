import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  back?: boolean;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ back, children }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex gap-2 items-center my-8">
      {back && <ArrowLeftIcon className="h-8 w-8 cursor-pointer" onClick={goBack} />}
      <h1>{children}</h1>
    </div>
  );
};

export default Header;
