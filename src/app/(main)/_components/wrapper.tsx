"use client";

import { ReactNode } from "react";
import { LandingPageContext, LandingPageContextValues } from "../contexts";

export default function Wrapper({
  children,
  value,
}: {
  children: ReactNode;
  value: LandingPageContextValues;
}) {
  return (
    <LandingPageContext.Provider value={value}>
      {children}
    </LandingPageContext.Provider>
  );
}
