import React from "react";
import { NextAuthProvider } from "./providers";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'NextChat',
    description: 'NextChat - A simple chat application built with Next.js',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://nextchat.neelp.tech',
        images: [{
            url: 'https://nextchat.neelp.tech/NextChat.png',
        }],
        siteName: 'NextChat',
        description: 'NextChat - A simple chat application built with Next.js',
        title: 'NextChat',
    },
    robots: {
        follow: true,
        index: true,
        googleBot: {
            follow: true,
            index: true,
        }
    },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}