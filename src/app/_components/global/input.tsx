"use client";

import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import cn from "@/lib/cn";
import { RefCallBack } from "react-hook-form";
import { P } from "./text";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  ref?: RefCallBack;
  errorMessage?: string;
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, errorMessage, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {label && (
          <label
            htmlFor={props.name}
            className={cn(
              `first-letter:capitalize ${props.required ? "after:text-primary-500 after:content-['*']" : ""}`,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {props.type === "password" && (
            <button
              className="absolute right-3 mt-4 flex items-center px-2 text-neutral-400 transition-all hover:text-neutral-500"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          )}
          <input
            type={showPassword ? "text" : props.type}
            className={cn(
              "w-full rounded-lg border border-neutral-400 px-[18px] py-[14px] text-black placeholder-neutral-500 transition-all duration-500 hover:border-black focus:outline-none active:border-black",
              props.disabled ? "cursor-not-allowed" : "",
              errorMessage ? "border-primary-400" : "",
            )}
            ref={ref}
            {...props}
          />
          {errorMessage && <P className="text-red-400">{errorMessage}</P>}
        </div>
      </div>
    );
  },
);

TextField.displayName = "TextField";

export function TextArea({
  label,
  placeholder,
  className,
  required,
  name,
  value,
  disabled,
}: Readonly<InputProps>) {
  return (
    <div className={"flex flex-col gap-2 " + className}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            `first-letter:capitalize ${required ? "after:text-red-500 after:content-['*']" : ""}`,
          )}
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={value}
        id={name}
        className={cn(
          "h-[144px] rounded-2xl border border-neutral-400 px-[18px] py-[14px] text-black placeholder-neutral-400 transition-all duration-500 hover:border-black focus:border-black focus:outline-none",
          disabled ? "cursor-not-allowed" : "",
        )}
        disabled={disabled}
      />
    </div>
  );
}
