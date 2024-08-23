"use client";

import { ReactNode } from "react";
import { DashboardContext, DashboardContextValues } from "../contexts";

export default function Wrapper({
  value,
  children,
}: {
  value: DashboardContextValues;
  children: ReactNode;
}) {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
