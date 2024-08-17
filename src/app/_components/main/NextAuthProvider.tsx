"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  return (
    <SessionProvider
      refetchOnWindowFocus
      refetchInterval={600}
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  );
}
