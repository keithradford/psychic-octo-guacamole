import React, { useState } from "react";
import { Logo, NavLink, Button, Input } from "../atoms";
import {
  KeyIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { Modal } from "./Modal";

export const Header = () => {
  const [session, setSession] = useLocalStorage<{ username: string } | null>(
    "session",
    null
  );
  const [username, setUsername] = useState("");

  const [show, setShow] = useState(false);

  const onClick = () => {
    if (session) {
      setSession(null);
      return;
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <Modal
        title="Log in"
        open={show}
        confirmOnClick={() => {
          setSession({ username });
        }}
        setModal={(open: boolean) => {
          setShow(open);
        }}
      >
        <div className="flex flex-col space-y-4">
          <Input
            title="Username"
            value={username}
            setValue={(val: string) => {
              setUsername(val);
            }}
          />
        </div>
      </Modal>
      <div className="flex flex-row items-center justify-between px-5 mb-5 border-b border-gray-200 shadow-lg">
        <Logo showAppName={true} />
        <section>
          <NavLink link="/" text="Home" />
          <NavLink link="/financial" text="Financial Statements" />
          <NavLink link="/budget" text="Budget Tools" />
          <NavLink link="/reporting" text="Reporting & Analysis" />
        </section>
        <section className="flex space-x-4">
          <Button theme="outline" onClick={onClick}>
            <div className="flex items-center space-x-2">
              <KeyIcon className="w-4 h-4 fill-primary" />
              {session ? <p>Log out</p> : <p>Sign in</p>}
            </div>
          </Button>
        </section>
      </div>
    </>
  );
};
