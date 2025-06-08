import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";

import SearchIcon from "public/SearchIcon";
import Search from "./_components/search";
import { SessionProvider } from "next-auth/react";
import LoginButton from "./_components/login/LoginButton";

export const metadata: Metadata = {
  title: "MovieMars",
  description: "Website to watch movies and TV shows",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-black">
        <SessionProvider>
          <TRPCReactProvider>
            <header className="fixed z-20 w-full bg-black">
              <div className="container mx-auto flex h-[8vh] flex-row items-center py-4">
                <Link className="" href="/">
                  <div className="text-xl font-bold text-nowrap text-orange-500">
                    Planet-ET
                  </div>
                </Link>

                <div className="flex w-full cursor-pointer flex-row items-center justify-end gap-x-4 text-orange-500">
                  <SearchIcon />
                  <Search />
                  <Link href={`/tvshows/1`}>
                    <p>TV Shows</p>
                  </Link>
                  <Link href={`/`}>
                    <p>Movies </p>
                  </Link>
                  <LoginButton />
                </div>
              </div>
            </header>
            <div className="pt-[8vh]">{children}</div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
