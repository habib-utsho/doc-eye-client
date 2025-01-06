"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import { set } from "zod";
type TMyInp = {
  name: string;
  type:
    | "text"
    | "file"
    | "number"
    | "password"
    | "email"
    | "date"
    | "time"
    | "select"
    | "textarea"
    | "textarea";
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label?: ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: { key: string; label: string }[];
  className?: string;
};

const MyInp = ({
  name,
  type = "text",
  label,
  placeholder,
  radius = "md",
  size = "sm",
  color = "default",
  value,
  disabled,
  defaultValue,
  onChange,
  options = [],
  className,
}: TMyInp) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      {type === "textarea" ? (
        <Textarea
          type={type}
          size={size}
          {...register(name)}
          defaultValue={defaultValue}
          radius={radius}
          color={color}
          label={label}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
          disabled={disabled}
          onChange={onChange}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
          className={className}
        />
      ) : type === "password" ? (
        <Input
          size={size}
          {...register(name)}
          defaultValue={defaultValue}
          radius={radius}
          color={color}
          label={label}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
          disabled={disabled}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          className={className}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
      ) : type === "select" ? (
        <Select
          size={size}
          {...register(name)}
          value={value}
          radius={radius}
          color={color}
          label={label}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
          disabled={disabled}
          className={className}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
        >
          {options.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          size={size}
          {...register(name)}
          defaultValue={defaultValue}
          radius={radius}
          color={color}
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          isInvalid={!!errors[name]}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
          className={className}
        />
      )}
    </>
  );
};

export default MyInp;
