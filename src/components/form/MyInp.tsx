"use client";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
type TMyInp = {
  name: string;
  type: string;
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label: ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  options?: { key: string; label: string }[];
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
  defaultValue,
  options = [],
}: TMyInp) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {type === "select" ? (
        <Select
          size={size}
          {...register(name)}
          value={value}
          radius={radius}
          color={color}
          label={label}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
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
          placeholder={placeholder}
          isInvalid={!!errors[name]}
          errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
        />
      )}
    </>
  );
};

export default MyInp;
