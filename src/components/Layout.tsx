import Head from "next/head";
import React, { ReactNode } from "react";
import { PageMeta } from "../../types";

interface Props {
  children: ReactNode;
  meta?: PageMeta;
}

export const Layout = ({ children, meta: pageMeta }: Props) => {
  const meta = {
    title: "ZorroAI",
    description: "Automatic Order Splitting in ShipStation",
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
      </Head>
      <main>{children}</main>
    </>
  );
};
