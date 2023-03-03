import Head from "next/head";
import { ReactNode } from "react";
import { Header } from "../molecules";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>UVic University Management System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Header />
        <div className="flex flex-col items-center px-12">
          <div className="flex w-full max-w-5xl">{children}</div>
        </div>
      </main>
    </>
  );
};
