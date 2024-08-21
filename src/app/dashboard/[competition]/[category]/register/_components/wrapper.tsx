"use client";

import { ReactNode } from "react";
import {
  RegistrationFormContext,
  RegistrationFormContextValues,
} from "../contexts";

export default function Wrapper({
  value,
  children,
}: {
  value: RegistrationFormContextValues;
  children: ReactNode;
}) {
  return (
    <RegistrationFormContext.Provider value={value}>
      {children}
    </RegistrationFormContext.Provider>
  );
}
