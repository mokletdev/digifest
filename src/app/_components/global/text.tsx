import { ReactNode } from "react";

import cn from "@/lib/cn";

interface TextProps {
  children?: ReactNode;
  className?: string;
  textClassName?: string;
  underlineClassName?: string;
}

export function Display({ children, className }: Readonly<TextProps>) {
  return (
    <h1
      className={cn(
        "text-[32px] font-semibold leading-[39px] lg:text-[46px] lg:leading-[57px] 2xl:text-[54px] 2xl:leading-[66px]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H1({ children, className }: Readonly<TextProps>) {
  return (
    <h1
      className={cn(
        "text-[26px] font-semibold leading-[32px] lg:text-[36px] lg:leading-[44px] 2xl:text-[42px] 2xl:leading-[52px]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function P({ children, className }: Readonly<TextProps>) {
  return (
    <p
      className={cn(
        "text-sm leading-[160%] text-neutral-500 sm:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function H2({ children, className }: Readonly<TextProps>) {
  return (
    <h2
      className={cn(
        "text-[24px] font-bold leading-[39px] text-black 2xl:text-[32px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: Readonly<TextProps>) {
  return (
    <h3
      className={cn(
        "text-[22px] font-bold leading-[27px] text-black",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: Readonly<TextProps>) {
  return (
    <h4
      className={cn("text-xl font-bold leading-[25px] text-black", className)}
    >
      {children}
    </h4>
  );
}

export function SectionTitle({ children }: TextProps) {
  return (
    <h4 className="inline-flex rounded-full border border-primary-400 bg-primary-50 px-[14px] py-[6px] uppercase text-primary-400">
      {children}
    </h4>
  );
}
