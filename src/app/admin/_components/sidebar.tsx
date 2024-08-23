import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/app/_components/global/button";
import { P } from "@/app/_components/global/text";
import { protectedRoutes } from "@/utils/protectedRoutes";

import { DashboardIcon } from "./icon";

type SidebarProps = {
  nav: boolean;
  session: Session | null;
};

export default function Sidebar({ nav, session }: SidebarProps) {
  const pathname = usePathname();

  const allowedRoutes = protectedRoutes.filter((item) => {
    const userRole = session?.user?.role;

    return item.roles == "All" || (userRole && item.roles.includes(userRole));
  });

  return (
    <aside
      id="sidebar"
      className={`fixed ${
        nav ? "w-80" : "w-0 opacity-0"
      } left-0 top-0 z-20 hidden h-full flex-shrink-0 bg-white transition-all duration-300 lg:flex lg:w-80 lg:opacity-100`}
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white px-4 pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex-1 space-y-1 bg-white px-3">
            <Link href={"/"} className="block">
              <Image
                src={"/logo.png"}
                alt="Logo Digifest"
                width={120}
                height={50}
                className="pointer-events-none mb-10 h-[50px] w-[130px]"
              />
            </Link>
            <ul className="space-y-4 pb-2">
              <li>
                <Link
                  href={"/admin"}
                  className="group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 transition-all hover:bg-red-100"
                >
                  <DashboardIcon />
                  <P className="ml-3 whitespace-nowrap font-semibold text-primary-400">
                    Dashboard
                  </P>
                </Link>
              </li>
              <P className="font-semibold">Menu</P>
              {allowedRoutes.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={
                      (item.regex.test(pathname) ? "bg-red-100 " : "") +
                      "group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 transition-all hover:bg-red-200"
                    }
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <P className="ml-3 whitespace-nowrap font-semibold text-primary-400">
                      {item.title}
                    </P>
                  </Link>
                </li>
              ))}
              <Button
                variant={"primary"}
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                className="w-full justify-center"
              >
                Log Out
              </Button>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
