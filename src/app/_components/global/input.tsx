"use client";

import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  useState,
} from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";

import cn from "@/lib/cn";
import OptionTypeBase from "react-select";

interface InputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  name?: string;
  value?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

interface OptionFieldProps {
  label: string;
  required?: boolean;
  options: { id: string; value: string }[];
  className?: string;
  value?: string | Array<string>;
  name: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

interface SelectFieldProps {
  label?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  className?: string;
  value?: string | Array<string>;
  name: string;
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

interface TextFieldProps extends InputProps {
  type: HTMLInputTypeAttribute | undefined;
}

export interface OptionType extends OptionTypeBase {
  value?: string;
  label?: string;
}

export function TextField({
  label,
  placeholder,
  className,
  name,
  required,
  type = "text",
  handleChange,
  value,
  onKeyDown,
  disabled,
}: Readonly<TextFieldProps>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
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
      <div className="relative">
        {type == "password" && (
          <button
            className="absolute right-3 mt-4 flex items-center px-2 text-neutral-400 transition-all hover:text-neutral-500"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
        <input
          type={showPassword ? "text" : type}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={handleChange}
          id={name}
          className={cn(
            "w-full rounded-full border border-neutral-400 px-[18px] py-[14px] text-black placeholder-neutral-500 transition-all duration-500 hover:border-black focus:outline-none active:border-black",
            disabled ? "cursor-not-allowed" : "",
          )}
          required={required}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

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

export function SelectField({
  label,
  options,
  className,
  required,
  value,
  name,
  handleChange,
  disabled,
}: Readonly<SelectFieldProps>) {
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
      <select
        name={name}
        defaultValue={value || ""}
        className={cn(
          "rounded-xl border border-neutral-400 px-[18px] py-[14px] text-black placeholder-neutral-400 transition-all duration-500 hover:border-black focus:outline-none active:border-black",
          disabled ? "cursor-not-allowed" : "",
        )}
        id={name}
        required={required}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="" disabled selected={!value}>
          Pilih
        </option>
        {options?.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function RadioField({
  label,
  options,
  className,
  required,
  value,
  name,
  disabled,
}: Readonly<OptionFieldProps>) {
  return (
    <div className={cn("flex flex-col gap-2 " + className)}>
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
      {options?.map((option) => (
        <div className="flex cursor-pointer gap-x-4" key={option.id}>
          <input
            type="radio"
            name={name}
            defaultChecked={option.value === value}
            value={option.value}
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-full border-gray-200 text-primary-500 accent-primary-500 transition-all ease-linear disabled:pointer-events-none disabled:opacity-50",
              disabled ? "cursor-not-allowed" : "",
            )}
            id={option.id}
            required={required}
            disabled={disabled}
          />
          <label htmlFor={option.id} className="ms-2 cursor-pointer text-sm">
            {option.value}
          </label>
        </div>
      ))}
      {!required && (
        <button
          onClick={() => uncheckRadio(name)}
          type="button"
          className="mr-auto items-center rounded-lg bg-transparent p-1 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-red-500"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}

function uncheckRadio(name: string) {
  const findCheckedInput = document.querySelector(
    `input[name="${name}"]:checked`,
  ) as HTMLInputElement;

  if (findCheckedInput) {
    findCheckedInput.checked = false;
  }
}

export function CheckboxField({
  label,
  options,
  className,
  required,
  value,
  name,
  disabled,
}: Readonly<OptionFieldProps>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={label}
          className={cn(
            `first-letter:capitalize ${required ? "after:text-red-500 after:content-['*']" : ""}`,
          )}
        >
          {label}
        </label>
      )}
      {options?.map((option) => (
        <div className="flex cursor-pointer gap-x-4" key={option.id}>
          <input
            type="checkbox"
            name={name}
            value={option.value}
            defaultChecked={value?.includes(option.value)}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-200 bg-white text-primary-500 accent-primary-500 transition-all focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
              disabled ? "cursor-not-allowed" : "",
            )}
            id={option.id}
            data-required={required}
            disabled={disabled}
          />
          <label htmlFor={option.id} className="ms-2 cursor-pointer text-sm">
            {option.value}
          </label>
        </div>
      ))}
    </div>
  );
}
