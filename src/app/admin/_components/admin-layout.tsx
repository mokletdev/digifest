"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const navRef = useRef(false);
  const pathname = usePathname().split("/");
  pathname.shift();

  return (
    <main className="flex min-h-screen w-full overflow-x-hidden overflow-y-scroll bg-slate-50">
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
        className="relative mt-[90px] min-h-full w-full overflow-y-auto py-4 ps-2 lg:ml-64 lg:mt-0 lg:ps-24"
      >
        <nav className="w-full overflow-x-clip rounded-lg p-2 align-middle font-sans text-lg capitalize md:p-3 lg:text-xl">
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
        <div className="overflow-y-auto px-4 pt-4">{children}</div>
      </div>
    </main>
  );
}
