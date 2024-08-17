import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps as NextLinkProps } from "next/link";
import {
  ComponentPropsWithoutRef,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from "react";

import cn from "@/lib/cn";

const buttonVariants = cva(
  "inline-block rounded-full transition-all duration-300",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-400 px-[22px] py-[14px] hover:py-[16px] hover:px-[26px] hover:bg-primary-500 hover:text-sm text-base text-white disabled:text-white disabled:bg-neutral-300",
        secondary:
          "bg-transparent px-[22px] py-[14px] hover:py-[16px] hover:px-[26px] hover:bg-primary-50 hover:text-sm text-base text-primary-400 disabled:text-white disabled:bg-neutral-300",
      },
    },
  },
);

interface LinkButtonProps
  extends NextLinkProps,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  href: string;
  scroll?: boolean;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
  download?: boolean;
  disabledProgressBar?: boolean;
}

interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  type?: "button" | "reset" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function LinkButton({
  children,
  href,
  variant,
  className,
  target,
  scroll,
  download,
  disabledProgressBar,
  ...props
}: Readonly<LinkButtonProps>) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant }), className)}
      target={target}
      scroll={scroll}
      download={download}
      data-disable-nprogress={disabledProgressBar}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  type,
  onClick,
  className,
  variant,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
