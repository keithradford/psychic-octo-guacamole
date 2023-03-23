import useLocalStorage from "@/utils/hooks/useLocalStorage";
import Head from "next/head";
import { ReactNode } from "react";
import { Header } from "../molecules";

type DefaultLayoutProps = { children: ReactNode };

export const LogIn = () => {
  // Nice centered log in to continue component
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold">Log in to continue</h1>
    </div>
  );
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [session, _] = useLocalStorage("session", null);
  return (
    <>
      <Head>
        <title>UVic University Management System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Header />
        <div className="flex flex-col items-center px-12">
          <div className="flex w-full max-w-5xl">
            {session ? children : <LogIn />}
          </div>
        </div>
      </main>
    </>
  );
};
