import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/app/_components/global/button";
import { P } from "@/app/_components/global/text";
import { protectedRoutes } from "@/utils/protectedRoutes";

import { DashboardIcon } from "./icon";

type navbarParam = {
  nav: boolean;
  session: Session | null;
};
export function Sidebar({ nav, session }: navbarParam) {
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
      } left-0 bg-white top-0 z-20 h-full flex-shrink-0 transition-all duration-300 lg:w-80 lg:opacity-100 hidden lg:flex`}
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 flex-1 flex-col border-r px-4 border-gray-200 bg-white pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex-1 space-y-1 bg-white px-3">
            <Link href={"/"} className="block">
              <Image
                src={"/horizontal.svg"}
                alt="Logo moklet.org"
                width={120}
                height={50}
                className="pointer-events-none mb-10 h-[50px] w-[130px]"
              />
            </Link>
            <ul className="space-y-4 pb-2">
              <li>
                <Link
                  href={"/admin"}
                  className="group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 hover:bg-red-100 transition-all"
                >
                  <DashboardIcon />
                  <P className="ml-3 whitespace-nowrap text-primary-400 font-semibold">
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
                      (pathname.includes(item.path) ? "bg-red-100 " : "") +
                      "group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 hover:bg-red-200 transition-all"
                    }
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <P className="ml-3 whitespace-nowrap text-primary-400 font-semibold">
                      {item.title}
                    </P>
                  </Link>
                </li>
              ))}
              <Button
                variant={"primary"}
                onClick={() => signOut()}
                className="w-full"
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
