"use client";

import cn from "@/lib/cn";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  DragEvent,
  forwardRef,
  useState,
} from "react";
import { RefCallBack, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import Select from "react-select";
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
              errorMessage ? "text-primary-400" : "",
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
            className={cn(
              "w-full rounded-full border border-neutral-400 px-[18px] py-[14px] text-black placeholder-neutral-500 outline-none transition-all duration-300 hover:border-black focus:border-none focus:outline-none focus:outline-primary-200",
              props.disabled ? "cursor-not-allowed" : "",
              errorMessage ? "border-primary-400" : "",
            )}
            ref={ref}
            {...props}
            type={showPassword ? "text" : props.type}
          />
          {errorMessage && (
            <P className="mt-[6px] text-red-400">{errorMessage}</P>
          )}
        </div>
      </div>
    );
  },
);

TextField.displayName = "TextField";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  options: SelectOption[];
  className?: string;
  required?: boolean;
  value?: SelectOption | null;
  name?: string;
  handleChange: (selectedOption: SelectOption | null) => void;
  disabled?: boolean;
  errorMessage?: string;
}

export function SelectField({
  label,
  options,
  className = "",
  required = false,
  value,
  name,
  handleChange,
  errorMessage,
  disabled = false,
}: Readonly<SelectFieldProps>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`first-letter:capitalize ${
            required ? "after:text-red-500 after:content-['*']" : ""
          }`}
        >
          {label}
        </label>
      )}
      <Select
        name={name}
        value={value}
        options={options}
        onChange={handleChange}
        isDisabled={disabled}
        isClearable={!required}
        classNamePrefix="react-select"
        placeholder="Pilih"
        noOptionsMessage={() => "No options available"}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "999rem",
            borderColor: "#A3A3A3",
            padding: "0.5rem",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#000",
            },
          }),
          option: (base) => ({
            ...base,
            color: "#000",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#A3A3A3",
          }),
        }}
      />
      {errorMessage && <P className="mt-[6px] text-red-400">{errorMessage}</P>}
    </div>
  );
}

interface FileInputProps {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  accept: string;
  errorMessage?: string;
}

export function FileField({
  label,
  errorMessage,
  register,
  name,
  accept,
}: FileInputProps) {
  const [fileName, setFileName] = useState<string>("");
  const { onChange } = register(name);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(e);
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    onChange(e);
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <P className="mb-2 self-start text-black">{label}</P>
      <label
        htmlFor={name}
        className="relative w-full cursor-pointer rounded-lg border-2 border-dashed border-neutral-200 px-6 py-4 transition-all duration-300 hover:border-solid focus:outline-none"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className="h-12 w-12 text-gray-200" />
          <span className="font-medium text-neutral-200">
            {fileName ? fileName : "Drag & drop a file di sini atau klik"}
          </span>
        </div>
        <input
          id={name}
          type="file"
          accept={accept}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          {...register(name)}
          onChange={handleFileChange}
        />
      </label>

      {fileName && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">{fileName}</p>
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 text-center">
          <p className="mt-[6px] text-sm text-primary-400">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
