import React from "react";
import { NextAuthProvider } from "./providers";
import Head from 'next/head';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <Head>
            <meta charSet="utf-8" />
            <title>NextChat</title>
            <meta name="og:title" content="NextChat" />
            <meta name="description" content="A ssimple but modern chat application built with Next.js and MongoDB" />
            <meta name="og:description" content="A simple but modern chat application built with Next.js and MongoDB" />
            <meta name="og:image" content="/NextChat.png" />
            <meta name="theme-color" content="#000000" />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}