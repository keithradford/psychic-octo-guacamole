import React from "react";
import { Logo, NavLink, Button } from "../atoms";
import {
  KeyIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between px-5 mb-5 border-b border-gray-200 shadow-lg">
      <Logo showAppName={true} />
      <section>
        <NavLink link="/" text="Home" />
        <NavLink link="/financial" text="Financial Statements" />
        <NavLink link="/budget" text="Budget Tools" />
        <NavLink link="/reporting" text="Reporting & Analysis" />
      </section>
      <section className="flex space-x-4">
        <Button theme="outline" onClick={() => {}}>
          <div className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="w-4 h-4" />
            <ChevronUpIcon className="w-4 h-4" />
          </div>
        </Button>
        <Button theme="outline" onClick={() => {}}>
          <div className="flex items-center space-x-2">
            <KeyIcon className="w-4 h-4 fill-primary" />
            <p>Sign in</p>
          </div>
        </Button>
      </section>
    </div>
  );
};
