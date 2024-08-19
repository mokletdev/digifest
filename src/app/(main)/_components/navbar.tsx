"use client";
import Link from "@/app/_components/global/button";
import { P } from "@/app/_components/global/text";
import { HamburgerIcon } from "@/app/admin/_components/icon";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { default as NextLink } from "next/link";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

const links = [
  {
    title: "Beranda",
    href: "#beranda",
  },
  {
    title: "Tentang",
    href: "#tentang",
  },
  {
    title: "Kompetisi",
    href: "#kopetisi",
  },
  {
    title: "Timeline",
    href: "#timeline",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [sideActive, setSideActive] = useState(false);

  return (
    <>
      <nav className="nav-shadow fixed z-[999] w-full bg-white">
        <div className="mx-auto flex w-full max-w-[1169px] items-center justify-between px-5 py-4">
          <NextLink href={"/"} className="w-[204px]">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={224}
              height={50}
              className="h-[48px] w-[125px]"
            />
          </NextLink>
          <ul className="hidden items-center gap-[32px] lg:flex">
            {links.map((link, i) => (
              <li key={i}>
                <Link href={link.href} variant={"tertiary"}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="hidden w-[204px] items-center justify-between lg:flex"
            style={{ justifyContent: session?.user ? "end" : "space-between" }}
          >
            {session?.user ? (
              <>
                <Link
                  href={
                    session.user.role == "ADMIN" ||
                    session.user.role === "SUPERADMIN"
                      ? "/admin"
                      : "/dashboard"
                  }
                  variant="primary"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href={"/auth/login"} variant="primary">
                  Masuk
                </Link>
                <Link href={"/auth/register"} variant="secondary">
                  Daftar
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <P>Menu</P>
            <button
              className="block h-6 w-6"
              onClick={() => setSideActive(true)}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Sidebar */}
      <aside
        className="nav-shadow fixed right-0 top-0 z-[1000] h-screen w-[264px] overflow-y-scroll bg-white transition-all duration-300 lg:hidden"
        style={{ right: sideActive ? 0 : "-100%" }}
      >
        <div className="flex h-full flex-col justify-between px-5 py-[42px]">
          <div className="block">
            <button
              className="mb-[72px] block h-6 w-6"
              onClick={() => setSideActive(false)}
            >
              <FaX />
            </button>
            <ul className="mb-8 flex flex-col gap-7">
              {links.map((link, i) => (
                <li key={i} className="ml-3">
                  <Link href={link.href} variant={"tertiary"}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-4 lg:hidden">
            {session?.user ? (
              <>
                <Link
                  href={
                    session.user.role == "ADMIN" ||
                    session.user.role === "SUPERADMIN"
                      ? "/admin"
                      : "/dashboard"
                  }
                  className="w-full text-center"
                  variant="primary"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/login"}
                  className="w-full text-center"
                  variant="primary"
                >
                  Masuk
                </Link>
                <Link
                  href={"/auth/register"}
                  className="w-full text-center"
                  variant="secondary"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
