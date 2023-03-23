import { Menu, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import { Button } from "./Button";

interface DropdownProps {
  buttonText: string;
}

export function Dropdown({
  buttonText,
  children,
}: PropsWithChildren<DropdownProps>) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="px-3 py-1 text-white transition-colors border border-white rounded-lg bg-primary hover:bg-opacity-90 active:bg-opacity-100">
          {buttonText}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
