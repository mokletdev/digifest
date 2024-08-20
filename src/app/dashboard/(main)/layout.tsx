import { ReactNode } from "react";

export default function MainDashboardLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return <main className="mx-auto max-w-[1169px] px-5 pt-10">{children}</main>;
}
