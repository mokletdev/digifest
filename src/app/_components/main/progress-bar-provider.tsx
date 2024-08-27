"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#B73636"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProvider;
