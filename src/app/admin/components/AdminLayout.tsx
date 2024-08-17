"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const navRef = React.useRef(false);
  const pathname = usePathname().split("/");
  pathname.shift();

  return (
    <main className="flex w-full h-screen overflow-hidden bg-slate-50">
      <Sidebar nav={navRef.current} session={session} />
      <Navbar session={session} />
      <div
        className={`bg-gray-900 opacity-50 ${
          navRef.current ? "" : "hidden"
        } fixed inset-0 z-10`}
        id="sidebarBackdrop"
      />
      <div
        id="main-content"
        className="relative min-h-full w-full overflow-y-auto ps-2 lg:ps-24 py-4 lg:ml-64 mt-[90px] lg:mt-0"
      >
        <nav className="w-full overflow-x-clip rounded-lg align-middle p-2 font-sans text-lg lg:text-xl capitalize md:p-3">
          <ul className="flex">
            <li>
              <Link href="/" className="font-semibold">
                home
              </Link>
            </li>
            {pathname.map((path, i) => {
              const href = "/" + pathname.slice(0, i + 1).join("/");
              return (
                <React.Fragment key={i}>
                  <li className="px-3">
                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1377 25.4L19.2877 17.25C20.2502 16.2875 20.2502 14.7125 19.2877 13.75L11.1377 5.59998"
                        stroke="#E04E4E"
                        strokeWidth="1.2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </li>
                  <li>
                    <Link className="font-semibold" href={href}>
                      {path}
                    </Link>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
        <main className="pb-16">
          <div className="px-4 pt-4 min-h-fit overflow-y-auto">{children}</div>
        </main>
      </div>
    </main>
  );
}
